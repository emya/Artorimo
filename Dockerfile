FROM python:3.6

RUN mkdir -p /opt
COPY artorimo /opt/artorimo
COPY ouchi /opt/ouchi
COPY templates /opt/templates
COPY requirements_stg.txt /opt/
COPY manage.py /opt/
COPY gunicorn_config.py /opt/
COPY *.json /opt/

RUN set -ex; \
    pip install --upgrade pip;

RUN mkdir -p /var/log/gunicorn
RUN touch /var/log/gunicorn/error.log
RUN touch /var/log/gunicorn/access.log

WORKDIR /opt
RUN pip install -r requirements_stg.txt

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

ENTRYPOINT ["gunicorn", "--config", "gunicorn_config.py", "artorimo.wsgi_stg:application", "--error-logfile", "/var/log/gunicorn/error.log", "--access-logfile", "/var/log/gunicorn/access.log", "--capture-output", "--log-level", "debug"]
