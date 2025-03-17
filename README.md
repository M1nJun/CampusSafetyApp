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

### **Password Security**  
The user's password is securely hashed using the **Bcrypt** cryptographic algorithm. **Password hashing** is a **one-way process** that converts a plain-text password into a unique, fixed-length string, making it impossible to reverse-engineer the original password.

To further enhance security, I’ve implemented a **custom pepper**—an additional secret value applied during hashing. This means that even if an attacker obtains the hashed passwords, they would still need the pepper to verify them, adding an extra layer of protection.

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

## App Screenshots & Overview

### **Logging In & Signing Up**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c00edc05-fd10-4701-a7bd-555ff94bc4d2" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3a249075-3ed2-4674-9ead-9c1e23e309cd" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>Login Page:</b> Users can log in using their <b>Lawrence University credentials</b>.<br>
      - Option to toggle to the <b>Signup Page</b> if they don’t have an account.
    </td>
    <td align="left">
      <b>Signup Page:</b> Users can create an account.<br>
      - Requires <code>lawrence.edu</code> email for verification.
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="https://github.com/user-attachments/assets/67bb738e-e59e-460a-9b7a-3cf249e3f245" width="300">
    </td>
  </tr>
  <tr>
    <td align="left" colspan="2">
      <b>Verification Page:</b> After signing up, users must enter a <b>6-digit code</b> sent to their <b>Lawrence University email</b>.<br>
      - The code is valid for <b>15 minutes</b>.
    </td>
  </tr>
</table>



---

### **Navigating the Student App**

We are now in the **Student Home Screen**, where users can make two types of requests:  
- **Ride Request**  
- **Safety Request**  
Both requests can be submitted **quickly and easily**.

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/e485e7fb-3a89-40b6-b906-c62cdc8f1e9f" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3ee6d83d-9ed4-4310-b3d9-8a0e3a3b67db" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>Ride Request Page</b>
    </td>
    <td align="left">
      <b>Safety Request Page</b>
    </td>
  </tr>
</table>


---

### **Demonstration of Creating a Ride Request**

### **Selecting Pickup & Destination Locations**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/40f85dbe-6977-418a-b72f-560d66371c27" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/df666831-5c75-492b-8166-bd7621ccf58c" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>When you tap on the <em>"Where to"</em> or <em>"Where from"</em> boxes, a dropdown list appears with the following options:</b><br>
      - <b>Current Location</b><br>
      - <b>Search Address</b><br>
      - <b>List of Lawrence Buildings</b> (default view)
    </td>
    <td align="left">
      <b>Users can filter through Lawrence Buildings by typing keywords.</b>
    </td>
  </tr>
</table>


### **Selecting Pickup & Destination Locations**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/40f85dbe-6977-418a-b72f-560d66371c27" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/df666831-5c75-492b-8166-bd7621ccf58c" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>When you tap on the <em>"Where to"</em> or <em>"Where from"</em> boxes, a dropdown list appears with the following options:</b><br>
      - <b>Current Location</b><br>
      - <b>Search Address</b><br>
      - <b>List of Lawrence Buildings</b> (default view)
    </td>
    <td align="left">
      <b>Users can filter through Lawrence Buildings by typing keywords.</b>
    </td>
  </tr>
</table>


### **Using the Current Location Option**
For the where to, let's try to use Current Location.

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/4376edb8-dee2-4f2f-b38c-a4c147fcc555" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>The <em>"Current Location"</em> option requires location-sharing permission.</b><br>
      - If selected, the input box is auto-filled with the <b>street address</b> of the user's current location.<br>
      - An <b>interactive map</b> with a pin appears, allowing users to adjust their exact location.
    </td>
  </tr>
</table>


### **Using the Search Address Option**
For the where are you, let's try to use Current Location.

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ff079d52-9b7e-4b7c-8097-f5b13676e83f" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6a98bbf9-93b1-4326-a40a-d3a9c7d80631" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>Users can search for a <em>specific address</em> by selecting the <em>"Search Address"</em> option.</b><br>
      The system provides <b>autocomplete suggestions</b> for locations nearest to the user.
    </td>
    <td align="left">
      <b>Once a location is selected, an <em>interactive map</em> appears.</b><br>
      The pin can be moved to adjust the location.<br>
      The address updates dynamically as the pin moves.
    </td>
  </tr>
</table>



### **Choosing an Instant or Reserved Request**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/aa98d0df-539c-4c92-81c5-6569c90a6bbe" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/439c203c-eed5-4067-a675-2d6b500e376d" width="300">
    </td>
  </tr>
  <tr>
    <td align="left"><b>Users can choose between an <em>instant request</em> or a <em>reserved request</em>.</b></td>
    <td align="left"><b>Tapping <em>"By this date"</em> enables the <em>reservation option</em>.</b></td>
  </tr>
