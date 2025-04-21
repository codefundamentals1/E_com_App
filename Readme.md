# E-Commerce Cart System

## Overview
This project is a simple e-commerce shopping cart system built using **React.js** for the frontend and **Node.js (Express)** for the backend. The cart allows users to add, update, and remove items dynamically, with state management handled using React hooks.

## Features
- Fetch cart items from the backend API.
- Display detailed cart items with quantity and pricing.
- Update item quantity dynamically.
- Remove items when quantity reaches zero.
- Calculate total, tax, discount, and grand total dynamically.

## Technologies Used
### **Frontend:**
- React.js (with Hooks)
- Axios (for API requests)

### **Backend:**
- Node.js (Express.js)
- `Map()` for managing cart data
- MongoDB for database

## Setup & Installation
### **1. Clone the Repository**
```sh
clone this repo
cd your-project-folder
```

### **2. Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
```
#### **Backend**
```sh
cd backend
npm install
```
### **3. Start the Development Server**
#### **Backend**
```sh
npm start
```
#### **Frontend**
```sh
npm run dev
```


## Future Improvements
- Payment gateway integration

## Author
Feel free to contribute or raise issues!

## License

## cmd
```sh
find . -maxdepth 2 -name server.js | xargs -I {} -P 0 alacritty -e bash -c 'cd $(dirname {}) && npm i s' \;
find . -maxdepth 2 -name server.js | xargs -I {} -P 0 alacritty -e bash -c 'cd $(dirname {}) && nodemon server.js' \;
```