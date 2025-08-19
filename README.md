# Delivery Food App

A full-stack food delivery application built using the MERN stack (MongoDB, Express, React, and Node.js). The app allows users to browse various restaurants, order food, track their order status, and pay online.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

Check out the live demo of the application [here](https://example.com).

---

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **Browse Restaurants**: View a list of restaurants, menu items, and reviews.
- **Food Ordering**: Add items to cart, customize orders, and checkout.
- **Order Tracking**: Track the status of your orders in real-time.
- **Payments**: Secure online payment integration.
- **Admin Panel**: Manage restaurants, menus, orders, and users.

---

## Tech Stack

- **MongoDB**: NoSQL database for storing user data, restaurant details, and orders.
- **Express**: Backend web framework for building the API.
- **React**: Frontend library for building the user interface.
- **Node.js**: Server-side runtime for running the backend.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/youssefelzedy/Delivery-Food-App.git
   cd delivery-food-app
   ```

2. Install server dependencies:

   ```bash
   cd Back-End
   npm install
   npm start
   ```

3. Install client dependencies:

   ```bash
   cd ../Front-End
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the root of your `Back-End` directory and add the following environment variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-database
JWT_SECRET=your_jwt_secret_key
PAYMENT_API_KEY=your_payment_gateway_api_key
NODE_ENV=development
PORT=5000
```

---

## Running the App

### Backend

1. Navigate to the `Back-End` directory:

   ```bash
   cd Back-End
   ```

2. Start the backend server:

   ```bash
   npm start
   ```

   This will run the Express server at `http://localhost:5000`.

### Frontend

1. Navigate to the `Front-End` directory:

   ```bash
   cd ../Front-End
   ```

2. Start the React development server:

   ```bash
   npm start
   ```

   This will run the frontend at `http://localhost:3000`.

---

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Restaurants

- `GET /api/restaurants`: Get all restaurants
- `GET /api/restaurants/:id`: Get a single restaurant by ID

### Orders

- `POST /api/orders`: Place a new order
- `GET /api/orders/:id`: Get a single order by ID

---

## Screenshots

Include screenshots of your app here to give a visual overview of its features.

---

## Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue if you find any bugs or want to add new features.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