</table>


### **Picking Date & Time for a Reserved Request**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/0e0ce9ba-6191-4021-a39e-a2ef37cbea82" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/b945d078-32e6-4b05-ac98-398cc033525c" width="300">
    </td>
  </tr>
  <tr>
    <td align="left"><b>Users can select the <em>date</em> for the request from the date-picker</b></td>
    <td align="left"><b>Users can then pick the <em>time</em> for the request from the time-picker</b></td>
  </tr>
</table>


### **Leaving a Comment (Optional)**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3d837b83-f088-4b29-b92c-311e88339ac6" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>Users can leave a <em>message for the officer</em> with any additional details.</b>
    </td>
  </tr>
</table>

### **Submitting & Viewing the Request and Canceling a Request**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c08d4692-1dda-440b-9781-1e0c4b0ffbc7" width="300">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/4b8b7e68-71b1-441b-b9b6-6c3e5fe20f9f" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>Submitting & Viewing the Request:</b> Once submitted, the request moves to a <b>pending status</b> while waiting for an officer to accept.
    </td>
    <td align="left">
      <b>Canceling a Request:</b> Users can <b>cancel their request</b> if needed.<br>
      - A <b>reason must be provided</b> before canceling.
    </td>
  </tr>
</table>


### **Viewing Past Requests**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/271e797b-d154-45cb-8316-b3e6ab2894f8" width="300">
    </td>
  </tr>
  <tr>
    <td align="left">
      <b>In the <em>student app's account page</em>, users can view <b>past ride requests</b>.</b><br>
      - The newly submitted request appears under the <b>"Pending"</b> section.
    </td>
  </tr>
</table>




### **Navigating the Officer App**
We are now on the **Officer Home Screen**, where users can manage two types of requests:
✔ **(Instant) Requests**  
✔ **Reserved Requests**  
Both request types are displayed in chronological order.

- **(Instant) Requests Page**

<img src="https://github.com/user-attachments/assets/b14ae7da-d571-4f0b-adfd-6dfca704c299" width="300">

- **Reserved Requests Page**

<img src="https://github.com/user-attachments/assets/282d7530-97b5-48d5-80d3-876975c050f0" width="300">
<img src="https://github.com/user-attachments/assets/dc6a8e62-806e-4cf3-a03a-b41be6f89128" width="300">
<img src="https://github.com/user-attachments/assets/6a9b81ec-50b7-4490-b3e4-f8c573fe55cb" width="300">
<img src="https://github.com/user-attachments/assets/a41fb5b0-57ab-41ad-bff0-0b6be9ffc346" width="300">
<img src="https://github.com/user-attachments/assets/ce3001f3-be6c-46b8-af87-80c19bb6cda1" width="300">
<img src="https://github.com/user-attachments/assets/3ba93b63-e6e6-40e0-bd43-5e331803345c" width="300">
<img src="https://github.com/user-attachments/assets/53c7ffe5-d99f-47c6-89bc-abff834330a5" width="300">
<img src="https://github.com/user-attachments/assets/6aecaa1b-8b5e-41e1-bae5-6bc2063b13eb" width="300">
<img src="https://github.com/user-attachments/assets/7fe15dc6-57e2-4c2f-949e-5b756dcac9f9" width="300">
<img src="https://github.com/user-attachments/assets/73d7e069-4288-4831-8521-1a3888ac7f37" width="300">
<img src="https://github.com/user-attachments/assets/519377e0-0745-4d1c-a0aa-a5d16f339a2d" width="300">
<img src="https://github.com/user-attachments/assets/9ad39fff-2220-4399-a4bc-5f5853211517" width="300">
<img src="https://github.com/user-attachments/assets/6f61c5ec-81da-4870-b92b-dd78e8a902b2" width="300">
<img src="https://github.com/user-attachments/assets/dffc5a1c-65e8-4f36-a85d-43de6caa580b" width="300">
<img src="https://github.com/user-attachments/assets/c3063655-570b-4823-b3c4-ce4e3737ade5" width="300">
<img src="https://github.com/user-attachments/assets/15b206fc-4060-4a99-b890-e75b7b8db00e" width="300">
<img src="https://github.com/user-attachments/assets/60a97d8e-0b8e-4f73-ad8b-33959f0b8c92" width="300">

I'm still working on the demo of the app with the screenshots. Will come back to explaining these screenshots.

---

## Conclusion & Project Impact  

This project **streamlined Campus Safety operations**, reducing response times and improving efficiency.  
Developing this full-stack system strengthened my skills in **scalable architecture, security, and user-centric software development**.  
