from celery import Celery
from django.conf import settings
from celery.schedules import crontab
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'prj.settings')


app = Celery('prj')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)



from datetime import datetime

@app.task(bind=True)
def timer_task(self):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print(f'Time is: {current_time}')

app.conf.beat_schedule = {
  'timer-task': {
    'task': 'prj.celery.timer_task',
    'schedule': crontab(minute='*/1'),
  }
}
