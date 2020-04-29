FROM python:3.6

RUN mkdir -p /opt
COPY artotimo /opt/artorimo
COPY ouchi /opt/ouchi
COPY templates /opt/templates
COPY requirements.txt /opt/
COPY manage.py /opt/
COPY gunicorn_config.py /opt/
COPY *.json /opt/

RUN set -ex; \
    pip install --upgrade pip;

WORKDIR /opt
RUN pip install -r requirements.txt

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

ENTRYPOINT ["gunicorn", "--config", "gunicorn_config.py", "artorimo.wsgi:application"]
