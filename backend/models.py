from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    PATIENT = "patient"
    CAREGIVER = "caregiver"

class ReminderType(str, Enum):
    MEDICATION = "medication"
    MEAL = "meal"
    APPOINTMENT = "appointment"
    TASK = "task"

class AlertType(str, Enum):
    MISSED_MEDICATION = "missed_medication"
    INACTIVITY = "inactivity"
    WANDERING = "wandering"
    EMERGENCY = "emergency"
    GEOFENCE_EXIT = "geofence_exit"

class Patient(BaseModel):
    email: EmailStr
    name: str
    age: int
    phone: str
    address: str
    emergency_contact: str
    caregiver_ids: List[str] = []
    safe_zone: Optional[dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Caregiver(BaseModel):
    email: EmailStr
    name: str
    phone: str
    patient_ids: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Reminder(BaseModel):
    patient_id: str
    type: ReminderType
    title: str
    description: str
    scheduled_time: str
    repeat_days: List[int] = []
    voice_enabled: bool = True
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Activity(BaseModel):
    patient_id: str
    activity_type: str
    description: str
    location: Optional[dict] = None
    completed: bool = False
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Alert(BaseModel):
    patient_id: str
    caregiver_ids: List[str]
    type: AlertType
    title: str
    message: str
    severity: str = "medium"
    acknowledged: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class HealthRecord(BaseModel):
    patient_id: str
    mood: Optional[str] = None
    sleep_hours: Optional[float] = None
    activity_level: Optional[str] = None
    notes: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class LocationUpdate(BaseModel):
    patient_id: str
    latitude: float
    longitude: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)
