from datetime import datetime, timedelta
import pandas as pd

def generate_care_insights(patient, activities, alerts, health_records):
    insights = []
    
    if not activities:
        insights.append("⚠ No recent activity data available for analysis")
        return insights
    
    df_activities = pd.DataFrame(activities)
    df_activities['timestamp'] = pd.to_datetime(df_activities['timestamp'])
    
    today = datetime.utcnow().date()
    today_activities = df_activities[df_activities['timestamp'].dt.date == today]
    
    if len(today_activities) == 0:
        insights.append("⚠ No activity recorded today - patient may need check-in")
    else:
        insights.append(f"✓ {len(today_activities)} activities recorded today")
    
    medication_activities = df_activities[df_activities['activity_type'].str.contains('medication', case=False, na=False)]
    today_medications = medication_activities[medication_activities['timestamp'].dt.date == today]
    
    if len(today_medications) == 0:
        insights.append("🔴 ALERT: No medication taken today")
    elif len(today_medications) < 3:
        insights.append(f"⚠ Only {len(today_medications)} medication(s) taken today - verify schedule")
    else:
        insights.append(f"✓ Medication adherence good: {len(today_medications)} doses taken")
    
    week_ago = datetime.utcnow() - timedelta(days=7)
    this_week = df_activities[df_activities['timestamp'] >= week_ago]
    prev_week = df_activities[(df_activities['timestamp'] >= week_ago - timedelta(days=7)) & 
                               (df_activities['timestamp'] < week_ago)]
    
    if len(prev_week) > 0:
        activity_change = ((len(this_week) - len(prev_week)) / len(prev_week)) * 100
        
        if activity_change < -30:
            insights.append(f"🔴 Activity decreased by {abs(activity_change):.1f}% compared to last week")
        elif activity_change < -15:
            insights.append(f"⚠ Activity decreased by {abs(activity_change):.1f}% compared to last week")
        elif activity_change > 15:
            insights.append(f"✓ Activity increased by {activity_change:.1f}% - positive trend")
        else:
            insights.append("✓ Activity levels stable compared to last week")
    
    if alerts:
        critical_alerts = [a for a in alerts if a.get('severity') == 'critical']
        
        if critical_alerts:
            insights.append(f"🔴 {len(critical_alerts)} critical alert(s) in past week - immediate attention needed")
        
        unacknowledged = [a for a in alerts if not a.get('acknowledged', False)]
        
        if unacknowledged:
            insights.append(f"⚠ {len(unacknowledged)} unacknowledged alert(s) pending review")
    
    if health_records:
        df_health = pd.DataFrame(health_records)
        
        if 'sleep_hours' in df_health.columns:
            recent_sleep = df_health['sleep_hours'].dropna()
            
            if len(recent_sleep) > 0:
                avg_sleep = recent_sleep.mean()
                
                if avg_sleep < 5:
                    insights.append(f"⚠ Low sleep average: {avg_sleep:.1f} hours - monitor for fatigue")
                elif avg_sleep > 10:
                    insights.append(f"⚠ High sleep average: {avg_sleep:.1f} hours - check for oversleeping")
                else:
                    insights.append(f"✓ Sleep pattern healthy: {avg_sleep:.1f} hours average")
        
        if 'mood' in df_health.columns:
            recent_moods = df_health['mood'].dropna()
            
            if len(recent_moods) > 0:
                negative_count = sum(1 for m in recent_moods if m in ['sad', 'anxious', 'confused'])
                
                if negative_count > len(recent_moods) * 0.5:
                    insights.append("⚠ Frequent negative mood reports - consider emotional support")
                else:
                    insights.append("✓ Mood reports generally positive")
    
    last_activity = df_activities['timestamp'].max()
    hours_since = (datetime.utcnow() - last_activity).total_seconds() / 3600
    
    if hours_since > 6:
        insights.append(f"⚠ Last activity was {hours_since:.1f} hours ago - check on patient")
    
    return insights

def generate_recommendations(risk_assessment, behavior_patterns):
    recommendations = []
    
    risk_level = risk_assessment.get('risk_level', 'unknown')
    
    if risk_level == 'high':
        recommendations.append("Schedule immediate caregiver visit")
        recommendations.append("Increase monitoring frequency")
        recommendations.append("Review medication schedule with healthcare provider")
    elif risk_level == 'medium':
        recommendations.append("Increase check-in frequency")
        recommendations.append("Monitor activity patterns closely")
    
    if behavior_patterns:
        completion_rate = behavior_patterns.get('completion_rate', 0)
        
        if completion_rate < 70:
            recommendations.append("Simplify daily task reminders")
            recommendations.append("Consider voice-based reminders")
    
    return recommendations
