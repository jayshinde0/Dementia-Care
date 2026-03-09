from fastapi import APIRouter, HTTPException
from database import get_database
from bson import ObjectId
from typing import List

router = APIRouter()

@router.get("/{patient_id}")
async def get_patient(patient_id: str):
    db = get_database()
    patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
    
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient["_id"] = str(patient["_id"])
    patient.pop("password", None)
    return patient

@router.get("/{patient_id}/location")
async def get_patient_location(patient_id: str):
    db = get_database()
    location = await db.locations.find_one(
        {"patient_id": patient_id},
        sort=[("timestamp", -1)]
    )
    
    if not location:
        return {"message": "No location data available"}
    
    location["_id"] = str(location["_id"])
    return location

@router.post("/{patient_id}/location")
async def update_location(patient_id: str, latitude: float, longitude: float):
    db = get_database()
    
    location_data = {
        "patient_id": patient_id,
        "latitude": latitude,
        "longitude": longitude,
        "timestamp": datetime.utcnow()
    }
    
    await db.locations.insert_one(location_data)
    
    patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
    if patient and patient.get("safe_zone"):
        safe_zone = patient["safe_zone"]
        distance = calculate_distance(
            latitude, longitude,
            safe_zone["latitude"], safe_zone["longitude"]
        )
        
        if distance > safe_zone.get("radius", 1000):
            await create_geofence_alert(patient_id, patient.get("caregiver_ids", []))
    
    return {"message": "Location updated successfully"}

@router.put("/{patient_id}/safe-zone")
async def set_safe_zone(patient_id: str, latitude: float, longitude: float, radius: int = 1000):
    db = get_database()
    
    result = await db.patients.update_one(
        {"_id": ObjectId(patient_id)},
        {"$set": {"safe_zone": {"latitude": latitude, "longitude": longitude, "radius": radius}}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return {"message": "Safe zone updated successfully"}

def calculate_distance(lat1, lon1, lat2, lon2):
    from math import radians, sin, cos, sqrt, atan2
    R = 6371000
    
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    
    return R * c

async def create_geofence_alert(patient_id: str, caregiver_ids: List[str]):
    from datetime import datetime
    db = get_database()
    
    alert = {
        "patient_id": patient_id,
        "caregiver_ids": caregiver_ids,
        "type": "geofence_exit",
        "title": "Patient Left Safe Zone",
        "message": "Patient has moved outside the designated safe zone",
        "severity": "high",
        "acknowledged": False,
        "created_at": datetime.utcnow()
    }
    
    await db.alerts.insert_one(alert)
