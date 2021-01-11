import socketio
import eventlet
eventlet.monkey_patch()
mgr = socketio.RedisManager('redis://socketio-redis:6379/0')
#sio = socketio.Server(cors_allowed_origins='*',async_mode='gevent',client_manager=mgr)

sio = socketio.Server(logger=True, engineio_logger=True, cors_allowed_origins='*',async_mode='eventlet',client_manager=mgr)

app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def test_message(sid, data):
    print('message ', data)
    sio.emit('message', {'data': 'pong'}, broadcast=True, include_self=True)
    mgr.emit('ping message', data={'foo': 'bar'}, room=sid)
    # sio.emit('my event', {'data': 'foobar'}, room=user_sid)

@sio.event
def ping_message(sid, data):
    print('message ping ', data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
    #from gevent import pywsgi
    #pywsgi.WSGIServer(('', 5000), app).serve_forever()
