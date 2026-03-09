from fastapi import APIRouter, HTTPException
from database import get_database
from models import Alert
from bson import ObjectId
from datetime import datetime, timedelta

router = APIRouter()

@router.post("/")
async def create_alert(alert: Alert):
    db = get_database()
    alert_dict = alert.dict()
    result = await db.alerts.insert_one(alert_dict)
    
    return {
        "message": "Alert created successfully",
        "alert_id": str(result.inserted_id)
    }

@router.get("/caregiver/{caregiver_id}")
async def get_caregiver_alerts(caregiver_id: str, acknowledged: bool = None):
    db = get_database()
    
    query = {"caregiver_ids": caregiver_id}
    if acknowledged is not None:
        query["acknowledged"] = acknowledged
    
    alerts = await db.alerts.find(query).sort("created_at", -1).to_list(100)
    
    for alert in alerts:
        alert["_id"] = str(alert["_id"])
    
    return alerts

@router.get("/patient/{patient_id}")
async def get_patient_alerts(patient_id: str, days: int = 7):
    db = get_database()
    start_date = datetime.utcnow() - timedelta(days=days)
    
    alerts = await db.alerts.find({
        "patient_id": patient_id,
        "created_at": {"$gte": start_date}
    }).sort("created_at", -1).to_list(100)
    
    for alert in alerts:
        alert["_id"] = str(alert["_id"])
    
    return alerts

@router.put("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str):
    db = get_database()
    
    result = await db.alerts.update_one(
        {"_id": ObjectId(alert_id)},
        {"$set": {"acknowledged": True, "acknowledged_at": datetime.utcnow()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    return {"message": "Alert acknowledged successfully"}

@router.post("/emergency")
async def create_emergency_alert(patient_id: str, location: dict = None):
    db = get_database()
    
    patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    alert = {
        "patient_id": patient_id,
        "caregiver_ids": patient.get("caregiver_ids", []),
        "type": "emergency",
        "title": "EMERGENCY - SOS Button Pressed",
        "message": f"{patient['name']} has pressed the emergency SOS button",
        "severity": "critical",
        "location": location,
        "acknowledged": False,
        "created_at": datetime.utcnow()
    }
    
    result = await db.alerts.insert_one(alert)
    
    return {
        "message": "Emergency alert sent to all caregivers",
        "alert_id": str(result.inserted_id)
    }
