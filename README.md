# BookWeb Frontend

This is the **frontend** for the BookWeb online bookstore system, built with React and TypeScript. It provides a complete shopping experience for users and a powerful admin dashboard for management.

---

## Table of Contents
- [Features](#features)
- [Installation & Getting Started](#installation--getting-started)
- [Project Structure](#project-structure)
- [Main Components](#main-components)
- [Admin Dashboard](#admin-dashboard)
- [Configuration & Environment](#configuration--environment)
- [Contributing](#contributing)

---

## Features

### For Users
- Register, login (with Google OAuth support)
- Browse book categories, view book details, search, and filter by category
- Add to cart, update quantity, remove items
- Checkout (COD, Momo, VNPAY), manage shipping addresses
- View order history, review purchased books
- Personal account page: update info, manage addresses, orders, reviews

### For Admins
- Dashboard with overall statistics (orders, revenue, users, books)
- Book management: add, edit, delete, search, pagination
- Order management: update status, view details, delete orders
- User management: add, edit, lock/unlock accounts, search
- Category management

---

## Installation & Getting Started

### Requirements
- Node.js >= 16
- npm >= 8

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm start
```
Visit [http://localhost:3000](http://localhost:3000)

### Build for production
```bash
npm run build
```

### Run tests
```bash
npm test
```

> **Note:** The frontend proxies API requests to `http://localhost:8080` (see `package.json`).

---

## Project Structure

```
src/
  components/      # User-facing UI components (Header, Footer, Product, Cart, Auth, ...)
  admin/           # Admin pages and components (Dashboard, Books, Orders, Users, ...)
  services/        # API calls and data logic (bookService, orderService, userService, ...)
  hooks/           # Custom React hooks (useCartApi, ...)
  store/           # Global state management (CartContext, ...)
  App.tsx          # Main app layout and routing
  index.tsx        # App entry point
```

---

## Main Components

- **Home Page:** Banner, categories, new releases, flash sale, recommendations, newsletter
- **Book Detail Page:** Images, description, reviews, add to cart, buy now, related books
- **Shopping Cart:** View, update, remove items, apply promo code
- **Checkout:** Select address, payment method, confirm order
- **Account:** Profile, change password, manage addresses, orders, reviews
- **Authentication:** Modal for login/register, Google OAuth support

---

## Admin Dashboard

- **Dashboard:** Overview stats, revenue chart, order status pie, recent activity
- **Book Management:** Add/edit/delete, search, pagination, view details
- **Order Management:** View, update status, delete, statistics
- **User Management:** Add/edit/delete, lock/unlock, search
- **Category Management:** Add/edit/delete book categories

> Access `/admin` for the admin dashboard (admin account required).
- **admin acount:** admin@gmail.com, pass: 123456

---

## Configuration & Environment

- **API Proxy:** Configured in `package.json` (`proxy: "http://localhost:8080"`)
- **Environment Variables:** You can add a `.env` file for API endpoints, OAuth keys, etc.
- **Main Libraries:** React, React Router, TypeScript, FontAwesome, Lucide, react-slick, Google OAuth, etc.

---

## Contributing

- Fork and create pull requests to contribute code
- For feedback, bug reports, or feature requests, please open an issue on the repository

---

**Copyright & Developed by BookWeb Team**
