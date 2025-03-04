# Campus Safety App

**Hello, World! 👋** 

My name is [**Jun**](www.linkedin.com/in/minjunleesd).
I am a senior at [**Lawrence University**](https://www.lawrence.edu/), majoring in Computer Science and minoring in Data Science.
I have a strong foundation in full-stack development, algorithms, and systems. I am fascinated by technology’s potential to address real-world problems.  
My ambition is to create software that fits naturally into people’s lives, supporting them while preserving what makes life fulfilling.

I have been employed as a student officer at the [**Campus Safety Office**](https://www.lawrence.edu/offices/campus-services/campus-safety-services) at Lawrence University for a year. The mission of Campus Safety is to provide a secure environment for students, faculty, and staff.
During my time there, our director, Jeff, and I recognized inefficiencies in the existing campus safety system. Seeing an opportunity for improvement, Jeff helped me to leverage my Computer Science background to collaborate with the university on creating a solution.

I was grateful for the opportunity to apply the skills I had learned to give back to the community. Along the way, I gained valuable experiences that helped me grow into a better software engineer. A huge thank you to Jeff, Lawrence University, my friends, and family for their support.

Without further ado, let me walk you through the project!

---

## Recognizing the Problem  

Here are some of the main responsibilities of the Campus Safety Office:
- Facility and key card access
- Lockouts
- Student transportation
- Parking, vehicle and bike registration
- Fire safety

In the existing system, students, faculty, and staff had to call the office phone number to make requests. However, relying solely on phone calls introduced several challenges:

- Unstructured communication often led to miscommunication and inconsistencies.
- Officers could easily forget or mix up different phone numbers, making it harder to track requests accurately.
- Request details had to be recorded manually on paper, increasing the risk of errors and inefficiencies.
- Updating students on their request status required officers to call or text them, with no guarantee that they would see or receive the update in a timely manner.

Recognizing these inefficiencies, I came up with a digital solution.  

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
