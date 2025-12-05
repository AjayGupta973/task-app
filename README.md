# 🚀 Ajay App Store - E-Commerce App

This project is a functional e-commerce web application built to fulfill the given assignment requirements. It demonstrates React application architecture, state management with MobX + Context API, dynamic routing, persistent cart state, URL-based filters, and automated E2E testing using Cypress.

## 📌 Summary

Users can:

- View a list of products fetched from FakeStore API
- Filter products by category and sort by price
- Share URLs with filters preserved (refresh/back button safe)
- View detailed product information via dynamic route
- Add items to the shopping cart
- Remove items from the cart
- See cart total and item count persist 

The application is responsive and built entirely using **React functional Components** with inline CSS, as required.

---

## 🧰 Tech Stack

| Feature | Technology |
|--------|------------|
| UI Library | React (Class Components Only) |
| Router | React Router DOM |
| State Management | MobX + Context API |
| Styling | Inline CSS |
| API | https://fakestoreapi.com |
| Persistence | sessionStorage |
| E2E Testing | Cypress |
| Build Tool | Create React App |

---

## ✨ Features

1. Product listing homepage  
2. Dynamic product details page (`/product/:id/details`)  
3. Add item to cart  
4. Remove item from cart (quantity-aware)  
5. Multiple category filters (checkboxes)  
6. Price sorting (Low→High / High→Low)  
7. Filter & sorting synced in URL query params  
8. Full browser navigation compatibility  
9. Shareable filter state from URL  
10. Persistent cart using `sessionStorage`  
11. Cypress E2E test covering main flow  
12. Mobile-responsive inline styling  

## 🔗 URL-Based Filter Example

http://localhost:3000/?categories=electronics,jewelery&sort=price_desc

Opening this URL on another device loads the **exact same filtered and sorted view**.

---

## 📁 Folder Structure
src/
│── App.js
│── index.js
│── api.js
│
├── components/
│ ├── Header.js
│ ├── Footer.js
│ └── ProductCard.js
│
├── pages/
│ ├── HomePage.js
│ ├── ProductDetailPage.js
│ └── CartPage.js
│
├── context/
│ └── CartContext.js
│
└── store/
└── CartStore.js


## Installation & Running

### Install Dependencies

npm install

### Run the 
npm start

http://localhost:3000

## Launch Cypress UI
npx cypress open
npx cypress run

### Developed By

Ajay Gupta
Frontend Developer