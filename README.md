<div >
  <h1>Chat-Ease</h1>
  <p><em>Real-time messaging made simple</em></p>
  
  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"  />
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Socket.io-4.7.5-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </p>
</div>

## About Chat-Ease

Chat-Ease is a **real-time chat application** designed to facilitate seamless communication between users. It offers an intuitive interface and modern features to enhance user interaction, ensuring a responsive and engaging experience.

---

## Screenshots

<div >
  <h3>Authentication</h3>
  <img src="assets/login.png" alt="Login Page" width="700" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
  
  <h3>Home</h3>
  <img src="assets/home.png" alt="Home Page" width="700" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
  
  <h3>Chat Interface</h3>
  <img src="assets/overview.png" alt="Chat Overview" width="700" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
</div>

---



## Key Features

-  **User Registration and Authentication:** Secure user sign-up and login functionality
-  **Profile Management:** Update and manage user profiles with ease
-  **Real-Time Messaging:** Instant messaging powered by **Socket.io**
-  **User Search:** Find other users with an integrated search feature
-  **Media File Uploads:** Share images and videos via **Cloudinary**
-  **Online Status Indicators:** View real-time online status of users
-  **Emoji Support:** Express yourself with emoji picker
-  **Modern UI/UX:** Dark theme with gradient designs and smooth animations

## Technologies Used

### Frontend
- **React** - Building the user interface
- **Redux Toolkit** - State management for predictable data flow
- **React Router** - Client-side routing for seamless navigation
- **Axios** - HTTP requests for data fetching
- **Tailwind CSS** - Modern styling with utility-first approach
- **Socket.io-client** - Real-time communication
- **React Icons** - Comprehensive icon library
- **Moment.js** - Date and time formatting
- **React Modal** - Modal components for image viewing
- **Emoji Picker React** - Emoji selection functionality

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - RESTful API development
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Object Data Modeling (ODM) for MongoDB
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Secure user authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Cloud storage for media files
- **CORS** - Cross-origin resource sharing


## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmed-226/Chat-Ease.git
   cd Chat-Ease
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   
   cp .env.example .env
   
   npm run docker:up
   
   npm run dev
   ```

3. **Set up the client**
   ```bash
   cd ../client
   npm install
   
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000
   - MongoDB Admin: http://localhost:8081

### Environment Variables

#### Server (.env)
```env
PORT=4000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://admin:password@localhost:27017/chatease?authSource=admin
JWT_SECRET=your_jwt_secret_key
```

#### Client (.env)
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
BACKEND_URL=http://localhost:4000
```

## Features Overview

### Real-Time Communication
- Instant messaging with Socket.io
- Online/offline status indicators
- Message delivery confirmations
- Real-time conversation updates

### Media Sharing
- Image upload and sharing
- Video upload and sharing
- Full-screen image viewing modal
- Cloudinary integration for optimized storage

### User Experience
- Responsive design for all devices
- Dark theme with modern gradients
- Smooth animations and transitions
- Emoji picker for expressive messaging
- User search and discovery

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Secure file uploads
- Protected routes and API endpoints


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.