from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL =  "mongodb://localhost:27017"
DATABASE_NAME = "dementia_care"

client = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # Create indexes
    try:
        await db.patients.create_index([("email", ASCENDING)], unique=True)
        await db.caregivers.create_index([("email", ASCENDING)], unique=True)
        await db.activities.create_index([("patient_id", ASCENDING), ("timestamp", DESCENDING)])
        await db.alerts.create_index([("patient_id", ASCENDING), ("created_at", DESCENDING)])
        print("Database connected and indexes created successfully")
    except Exception as e:
        print(f"Database connected, indexes may already exist: {e}")

async def close_db():
    global client
    if client:
        client.close()
        print("Database connection closed")

def get_database():
    return db
