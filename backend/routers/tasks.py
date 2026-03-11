from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import get_database

router = APIRouter()

class TaskCreate(BaseModel):
    patient_id: str
    task_text: str
    caregiver_name: Optional[str] = "Your Caregiver"

class TaskResponse(BaseModel):
    status: str
    message: str
    task_id: Optional[str] = None

@router.post("/send", response_model=TaskResponse)
async def send_task_to_patient(task: TaskCreate):
    """
    Send a task/reminder to patient device in real-time
    This will be picked up by Socket.io for real-time delivery
    """
    try:
        db = get_database()
        
        # Save task to database
        task_doc = {
            "patient_id": task.patient_id,
            "caregiver_name": task.caregiver_name,
            "task_text": task.task_text,
            "created_at": datetime.utcnow(),
            "delivered": False,
            "acknowledged": False
        }
        
        result = await db.tasks.insert_one(task_doc)
        
        return TaskResponse(
            status="success",
            message="Task queued for delivery",
            task_id=str(result.inserted_id)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/patient/{patient_id}")
async def get_patient_tasks(patient_id: str):
    """Get all tasks for a patient"""
    db = get_database()
    
    tasks = await db.tasks.find(
        {"patient_id": patient_id}
    ).sort("created_at", -1).to_list(100)
    
    for task in tasks:
        task["_id"] = str(task["_id"])
    
    return tasks

@router.put("/{task_id}/delivered")
async def mark_task_delivered(task_id: str):
    """Mark a task as delivered to patient"""
    from bson import ObjectId
    db = get_database()
    
    result = await db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"delivered": True, "delivered_at": datetime.utcnow()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"status": "success", "message": "Task marked as delivered"}
