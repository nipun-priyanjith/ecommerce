# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy project files
COPY requirements.txt .
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5002

# Start the chatbot
CMD ["python", "chat.py"]
