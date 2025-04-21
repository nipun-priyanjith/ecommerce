<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/Picture4.jpg">



# 🛒 SmartShop – AI-Powered E-Commerce Platform

An end-to-end, ML-powered e-commerce platform built with the **MERN stack**, featuring **personalized product recommendations**, **admin analytics**, and a **chatbot powered by Google Gemini API**. The project is deployed on a local **Kubernetes lab environment** with a full **CI/CD pipeline** using Jenkins and Docker.

---
<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/Screenshot%202025-04-09%20194227.png">

---

## 🚀 Features

### 👥 Guest Users
- View top-rated products (based on global ratings)

### 🔐 Registered Users
- Personalized product recommendations using **Collaborative Filtering** and **SVD**
- Perform full **CRUD operations** on orders

### 🛠️ Admin Panel
- Manage product catalog (CRUD)
- View, update, and delete customer orders
- Analyze sales trends with ML insights

### 🤖 Chatbot
- Integrated with **Google Gemini API**
- Answers user queries related to orders and products
- Connected to the database for real-time responses

---
<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/g.png">

---

## ⚙️ Tech Stack

| Layer        | Technologies Used                                |
|--------------|--------------------------------------------------|
| Frontend     | React.js, Tailwind CSS                           |
| Backend      | Node.js, Express.js                              |
| Database     | MongoDB Atlas                                    |
| Machine Learning | Python (Collaborative Filtering, SVD)        |
| Storage      | AWS S3                                           |
| Chatbot      | Google Gemini API                                |
| DevOps       | Docker, Jenkins, SonarQube, Kubernetes (K8s)     |
| Monitoring   | Prometheus & Grafana (via Helm)                  |

---

<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/Screenshot%202025-04-09%20191036.png">

---

## 🔁 CI/CD Pipeline

- **Dockerized** microservices (Client, Server, ML, Chatbot)
- **Jenkins** automates testing and container builds
- **SonarQube** for code quality analysis
- **Kubernetes** for local deployment (via `k8s/` folder)
- **Monitoring with Grafana & Prometheus**

---

<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/Screenshot%202025-04-09%20085131.png">

---





## ⚙️ Getting Started

 **Clone the repo**
   ```bash
   git clone https://github.com/nipun-priyanjith/ecommerce.git

   ```

---
<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/a6.png">

---



##  Add your environment variables
   ```bash
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_key
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
GEMINI_API_KEY=your_google_gemini_key
  ```

---


---
<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/Picture9.jpg">

---


---
<img src="https://github.com/nipun-priyanjith/ecommerce/blob/main/images/Screenshot%202025-04-05%20183644.png">

---
