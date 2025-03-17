# Campus Safety App

**Hello, World! 👋** 

My name is [**Jun**](https://www.linkedin.com/in/minjunleesd).
I am a senior at [**Lawrence University**](https://www.lawrence.edu/), majoring in Computer Science and minoring in Data Science.
I have a strong foundation in full-stack development, algorithms, and systems. I am fascinated by technology’s potential to address real-world problems.  
My ambition is to create software that fits naturally into people’s lives, supporting them while preserving what makes life fulfilling.

I have been employed as a student officer at the [**Campus Safety Office**](https://www.lawrence.edu/offices/campus-services/campus-safety-services) at Lawrence University for a year now. The mission of Campus Safety is to provide a secure environment for students, faculty, and staff.
During my time there, our director, Jeff, and I recognized inefficiencies in the existing campus safety system. Seeing an opportunity for improvement, Jeff helped me to leverage my Computer Science background to collaborate with the university on creating a solution.

I was grateful for the opportunity to apply the skills I had learned to give back to the community. Along the way, I gained valuable experiences that helped me grow into a better software engineer. A huge thank you to Jeff, Lawrence University, my friends, and family for their support.

Without further ado, I will walk you through the project!

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
- **Student/Faculty/Staff Version** - Users submit requests(safety request, ride request) through structured forms.
- **Officer/Driver Version** - Users view and manage requests(accept, complete, cancel) in real-time.


| 🚨 **Problem** | ✅ **Solution** |
|--------------|--------------|
| **Unstructured communication** | Users submit requests through a standardized form, ensuring clarity and reducing miscommunication. |
| **Lost or mixed-up phone numbers** | All requests are securely stored in the app, eliminating the need for officers to manually track calls. Requests are automatically linked to the involved users, making it easy to view details and contact the right person. |
| **Manual paper-based request logging** | Requests are automatically recorded in a database, making them easy to access and review at any time. |
| **Unreliable request status updates** | Users receive instant updates on their request status. With a simple tap on the message icon in a user’s profile, direct messaging between users is available. |

---

## Database Structure  
![Entity Relationship Diagram](https://github.com/user-attachments/assets/b80bad16-7854-4503-af45-bc7320aed2e4)


---

## Backend Implementation  

Built with **Spring Boot** and follows a **REST API architecture** for scalability.  

- **Spring Boot Framework** - Handles API requests and logic.  
- **JPA (Java Persistence API)** - Manages database operations.    
- **Spring Security & JWT** - Manages authentication and user sessions.  

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
Only active members of Lawrence University have an active lawrence.edu email account.
To verify affiliation with the university, users must sign up using their <PersonalAddress>@lawrence.edu email.
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

My server is deployed on **EC2 instances**, which are essentially virtual machines rented from Amazon. The more instances I have, the greater my server's capacity to handle incoming user requests.

Users interact with an **Application Load Balancer (ALB)**, which acts as an entry point, directing traffic to a designated target group that contains my EC2 instances. These EC2 instances communicate with an **RDS instance**, a managed database service in AWS that hosts my MySQL database.

To ensure scalability, I’ve set up an **Auto Scaling Group (ASG)**, which dynamically adjusts the number of EC2 instances based on demand. Think of it as a factory that automatically launches or terminates instances depending on the incoming request volume. When a new EC2 instance is launched, it follows a launch template, which configures everything needed to run my server on the newly provisioned machine.

Additionally, **EventBridge** detects when the Auto Scaling Group launches a new EC2 instance and triggers a **Lambda function** to register the instance with the target group of the Application Load Balancer.

This architecture integrates AWS cloud services to automate load balancing and horizontal scaling.

---

## Conclusion & Project Impact  

This project **streamlined Campus Safety operations**, reducing response times and improving efficiency.  
Developing this full-stack system strengthened my skills in **scalable architecture, security, and user-centric software development**.  
