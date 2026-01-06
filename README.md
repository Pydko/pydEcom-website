# 🛒 pydEcom - Full Stack E-Commerce Platform

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green)
![React](https://img.shields.io/badge/React-18-blue)
![Material UI](https://img.shields.io/badge/Material--UI-5.0-0081CB)

**pydEcom** is a robust and scalable full-stack e-commerce application designed to provide a seamless shopping experience. Built with a **Java Spring Boot** backend and a **React (Material UI)** frontend, this project demonstrates a modern microservice-ready architecture with secure authentication and state management.

## 🚀 Features

### 👤 User Features
* **Authentication:** Secure Login & Register functionality using JWT (JSON Web Tokens).
* **Product Browsing:** Dynamic product listing with advanced filtering (Category based) and real-time search.
* **Shopping Cart:** Persistent cart management (add, remove, update quantities) using LocalStorage and Context API.
* **Responsive Design:** Fully responsive UI compatible with Mobile, Tablet, and Desktop devices.
* **Product Details:** In-depth product views with stock status and related information.

### 🛡️ Admin Dashboard
* **Overview Stats:** Dashboard visualization for total inventory value, product count, and low-stock alerts.
* **Product Management (CRUD):** Add, Edit, Delete products with ease.
* **Stock Control:** Quick stock adjustments directly from the product list.
* **Role-Based Access Control (RBAC):** Admin routes are strictly protected; unauthorized access is automatically redirected.

---

## 🛠️ Tech Stack

### Backend
* **Framework:** Java Spring Boot 3
* **Security:** Spring Security, JWT (Stateless Authentication)
* **Database:** MySQL / PostgreSQL (JPA & Hibernate)
* **Architecture:** Layered Architecture (Controller, Service, Repository, DTO)
* **Validation:** Jakarta Bean Validation

### Frontend
* **Library:** React.js (Vite)
* **Styling:** Material UI (MUI), CssBaseline
* **State Management:** React Context API (Auth, Cart, Filter Contexts)
* **Routing:** React Router DOM v6 (with Protected Routes)
* **HTTP Client:** Fetch API with centralized Service Layer

---

## 📸 Video

[![Watch the video](https://img.youtube.com/vi/3yPU-eN3CR0/maxresdefault.jpg)](https://youtu.be/3yPU-eN3CR0)

### [Watch this video on YouTube](https://youtu.be/3yPU-eN3CR0)

---

## ⚙️ Installation & Setup

### Prerequisites
* Java JDK 17 or higher
* Node.js & npm
* MySQL (or any SQL database)

### 1. Backend Setup
1.  Navigate to the backend directory.
2.  Configure your database settings in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
    spring.datasource.username=your_db_user
    spring.datasource.password=your_db_password
    ```
3.  Build and run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### 2. Frontend Setup
1.  Navigate to the frontend directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

---

## 🔒 Security Implementation

This project implements a **Stateless Authentication** mechanism.
* **Token Generation:** Upon login, the server generates a signed JWT containing the user's role and username.
* **Filter Chain:** A custom `JwtAuthenticationFilter` intercepts every request to validate the token before it reaches the Controller layer.
* **Password Hashing:** BCrypt is used to hash passwords before storing them in the database.

---


## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Developed by [Muhammet Özgür Aslan]*