import socketio
import rx
#mgr = socketio.RedisManager('redis://socketio-redis:6379')

#mgr = socketio.RedisManager('redis://socketio-redis:6379/0',channel='chat')

mgr = socketio.RedisManager('redis://socketio-redis:6379/0', write_only=True)
import time

def send(val):
    print('sssss')
    #sio.emit('message', {'data': val}, broadcast=True, include_self=True)
    #mgr.emit('message', data={'foo': 'bar'})
    #print(val)

#source = rx.interval(1).subscribe(send)
from datetime import datetime

while True:
    time.sleep(2)
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    mgr.emit('message', data={'time': current_time})
