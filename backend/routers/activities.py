from fastapi import APIRouter, HTTPException
from database import get_database
from models import Activity
from datetime import datetime, timedelta
from bson import ObjectId

router = APIRouter()

@router.post("/")
async def log_activity(activity: Activity):
    db = get_database()
    activity_dict = activity.dict()
    result = await db.activities.insert_one(activity_dict)
    
    return {
        "message": "Activity logged successfully",
        "activity_id": str(result.inserted_id)
    }

@router.get("/patient/{patient_id}")
async def get_patient_activities(patient_id: str, days: int = 7):
    db = get_database()
    start_date = datetime.utcnow() - timedelta(days=days)
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": start_date}
    }).sort("timestamp", -1).to_list(1000)
    
    for activity in activities:
        activity["_id"] = str(activity["_id"])
    
    return activities

@router.get("/patient/{patient_id}/summary")
async def get_activity_summary(patient_id: str, days: int = 7):
    db = get_database()
    start_date = datetime.utcnow() - timedelta(days=days)
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": start_date}
    }).to_list(1000)
    
    total_activities = len(activities)
    completed_activities = sum(1 for a in activities if a.get("completed", False))
    
    activity_types = {}
    for activity in activities:
        activity_type = activity.get("activity_type", "unknown")
        activity_types[activity_type] = activity_types.get(activity_type, 0) + 1
    
    return {
        "total_activities": total_activities,
        "completed_activities": completed_activities,
        "completion_rate": (completed_activities / total_activities * 100) if total_activities > 0 else 0,
        "activity_breakdown": activity_types,
        "period_days": days
    }

@router.post("/health")
async def log_health_record(patient_id: str, mood: str = None, sleep_hours: float = None, activity_level: str = None, notes: str = None):
    db = get_database()
    
    health_record = {
        "patient_id": patient_id,
        "mood": mood,
        "sleep_hours": sleep_hours,
        "activity_level": activity_level,
        "notes": notes,
        "timestamp": datetime.utcnow()
    }
    
    result = await db.health_records.insert_one(health_record)
    
    return {
        "message": "Health record logged successfully",
        "record_id": str(result.inserted_id)
    }

@router.get("/health/{patient_id}")
async def get_health_records(patient_id: str, days: int = 30):
    db = get_database()
    start_date = datetime.utcnow() - timedelta(days=days)
    
    records = await db.health_records.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": start_date}
    }).sort("timestamp", -1).to_list(100)
    
    for record in records:
        record["_id"] = str(record["_id"])
    
    return records
