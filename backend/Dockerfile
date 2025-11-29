# production Dockerfile for Django backend
FROM python:3.11-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# system deps for some Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl && rm -rf /var/lib/apt/lists/*

# install python deps
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy source
COPY backend/ ./

# collect static
ENV DJANGO_SETTINGS_MODULE=backend.settings
RUN python manage.py collectstatic --noinput

# runtime image
FROM python:3.11-slim
WORKDIR /app
COPY --from=base /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=base /app /app

ENV PATH="/root/.local/bin:$PATH"

EXPOSE 8000
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]