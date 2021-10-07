from django.template.loader import render_to_string
from django.conf import settings
import os

from .celery import app

if os.getenv("ENV") == "STAGING":
    from .celery_stg import app


import logging
logger = logging.getLogger("analyzer")
logger.info("celery_task: Started")

site_url = settings.SITE_URL

@app.task
def send_email(subject, message, html_message, to_emails):
    from django.core.mail import send_mail
    logger.info("celery_task: send_email")
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        to_emails,
        fail_silently=False,
        html_message=html_message
    )

@app.task
def send_bcc_email(subject, message, html_message, bcc_emails):
    from django.core.mail import EmailMultiAlternatives
    logger.info("celery_task: send_bcc_email")

    msg = EmailMultiAlternatives(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [],
        bcc=bcc_emails
    )

    msg.attach_alternative(html_message, "text/html")
    msg.send()
