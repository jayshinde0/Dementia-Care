from fastapi import APIRouter, HTTPException
from database import get_database
from bson import ObjectId

router = APIRouter()

@router.get("/{caregiver_id}")
async def get_caregiver(caregiver_id: str):
    db = get_database()
    caregiver = await db.caregivers.find_one({"_id": ObjectId(caregiver_id)})
    
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")
    
    caregiver["_id"] = str(caregiver["_id"])
    caregiver.pop("password", None)
    return caregiver

@router.get("/{caregiver_id}/patients")
async def get_caregiver_patients(caregiver_id: str):
    db = get_database()
    caregiver = await db.caregivers.find_one({"_id": ObjectId(caregiver_id)})
    
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")
    
    patient_ids = [ObjectId(pid) for pid in caregiver.get("patient_ids", [])]
    patients = await db.patients.find({"_id": {"$in": patient_ids}}).to_list(100)
    
    for patient in patients:
        patient["_id"] = str(patient["_id"])
        patient.pop("password", None)
    
    return patients

@router.post("/{caregiver_id}/patients/{patient_id}")
async def link_patient(caregiver_id: str, patient_id: str):
    db = get_database()
    
    await db.caregivers.update_one(
        {"_id": ObjectId(caregiver_id)},
        {"$addToSet": {"patient_ids": patient_id}}
    )
    
    await db.patients.update_one(
        {"_id": ObjectId(patient_id)},
        {"$addToSet": {"caregiver_ids": caregiver_id}}
    )
    
    return {"message": "Patient linked successfully"}
