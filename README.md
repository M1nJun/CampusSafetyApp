# Hi, my name is Minjun Lee  

I am a passionate software engineer and a senior at **Lawrence University**, majoring in Computer Science and minoring in Data Science.  
I have a strong foundation in full-stack development, algorithms, and systems. I am fascinated by technology’s potential to address real-world problems.  
My ambition is to create software that fits naturally into people’s lives, supporting them while preserving what makes life fulfilling.  

---

## Technical Skills  

- **Programming Languages:** Java, Python, C/C++, React/React Native, JavaScript, HTML, Swift, TensorFlow  
- **Development Environment:** SQL, Android Studio, Xcode, R, Excel, Linux, AWS (Certified Solutions Architect)  
- **Languages:** English, Korean, Japanese, Spanish

---

# Campus Safety App - Project Overview  

## Introduction  

I have been employed as a student officer at the  
[Campus Safety Office](https://www.lawrence.edu/offices/campus-services/campus-safety-services) at Lawrence University for a year.  
Campus Safety's mission is to provide students, faculty, and staff with a secure environment.  

## Recognizing the Problem  

- Requests were made via phone calls, leading to unstructured communication and potential miscommunication.  
- Officers had to manually record request details, leading to inefficiencies.  
- Updating students on request status required manual effort, causing delays.  

Recognizing these inefficiencies, I partnered with the university to develop the **Campus Safety App**, modernizing request handling with a digital solution.  

## The Solution  

I created a **full-stack mobile application** with two versions:  
- **Student Version** - Students submit requests through structured forms.  
- **Officer Version** - Officers view and manage requests in real-time.  
- **Database** - Automatically saves request history, removing manual report writing.  

## Full-Stack Architecture  

- **Frontend:** React Native (supports both iOS & Android)  
- **Backend:** Spring Boot  
- **Database:** MySQL  
- **Hosting:** AWS  

---

## Database Structure  
![Entity Relationship Diagram](https://github.com/user-attachments/assets/b80bad16-7854-4503-af45-bc7320aed2e4)


---

## Backend Implementation  

Built with **Spring Boot** and follows a **REST API architecture** for scalability.  

- **Spring Boot Framework** - Handles API requests and logic.  
- **JPA (Java Persistence API)** - Manages database operations.  
- **MySQL Database** - Stores user data and requests.  
- **Spring Security & JWT** - Manages authentication and user sessions.  
- **AWS Hosting** - Backend is deployed on AWS EC2 with Auto Scaling.  

---

## Security Implementation  

### **JWT Authentication**  
- Uses **JSON Web Tokens (JWT)** for user authentication.  
- Tokens are **signed with HMAC SHA-256** for security.  
- **Security Flow:**  
  1. User logs in → Gets an Access Token.  
  2. Access Token expires → Refresh Token is used.  
  3. Refresh Token expires → User must re-login.  

### **Automated Email Verification**  
- A **6-digit verification code** is generated at sign-up.  
- The code is **valid for 15 minutes** and sent via **JavaMailSender**.  
- Users enter the code to activate their account.  

### **Secure API Endpoints**  
- **Public:** `/user/register`, `/user/login`, `/user/refreshToken`  
- **Protected:** All other endpoints require JWT authentication.  

---

## Frontend Features  

The app is built with **React Native** for cross-platform support.  

### **Student/Faculty App Features**  
- **User Authentication** (JWT-based login, email verification).  
- **Request Management** (Submit ride & safety requests).  
- **Messaging System** (Real-time chat with officers).  
- **Google Maps Integration** (Location selection & tracking).  

### **Officer App Features**  
- **Manage Requests** (View, accept, cancel, or complete requests).  
- **Messaging System** (Direct communication with students).  
- **Location & Routing** (Google Maps integration for navigation).  

### **Google API Services Used**  
- **Google Maps SDK** - Displays interactive maps.  
- **Google Places API** - Enables location autocomplete.  
- **Google Directions API** - Provides navigation routes.  

---

## AWS Infrastructure
![Campus Safety App - AWS Architecture](https://github.com/user-attachments/assets/966dfb6e-0d12-4462-90b1-6782b4ec599c)





### **System Architecture**  
1. **Mobile App** sends requests to an **Application Load Balancer (ALB)**.  
2. **ALB** routes traffic to **EC2 instances**.  
3. **EC2 instances** interact with an **RDS (MySQL) database**.  
4. **Auto Scaling Group (ASG)** dynamically adjusts EC2 instances.  
5. **EventBridge Rule & Lambda** ensure seamless instance scaling.  

---

## Conclusion & Project Impact  

This project **streamlined Campus Safety operations**, reducing response times and improving efficiency.  
Developing this full-stack system strengthened my skills in **scalable architecture, security, and user-centric software development**.  
