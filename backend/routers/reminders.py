from fastapi import APIRouter, HTTPException
from database import get_database
from bson import ObjectId
from models import Reminder
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_reminder(reminder: Reminder):
    db = get_database()
    reminder_dict = reminder.dict()
    result = await db.reminders.insert_one(reminder_dict)
    
    return {
        "message": "Reminder created successfully",
        "reminder_id": str(result.inserted_id)
    }

@router.get("/patient/{patient_id}")
async def get_patient_reminders(patient_id: str):
    db = get_database()
    reminders = await db.reminders.find(
        {"patient_id": patient_id, "active": True}
    ).to_list(100)
    
    for reminder in reminders:
        reminder["_id"] = str(reminder["_id"])
    
    return reminders

@router.put("/{reminder_id}")
async def update_reminder(reminder_id: str, reminder: Reminder):
    db = get_database()
    reminder_dict = reminder.dict()
    
    result = await db.reminders.update_one(
        {"_id": ObjectId(reminder_id)},
        {"$set": reminder_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    return {"message": "Reminder updated successfully"}

@router.delete("/{reminder_id}")
async def delete_reminder(reminder_id: str):
    db = get_database()
    
    result = await db.reminders.update_one(
        {"_id": ObjectId(reminder_id)},
        {"$set": {"active": False}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    return {"message": "Reminder deleted successfully"}

@router.post("/{reminder_id}/complete")
async def complete_reminder(reminder_id: str):
    db = get_database()
    
    reminder = await db.reminders.find_one({"_id": ObjectId(reminder_id)})
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    activity = {
        "patient_id": reminder["patient_id"],
        "activity_type": f"reminder_completed_{reminder['type']}",
        "description": f"Completed: {reminder['title']}",
        "completed": True,
        "timestamp": datetime.utcnow()
    }
    
    await db.activities.insert_one(activity)
    
    return {"message": "Reminder marked as completed"}
