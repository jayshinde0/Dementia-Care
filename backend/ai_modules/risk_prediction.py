import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def predict_risk(activities, health_records, alerts):
    risk_score = 0
    risk_factors = []
    
    if not activities:
        return {
            "overall_risk_score": 0,
            "risk_level": "unknown",
            "risk_factors": ["Insufficient data for assessment"]
        }
    
    df_activities = pd.DataFrame(activities)
    df_activities['timestamp'] = pd.to_datetime(df_activities['timestamp'])
    
    recent_week = datetime.utcnow() - timedelta(days=7)
    recent_activities = df_activities[df_activities['timestamp'] >= recent_week]
    
    daily_activity = recent_activities.groupby(recent_activities['timestamp'].dt.date).size()
    avg_daily_activity = daily_activity.mean() if len(daily_activity) > 0 else 0
    
    if avg_daily_activity < 5:
        risk_score += 25
        risk_factors.append("Low daily activity level")
    
    medication_activities = df_activities[df_activities['activity_type'].str.contains('medication', case=False, na=False)]
    
    if len(medication_activities) > 0:
        expected_medications = 7 * 3
        actual_medications = len(medication_activities[medication_activities['timestamp'] >= recent_week])
        adherence_rate = (actual_medications / expected_medications) * 100
        
        if adherence_rate < 70:
            risk_score += 30
            risk_factors.append(f"Low medication adherence: {adherence_rate:.1f}%")
    
    if health_records:
        df_health = pd.DataFrame(health_records)
        
        if 'sleep_hours' in df_health.columns:
            avg_sleep = df_health['sleep_hours'].mean()
            
            if avg_sleep < 5 or avg_sleep > 10:
                risk_score += 15
                risk_factors.append(f"Irregular sleep pattern: {avg_sleep:.1f} hours average")
        
        if 'mood' in df_health.columns:
            negative_moods = df_health[df_health['mood'].isin(['sad', 'anxious', 'confused'])].shape[0]
            
            if negative_moods > len(df_health) * 0.5:
                risk_score += 20
                risk_factors.append("Frequent negative mood reports")
    
    if alerts:
        df_alerts = pd.DataFrame(alerts)
        recent_alerts = df_alerts[pd.to_datetime(df_alerts['created_at']) >= recent_week]
        
        critical_alerts = recent_alerts[recent_alerts['severity'] == 'critical'].shape[0]
        
        if critical_alerts > 0:
            risk_score += 20
            risk_factors.append(f"{critical_alerts} critical alert(s) in past week")
        
        wandering_alerts = recent_alerts[recent_alerts['type'].isin(['wandering', 'geofence_exit'])].shape[0]
        
        if wandering_alerts > 2:
            risk_score += 25
            risk_factors.append("Multiple wandering incidents detected")
    
    last_activity = df_activities['timestamp'].max()
    hours_since_activity = (datetime.utcnow() - last_activity).total_seconds() / 3600
    
    if hours_since_activity > 12:
        risk_score += 15
        risk_factors.append(f"No activity for {hours_since_activity:.1f} hours")
    
    risk_score = min(risk_score, 100)
    
    if risk_score >= 70:
        risk_level = "high"
        recommendation = "Immediate caregiver attention recommended"
    elif risk_score >= 40:
        risk_level = "medium"
        recommendation = "Increased monitoring advised"
    else:
        risk_level = "low"
        recommendation = "Continue regular monitoring"
    
    return {
        "overall_risk_score": risk_score,
        "risk_level": risk_level,
        "risk_factors": risk_factors if risk_factors else ["No significant risk factors detected"],
        "recommendation": recommendation,
        "assessment_date": datetime.utcnow().isoformat()
    }

def predict_wandering_risk(activities, location_history):
    wandering_score = 0
    
    if location_history and len(location_history) > 5:
        recent_locations = sorted(location_history, key=lambda x: x['timestamp'], reverse=True)[:10]
        
        unique_locations = len(set((loc['latitude'], loc['longitude']) for loc in recent_locations))
        
        if unique_locations > 7:
            wandering_score += 40
    
    if activities:
        df = pd.DataFrame(activities)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df['hour'] = df['timestamp'].dt.hour
        
        night_activities = df[(df['hour'] >= 22) | (df['hour'] <= 5)]
        
        if len(night_activities) > len(df) * 0.2:
            wandering_score += 30
    
    return {
        "wandering_risk_score": wandering_score,
        "risk_level": "high" if wandering_score >= 50 else "medium" if wandering_score >= 25 else "low"
    }
