from fastapi import APIRouter, HTTPException
from database import get_database
from datetime import datetime, timedelta
from ai_modules.behavior_analysis import analyze_behavior_patterns
from ai_modules.anomaly_detection import detect_anomalies
from ai_modules.risk_prediction import predict_risk
from ai_modules.care_assistant import generate_care_insights

router = APIRouter()

@router.get("/behavior-analysis/{patient_id}")
async def get_behavior_analysis(patient_id: str, days: int = 30):
    db = get_database()
    start_date = datetime.utcnow() - timedelta(days=days)
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": start_date}
    }).to_list(10000)
    
    if not activities:
        return {"message": "Insufficient data for analysis"}
    
    patterns = analyze_behavior_patterns(activities)
    
    return {
        "patient_id": patient_id,
        "analysis_period_days": days,
        "patterns": patterns
    }

@router.get("/anomaly-detection/{patient_id}")
async def detect_patient_anomalies(patient_id: str, days: int = 7):
    db = get_database()
    start_date = datetime.utcnow() - timedelta(days=days)
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": start_date}
    }).to_list(10000)
    
    health_records = await db.health_records.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": start_date}
    }).to_list(1000)
    
    if not activities:
        return {"message": "Insufficient data for anomaly detection"}
    
    anomalies = detect_anomalies(activities, health_records)
    
    return {
        "patient_id": patient_id,
        "anomalies_detected": len(anomalies),
        "anomalies": anomalies
    }

@router.get("/risk-prediction/{patient_id}")
async def predict_patient_risk(patient_id: str):
    db = get_database()
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": datetime.utcnow() - timedelta(days=30)}
    }).to_list(10000)
    
    health_records = await db.health_records.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": datetime.utcnow() - timedelta(days=30)}
    }).to_list(1000)
    
    alerts = await db.alerts.find({
        "patient_id": patient_id,
        "created_at": {"$gte": datetime.utcnow() - timedelta(days=30)}
    }).to_list(1000)
    
    if not activities:
        return {"message": "Insufficient data for risk prediction"}
    
    risk_assessment = predict_risk(activities, health_records, alerts)
    
    return {
        "patient_id": patient_id,
        "risk_assessment": risk_assessment
    }

@router.get("/care-insights/{patient_id}")
async def get_care_insights(patient_id: str):
    db = get_database()
    
    patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": datetime.utcnow() - timedelta(days=7)}
    }).to_list(10000)
    
    alerts = await db.alerts.find({
        "patient_id": patient_id,
        "created_at": {"$gte": datetime.utcnow() - timedelta(days=7)}
    }).to_list(1000)
    
    health_records = await db.health_records.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": datetime.utcnow() - timedelta(days=7)}
    }).to_list(100)
    
    insights = generate_care_insights(patient, activities, alerts, health_records)
    
    return {
        "patient_id": patient_id,
        "patient_name": patient["name"],
        "generated_at": datetime.utcnow(),
        "insights": insights
    }

@router.get("/daily-report/{patient_id}")
async def generate_daily_report(patient_id: str):
    db = get_database()
    
    patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    
    activities = await db.activities.find({
        "patient_id": patient_id,
        "timestamp": {"$gte": today_start}
    }).to_list(1000)
    
    reminders = await db.reminders.find({
        "patient_id": patient_id,
        "active": True
    }).to_list(100)
    
    completed_reminders = [a for a in activities if "reminder_completed" in a.get("activity_type", "")]
    missed_reminders = len(reminders) - len(completed_reminders)
    
    alerts = await db.alerts.find({
        "patient_id": patient_id,
        "created_at": {"$gte": today_start}
    }).to_list(100)
    
    health_record = await db.health_records.find_one({
        "patient_id": patient_id,
        "timestamp": {"$gte": today_start}
    })
    
    report = f"Daily Health Report for {patient['name']}:\n\n"
    report += f"✓ Completed {len(completed_reminders)} tasks today\n"
    
    if missed_reminders > 0:
        report += f"⚠ Missed {missed_reminders} medication(s)\n"
    
    if health_record:
        if health_record.get("mood"):
            report += f"😊 Mood: {health_record['mood']}\n"
        if health_record.get("sleep_hours"):
            report += f"😴 Sleep: {health_record['sleep_hours']} hours\n"
        if health_record.get("activity_level"):
            report += f"🏃 Activity Level: {health_record['activity_level']}\n"
    
    if alerts:
        report += f"\n⚠ {len(alerts)} alert(s) generated today\n"
    else:
        report += "\n✓ No alerts today - normal activity levels\n"
    
    return {
        "patient_id": patient_id,
        "date": today_start.strftime("%Y-%m-%d"),
        "report": report,
        "metrics": {
            "completed_tasks": len(completed_reminders),
            "missed_medications": missed_reminders,
            "alerts_count": len(alerts),
            "total_activities": len(activities)
        }
    }

from bson import ObjectId
