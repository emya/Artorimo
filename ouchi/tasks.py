from django.template.loader import render_to_string
from django.conf import settings

from .celery import app

site_url = settings.SITE_URL

@app.task
def send_email(subject, message, html_message, to_emails):
    from django.core.mail import send_mail
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        to_emails,
        fail_silently=False,
        html_message=html_message
    )