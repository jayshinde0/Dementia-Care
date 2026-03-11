import socketio
from aiohttp import web
import asyncio

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='aiohttp',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

app = web.Application()
sio.attach(app)

# Store connected patients
connected_patients = {}

# Health check endpoint
async def health_check(request):
    return web.Response(text='Socket.io server is running', status=200)

app.router.add_get('/health', health_check)
app.router.add_get('/', health_check)

@sio.event
async def connect(sid, environ):
    print(f'Client connected: {sid}')
    print(f'Client address: {environ.get("REMOTE_ADDR")}')

@sio.event
async def disconnect(sid):
    print(f'Client disconnected: {sid}')
    # Remove from connected patients
    for patient_id, patient_sid in list(connected_patients.items()):
        if patient_sid == sid:
            del connected_patients[patient_id]
            print(f'Patient {patient_id} removed from connected list')
            break

@sio.event
async def register_patient(sid, data):
    """Register patient device for receiving notifications"""
    patient_id = data.get('patient_id')
    if patient_id:
        connected_patients[patient_id] = sid
        print(f'✅ Patient {patient_id} registered with sid {sid}')
        print(f'Total connected patients: {len(connected_patients)}')
        await sio.emit('registered', {'status': 'success', 'patient_id': patient_id}, room=sid)

@sio.event
async def send_task_to_patient(sid, data):
    """Caregiver sends task to patient"""
    patient_id = data.get('patient_id')
    task_text = data.get('task_text')
    caregiver_name = data.get('caregiver_name', 'Your Caregiver')
    
    print(f'📤 Task request from {sid} for patient {patient_id}')
    print(f'Connected patients: {list(connected_patients.keys())}')
    
    if patient_id in connected_patients:
        patient_sid = connected_patients[patient_id]
        
        # Send task notification to patient
        await sio.emit('new_task', {
            'task_text': task_text,
            'caregiver_name': caregiver_name,
            'timestamp': data.get('timestamp')
        }, room=patient_sid)
        
        # Confirm to caregiver
        await sio.emit('task_sent', {
            'status': 'success',
            'message': 'Task sent to patient'
        }, room=sid)
        
        print(f'✅ Task sent to patient {patient_id}: {task_text}')
    else:
        # Patient not connected
        await sio.emit('task_sent', {
            'status': 'error',
            'message': 'Patient is not connected'
        }, room=sid)
        print(f'❌ Patient {patient_id} is not connected')

async def init_app():
    return app

if __name__ == '__main__':
    print('=' * 60)
    print('Socket.io Server Starting...')
    print('Server will be available at:')
    print('  - http://localhost:8001')
    print('  - http://192.168.1.37:8001')
    print('=' * 60)
    web.run_app(app, host='0.0.0.0', port=8001)
