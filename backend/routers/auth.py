from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from database import get_database
from auth import get_password_hash, verify_password, create_access_token
from models import UserRole

router = APIRouter()

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: UserRole
    phone: str
    age: int = None
    address: str = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: UserRole

@router.post("/register")
async def register(request: RegisterRequest):
    db = get_database()
    
    collection = db.patients if request.role == UserRole.PATIENT else db.caregivers
    
    existing = await collection.find_one({"email": request.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = {
        "email": request.email,
        "password": get_password_hash(request.password),
        "name": request.name,
        "phone": request.phone,
        "role": request.role
    }
    
    if request.role == UserRole.PATIENT:
        user_data["age"] = request.age
        user_data["address"] = request.address
        user_data["caregiver_ids"] = []
    else:
        user_data["patient_ids"] = []
    
    result = await collection.insert_one(user_data)
    
    token = create_access_token({"sub": request.email, "role": request.role})
    
    return {
        "message": "Registration successful",
        "user_id": str(result.inserted_id),
        "token": token,
        "role": request.role
    }

@router.post("/login")
async def login(request: LoginRequest):
    db = get_database()
    
    collection = db.patients if request.role == UserRole.PATIENT else db.caregivers
    
    user = await collection.find_one({"email": request.email})
    if not user or not verify_password(request.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token = create_access_token({"sub": request.email, "role": request.role})
    
    return {
        "message": "Login successful",
        "user_id": str(user["_id"]),
        "token": token,
        "role": request.role,
        "name": user["name"]
    }
