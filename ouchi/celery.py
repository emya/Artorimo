import os
from celery import Celery

from django.conf import settings

import logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artorimo.settings_prod')

"""
logger = logging.getLogger("analyzer")
logger.info("celery: Started")
"""

app = Celery('artorimo')
#app.config_from_object('django.conf:settings')
app.config_from_object('django.conf:settings', namespace='CELERY')
#app.config_update(CELERY_BROKER_URL="sqs://sqs.us-west-2.amazonaws.com/854671762036/OuchiQueue")

"""
logger.info(f"celery: {app.__dict__}")
logger.info(f"celery: {app.pool}")
"""


# Load task modules from all registered Django app configs.
app.autodiscover_tasks()