# Lecture Hall Management System – Frontend

A role-based Lecture Hall Management System designed to streamline lecture hall booking, approval workflows, scheduling and academic notifications within a university environment.

This frontend application provides dedicated dashboards and interfaces for Lecturers, Students and Department Heads (HOD), ensuring efficient and conflict-free hall allocation.

---

## 🚀 Overview

The system enables:

- Smart lecture hall booking
- HOD approval workflow
- Student timetable visibility
- Notice and academic announcement management
- Conflict detection and scheduling transparency

The UI is designed with clarity, accessibility and role-based separation in mind.

---

## 🏗️ Tech Stack

- React
- Vite
- JavaScript / JSX
- CSS / Tailwind (if used)
- ESLint

---

## 👥 Role-Based Interfaces

### 1️⃣ Lecturer Interface
- Dashboard (booking statistics & activity summary)
- Hall Availability search & filter
- My Bookings (Pending / Approved / Rejected)
- Booking History
- Notice Management
- Profile Management

### 2️⃣ Department Head (HOD) Interface
- Dashboard with approval metrics
- Pending Approval Requests
- Approval History
- Hall Schedule Overview
- Notice Management
- Booking approval / rejection workflow

### 3️⃣ Student Interface
- Academic Dashboard
- Daily & Weekly Timetable
- Notice Board
- Profile Management

---

## ✨ Key Features

- Role-Based Access Control (RBAC)
- Conflict Detection (Prevents double booking)
- Smart Filtering (Date, Capacity, Time Slot)
- Approval Workflow System
- Centralized Notice Board
- Clean and Responsive UI

---

## 📂 Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # Role-based pages (Lecturer, HOD, Student)
├── layouts/           # Dashboard layouts
├── assets/            # Images and static files
├── services/          # API integration layer
└── App.jsx
```

