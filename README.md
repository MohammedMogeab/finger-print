# SecureAuth: Biometric Authentication

SecureAuth is a web application that demonstrates passwordless authentication using WebAuthn technology. It allows users to sign up and log in using their device's biometric sensors (like fingerprint or face ID) or a security key.

## Features

- **Passwordless Authentication:** No passwords to remember or steal.
- **Enhanced Security:** Biometric data never leaves the user's device.
- **Cross-Platform:** Works on any device that supports the WebAuthn standard.
- **Easy to Use:** Simple and intuitive user interface.

## Technologies Used

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express:** Web framework for Node.js.
- **@simplewebauthn/server:** Library for WebAuthn authentication.
- **CORS:** Middleware for handling Cross-Origin Resource Sharing.
- **Cookie-Parser:** Middleware for parsing cookies.

### Frontend

- **Vite:** Build tool for modern web applications.
- **@simplewebauthn/browser:** Library for interacting with the WebAuthn API in the browser.
- **HTML, CSS, JavaScript:** Standard web technologies.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- A modern web browser that supports WebAuthn (e.g., Chrome, Firefox, Safari)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MohammedMogeab/finger-print.git
   cd finger-print
   ```

2. **Install backend dependencies:**

   ```bash
   cd api
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../client
   npm install
   ```

## Usage

1. **Start the backend server:**

   ```bash
   cd api
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

2. **Start the frontend development server:**

   In a new terminal, navigate to the `client` directory:

   ```bash
   cd client
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

3. **Open the application in your browser:**

   Navigate to `http://localhost:5173` to use the application.

## About the Author

This project was created by **Mohammed Mogeab**.

- **GitHub:** [@MohammedMogeab](https://github.com/MohammedMogeab)
- **X (Twitter):** [@MohammedMogeab](https://x.com/MohammedMogeab)