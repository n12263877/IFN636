# Laptop Store Management System

## Project Overview

This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse and purchase laptops online, while administrators can manage products and view customer orders.

The system provides a complete e-commerce workflow including authentication, product management, cart functionality, and checkout.

----

## Features

### 👤 User Features

- Register and login
- Browse available laptops
- Search products
- View product details
- Add products to cart
- Checkout and place orders

### Admin Features

- Login as admin
- Add new products
- Edit product details
- Delete products
- View all products
- View all customer orders

---

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Version Control:** GitHub

---

## Project Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Public URL

Frontend URL:

```
http://100.27.233.254/
```

Backend URL:

```
http://100.27.233.254:5001/api/products
```


---

## Test Credentials

### 👤 Admin Login

- **Email:** [admin@gmail.com](mailto:admin@gmail.com)
- **Password:** Admin123

### 👤 User Login

- You can register a new user from the signup page.

---

## How to Use

1. Register or login as a user
2. Browse products from the Products page
3. Add items to cart
4. Proceed to checkout and place order

Admin:

1. Login using admin credentials
2. Access dashboard
3. Manage products (Add/Edit/Delete)
4. View all orders

---

## Project Structure

```
/backend
  /models
  /routes
  /controllers

/frontend
  /components
  /pages
  /services
```

---

## Notes

- Admin access is restricted using role-based authentication
- JWT is used for secure login sessions
- All product operations are protected on the backend

---

## Conclusion

This project demonstrates a complete full-stack application with real-world features such as authentication, CRUD operations, and order management. It follows modern development practices and provides a scalable structure for future enhancements.

---
