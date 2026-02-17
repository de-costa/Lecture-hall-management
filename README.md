# Lecture Hall Management System (Timelyx)

## Software Engineering Project | MERN Stack

---
<br>

## 1. Project Overview

The **Lecture Hall Management System (LHMS)** is a web-based application designed to efficiently manage lecture halls, lecture schedules, and user access within a university environment. The system aims to eliminate scheduling conflicts, improve lecture hall utilization, and provide a centralized and reliable timetable management platform.

This project is developed as part of the **Software Engineering** module and follows a complete software engineering lifecycle, including requirement elicitation, system analysis, design, implementation, testing, and documentation. The development process follows **Agile (Scrum)** methodology and applies industry-standard software engineering best practices.

---
<br>

## 2. Objectives

The primary objectives of this system are:

- To provide a centralized platform for lecture hall and schedule management
- To prevent lecture hall booking conflicts through an approval-based workflow
- To support multiple stakeholders with role-based access control
- To demonstrate correct application of software engineering principles
- To develop a scalable, maintainable, and well-documented system

---
<br>

## 3. Scope of the System

### In Scope
- Lecture hall registration and management
- Lecture and event scheduling with conflict detection
- Role-based access control (Lecturer, Student, HOD, TO)
- Approval-based booking workflow
- Timetable viewing for lecturers and students
- Secure authentication and authorization
- Notification handling for schedule changes

### Out of Scope
- Online lecture delivery
- Attendance tracking
- Payment or billing functionality
- External LMS integrations

---
<br>

## 4. Stakeholders and User Roles

- **Lecturer**  
  Requests lecture halls, views personal timetables, and updates booking requests subject to approval.

- **Student**  
  Views personal lecture timetables and allocated lecture halls.

- **Head of Department (HOD)**  
  Reviews, approves, or rejects lecture hall booking requests and oversees departmental scheduling.

- **Technical Officer (TO)**  
  Verifies and approves user account registrations manually before system access is granted.

---
<br>

## 5. Technology Stack

- **Frontend**: React.js  
- **Backend**: Node.js with Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT-based authentication  
- **Version Control**: Git and GitHub  
- **Project Management**: Jira (Scrum-based workflow)

---
<br>

## 6. System Architecture

The system follows a **client–server architecture**:

- The React frontend provides role-based user interfaces
- The Node.js/Express backend handles business logic, validation, approvals, and notifications
- MongoDB is used for persistent data storage
- RESTful APIs are used for communication between client and server
- Authentication and authorization are enforced at the server level

This architecture promotes **low coupling**, **high cohesion**, and future scalability.

---
<br>

## 7. Repository Structure

```text
Lecture-hall-management/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── context/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Node.js backend
│ ├── src/
│ │ ├── config/
│ │ ├── models/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── middleware/
│ │ ├── app.js
│ │ └── server.js
│ └── tests/
│
├── docs/ # Software Engineering documentation
│ ├── PM/
│ ├── RA/
│ ├── QA/
│ └── User_Documentation.md
│
├── tests/ # Integration and system tests
│
├── .github/
│
├── .gitignore
├── README.md
└── package.json

```
---
<br>

## 8. Software Engineering Practices Followed

- Agile development using Scrum
- Sprint-based development with weekly reviews
- Requirements traceability from SRS to testing
- UML-based system design
- SOLID principles for clean code
- Low coupling and high cohesion
- Continuous testing and refactoring

---
<br>

## 9. Non-Functional Requirements (Summary)

- **Usability**: Simple and intuitive interfaces
- **Performance**: Fast response under normal load
- **Security**: Role-based access control
- **Availability**: Accessible during university working hours

---
<br>

## 10. Installation and Setup

### Prerequisites
- Node.js (LTS)
- MongoDB
- Git

### Steps

1. Clone the repository:
```text
git clone Lecture-hall-management
```
---
<br>


2. Install backend dependencies:
```text
cd server
npm install
```
---
<br>


3. Install frontend dependencies:
```text
cd server
npm install
```
---
<br>


4. Configure environment variables (MongoDB URI, JWT secret)

5. Run the application:
```text
npm run dev
```
---
<br>

## 11. API Overview (High Level)

- `POST /api/auth/login` – User authentication
- `GET /api/halls` – Retrieve lecture halls
- `POST /api/schedules` – Create lecture schedules
- `GET /api/schedules` – View lecture schedules

---
<br>

## 12. Testing Strategy

- Unit testing for backend services
- Integration testing for scheduling logic
- Manual and automated test cases
- Bug tracking and reporting using Jira

---
<br>

## 13. Project Management

- Scrum-based development
- Weekly sprint planning and reviews
- Task and issue tracking via Jira
- Version control using Git

---
<br>

## 14. Contributors

Developed by a student team as part of the **Software Engineering** module, Faculty of Engineering.

---
<br>

## 15. Academic Disclaimer

This project is developed strictly for academic purposes and learning outcomes of the Software Engineering course.

---
<br>

