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

## Setup & Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo-url.git
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
#### **Frontend**
```sh
npm run dev
```
#### **Backend**
```sh
npm start
```

## API Endpoints
### **GET /api/getCart**
Fetches the cart items stored in the backend.

### **POST /api/add**
Adds an item to the cart.
#### **Request Body:**
```json
{
  "getid": "123"
}
```

## Key Code Snippets
### **Updating Item Quantity in State (Frontend)**
```javascript
const updateItemCount = (id, newCount) => {
  setdetailedCartItem((prevItems) =>
    prevItems
      .map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      )
      .filter((item) => item.count > 0) // Remove if count = 0
  );
};
```

### **Handling Cart Data (Backend)**
```javascript
const cart = new Map();

const handleAddToCart = (id) => {
  cart.set(id, (cart.get(id) || 0) + 1);
};

const handleDelFromCart = (id) => {
  if (cart.get(id) === 1) {
    cart.delete(id);
  } else {
    cart.set(id, cart.get(id) - 1);
  }
};
```

## Future Improvements
- User authentication (login/register)
- Persistent cart storage in a database
- Payment gateway integration

## Author
Feel free to contribute or raise issues!

## License

