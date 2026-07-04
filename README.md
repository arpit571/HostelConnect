# 🏠 HostelConnect

A full-stack **MERN Hostel Management System** that simplifies hostel operations by providing complaint management, notice management, and secure role-based authentication for students and administrators.

---

## 🚀 Live Demo

🌐 **Frontend:**  
https://hostel-connect-mu.vercel.app/

⚙️ **Backend API:**  
https://hostelconnect-api-uwae.onrender.com/

📂 **GitHub Repository:**  
https://github.com/arpit571/HostelConnect

---

## ✨ Features

### 👨‍🎓 Student

- User Registration & Login
- Secure JWT Authentication
- Raise Complaints
- Track Complaint Status
- View Hostel Notices
- Responsive Dashboard

### 👨‍💼 Admin

- Admin Dashboard
- View All Complaints
- Update Complaint Status
- Create & Manage Notices
- Dashboard Statistics

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- bcryptjs

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## 📸 Screenshots

### Login

![Login](./screenshots/login.png)

---

### Register

![Register](./screenshots/register.png)

---

### Student Dashboard

![Student Dashboard](./screenshots/student-dashboard.png)

---

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

### Complaints

![Complaints](./screenshots/complaints.png)

---

### Notice Board

![Notices](./screenshots/notices.png)

---

## 📁 Project Structure

```
HostelConnect
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── screenshots
├── README.md
├── LICENSE
└── .env.example
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/arpit571/HostelConnect.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file using the provided `.env.example`.

Backend:

```
PORT=
MONGO_URI=
JWT_SECRET=
```

Frontend:

```
VITE_API_URL=
```

---

## 🎯 Future Improvements

- Email Notifications
- File Attachments in Complaints
- Search & Filters
- Analytics Dashboard
- Dark Mode
- Mobile Application

---

## 👨‍💻 Author

**Arpit Upadhyay**

GitHub: https://github.com/arpit571

---

## 📄 License

This project is licensed under the MIT License.
