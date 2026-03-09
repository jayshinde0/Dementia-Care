import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from datetime import datetime, timedelta

def detect_anomalies(activities, health_records):
    anomalies = []
    
    if not activities:
        return anomalies
    
    df = pd.DataFrame(activities)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    daily_activity_count = df.groupby(df['timestamp'].dt.date).size()
    
    if len(daily_activity_count) >= 7:
        mean_activity = daily_activity_count.mean()
        std_activity = daily_activity_count.std()
        
        for date, count in daily_activity_count.items():
            if count < mean_activity - 2 * std_activity:
                anomalies.append({
                    "type": "low_activity",
                    "date": str(date),
                    "activity_count": int(count),
                    "expected_range": f"{int(mean_activity - std_activity)}-{int(mean_activity + std_activity)}",
                    "severity": "high",
                    "message": f"Unusually low activity detected on {date}"
                })
    
    medication_activities = df[df['activity_type'].str.contains('medication', case=False, na=False)]
    
    if len(medication_activities) > 0:
        medication_daily = medication_activities.groupby(medication_activities['timestamp'].dt.date).size()
        
        for date in pd.date_range(start=df['timestamp'].min().date(), end=df['timestamp'].max().date()):
            if date.date() not in medication_daily.index:
                anomalies.append({
                    "type": "missed_medication",
                    "date": str(date.date()),
                    "severity": "critical",
                    "message": f"No medication activity recorded on {date.date()}"
                })
    
    if health_records:
        health_df = pd.DataFrame(health_records)
        
        if 'sleep_hours' in health_df.columns:
            sleep_data = health_df['sleep_hours'].dropna()
            
            if len(sleep_data) > 0:
                for idx, sleep in sleep_data.items():
                    if sleep < 4 or sleep > 12:
                        anomalies.append({
                            "type": "abnormal_sleep",
                            "value": float(sleep),
                            "severity": "medium",
                            "message": f"Unusual sleep duration: {sleep} hours"
                        })
    
    recent_activities = df[df['timestamp'] >= datetime.utcnow() - timedelta(hours=24)]
    
    if len(recent_activities) == 0:
        anomalies.append({
            "type": "inactivity",
            "duration_hours": 24,
            "severity": "high",
            "message": "No activity detected in the last 24 hours"
        })
    
    return anomalies

def detect_wandering_pattern(location_history):
    if len(location_history) < 10:
        return {"wandering_detected": False}
    
    df = pd.DataFrame(location_history)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    df = df.sort_values('timestamp')
    
    distances = []
    for i in range(1, len(df)):
        dist = calculate_distance(
            df.iloc[i-1]['latitude'], df.iloc[i-1]['longitude'],
            df.iloc[i]['latitude'], df.iloc[i]['longitude']
        )
        distances.append(dist)
    
    total_distance = sum(distances)
    time_span = (df['timestamp'].max() - df['timestamp'].min()).total_seconds() / 3600
    
    if time_span > 0:
        movement_rate = total_distance / time_span
        
        if movement_rate > 500:
            return {
                "wandering_detected": True,
                "total_distance_meters": total_distance,
                "time_span_hours": time_span,
                "movement_rate": movement_rate,
                "severity": "high"
            }
    
    return {"wandering_detected": False}

def calculate_distance(lat1, lon1, lat2, lon2):
    from math import radians, sin, cos, sqrt, atan2
    R = 6371000
    
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    
    return R * c
