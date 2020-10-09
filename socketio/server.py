import eventlet
import socketio
import rx
sio = socketio.Server(cors_allowed_origins='*',async_mode='eventlet')
app = socketio.WSGIApp(sio)


# def send(val):
#     sio.emit('message', {'data': val}, broadcast=True, include_self=True)
#     print(val)

# source = rx.interval(1).subscribe(send)

@sio.event
def connect(sid, environ):
    print('connect ', sid)
    #sio.send('rwerwerewerwerew');
    # def send(val):
    #     sio.emit('message', {'data': val}, broadcast=True, include_self=True)
    #     sio.send('rwerwerewerwerew');
    #     print(val)

    # source = rx.interval(1).subscribe(send)

@sio.event
def my_message(sid, data):
    print('message ', data)
    sio.emit('message', {'data': data['data']}, broadcast=True, include_self=True)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
