SecureAuth: Passwordless Biometric Authentication
🧩 Project Overview
SecureAuth is a modern web application demonstrating secure, passwordless authentication using WebAuthn (FIDO2) biometric technology. It provides a seamless and secure login experience by replacing traditional passwords with fingerprint, face recognition, or hardware security keys.

This project is structured as a Multi-Page Application (MPA) using Vite, featuring:

index.html (Home)

service.html (Services)

contact.html (Contact)

All pages maintain a consistent, professional UI/UX design.

✨ Features
🔒 Passwordless Authentication
Secure login and registration using WebAuthn, leveraging device biometrics (fingerprint, Face ID) or security keys.

🧠 Secure Session Management
Uses sessionStorage for basic client-side authentication state (for demo purposes only).

🌐 Multi-Page Application (MPA)
Home (index.html): Landing page with biometric login/signup.

Services (service.html): Overview of cybersecurity services.

Contact (contact.html): Contact form and information.

🎨 Modern UI/UX Design
Consistent design across all pages (inspired by cyber security platforms).

Tailwind CSS utility-based styling.

Gradient backgrounds and accent colors.

Subtle glassmorphism effects.

Modern typography (Inter font).

Font Awesome icons for clarity.

Smooth hover and UI animations.

📱 Responsive Layout
Optimized for all screen sizes: desktop, tablet, and mobile.

⏳ Loading Indicators
User-friendly overlays shown during login and registration flows.

🧰 Technologies Used
Frontend
HTML5

CSS3 with Tailwind CSS

JavaScript (ES6+)

Vite for MPA bundling

SimpleWebAuthn/browser for WebAuthn support

Font Awesome for icons

Google Fonts (Inter)

Backend (API)
Node.js & Express.js (running on Render)

Render.com for backend API hosting

🧪 Setup and Installation (Local Development)
✅ Prerequisites
Node.js (LTS)

npm or Yarn

Modern browser with WebAuthn support (Chrome, Safari, Firefox, Edge)

🧾 Steps
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/secureauth.git
cd secureauth
2. Install Dependencies
bash
Copy
Edit
npm install
# OR
yarn install
3. Vite Config for MPA
Make sure your vite.config.js is properly configured:

js
Copy
Edit
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        service: resolve(__dirname, 'service.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
4. Run Development Server
bash
Copy
Edit
npm run dev
# OR
yarn dev
Then visit: http://localhost:5173

🚀 Usage
🔐 Authentication Flow
Enter your email on the Home/Login page.

Click Create Account and complete your biometric/passkey setup.

Click Sign In to authenticate.

If successful, you're redirected to service.html.

🔄 Navigation
Use the navigation menu to switch between:

Home (index.html)

Services (service.html)

Contact (contact.html)

🔓 Logout
A logout button clears your session and returns you to index.html.

📁 Project Structure
php
Copy
Edit
.
├── index.html            # Home/Login
├── service.html          # Services page
├── contact.html          # Contact page
├── main.js               # WebAuthn logic
├── styles.css            # Tailwind or custom CSS
├── vite.config.js        # Vite config for MPA
├── package.json          # Project metadata
├── tailwind.config.js    # Tailwind settings
└── public/               # Static assets
🧑‍💻 Deployment
1. Build the Project
bash
Copy
Edit
npm run build
# OR
yarn build
2. Deploy to Vercel
Connect your GitHub/GitLab repo to Vercel.

Vercel auto-detects Vite and runs npm run build.

Important: Set the base: '/' in vite.config.js.

Your app will be live at:

arduino
Copy
Edit
https://your-project-name.vercel.app/
🤝 Contributing
Contributions welcome!

Fork the repo

Create a branch

Make changes

Open a PR

bash
Copy
Edit
git checkout -b feature/your-feature
git commit -m "Added a new feature"
git push origin feature/your-feature
📄 License
Licensed under the MIT License.

📬 Contact
Mohammed Mogeab

GitHub: MohammedMogeab

Twitter/X: @MohammedMogeab

