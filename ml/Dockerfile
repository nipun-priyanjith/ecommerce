# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose Flask API port
EXPOSE 5001

# Start the Flask app
CMD ["python", "ml.py"]
