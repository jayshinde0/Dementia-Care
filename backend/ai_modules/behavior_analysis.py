import pandas as pd
import numpy as np
from datetime import datetime
from collections import defaultdict

def analyze_behavior_patterns(activities):
    if not activities:
        return {}
    
    df = pd.DataFrame(activities)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['hour'] = df['timestamp'].dt.hour
    df['day_of_week'] = df['timestamp'].dt.dayofweek
    
    hourly_activity = df.groupby('hour').size().to_dict()
    peak_hours = sorted(hourly_activity.items(), key=lambda x: x[1], reverse=True)[:3]
    
    daily_activity = df.groupby('day_of_week').size().to_dict()
    day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    daily_patterns = {day_names[k]: v for k, v in daily_activity.items()}
    
    activity_types = df['activity_type'].value_counts().to_dict()
    
    completion_rate = 0
    if 'completed' in df.columns:
        completion_rate = (df['completed'].sum() / len(df)) * 100
    
    medication_activities = df[df['activity_type'].str.contains('medication', case=False, na=False)]
    medication_times = medication_activities['hour'].value_counts().to_dict()
    
    patterns = {
        "peak_activity_hours": [{"hour": h, "count": c} for h, c in peak_hours],
        "daily_activity_distribution": daily_patterns,
        "activity_types": activity_types,
        "completion_rate": round(completion_rate, 2),
        "medication_schedule_pattern": medication_times,
        "total_activities_analyzed": len(df),
        "average_daily_activities": round(len(df) / df['timestamp'].dt.date.nunique(), 2)
    }
    
    return patterns

def detect_routine_deviations(current_activities, historical_patterns):
    deviations = []
    
    if not current_activities or not historical_patterns:
        return deviations
    
    current_df = pd.DataFrame(current_activities)
    current_df['timestamp'] = pd.to_datetime(current_df['timestamp'])
    current_df['hour'] = current_df['timestamp'].dt.hour
    
    current_hourly = current_df.groupby('hour').size()
    
    for hour, expected_count in historical_patterns.get('hourly_activity', {}).items():
        actual_count = current_hourly.get(int(hour), 0)
        
        if actual_count < expected_count * 0.5:
            deviations.append({
                "type": "reduced_activity",
                "hour": hour,
                "expected": expected_count,
                "actual": actual_count,
                "severity": "medium"
            })
    
    return deviations
