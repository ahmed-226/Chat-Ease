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

Chat-Ease is a **modern full-stack real-time chat application** that demonstrates advanced web development skills using cutting-edge technologies. Built with React and Node.js, it offers seamless real-time communication, media sharing, and user management with a focus on performance, security, and user experience.

### 🎯 **Portfolio Highlights**
- **Real-time WebSocket communication** with Socket.IO
- **Secure JWT authentication** with bcrypt password hashing
- **Cloud media storage** integration with Cloudinary
- **Modern responsive UI** with Tailwind CSS and dark theme
- **Scalable MongoDB database** design with Mongoose ODM
- **RESTful API** architecture with Express.js

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

-  ⚡ **Real-Time Messaging:** Instant messaging powered by **Socket.io** WebSocket connections
-  🔐 **Secure Authentication:** JWT-based user registration and login with bcrypt password hashing
-  👤 **Profile Management:** Complete user profile system with avatar uploads
-  🔍 **User Discovery:** Advanced search functionality to find users by name or email
-  📸 **Media Sharing:** Upload and share images and videos via **Cloudinary** CDN
-  🟢 **Online Status:** Real-time online/offline status indicators for all users
-  😀 **Emoji Support:** Express yourself with integrated emoji picker
-  🎨 **Modern UI/UX:** Dark theme with gradient designs, smooth animations, and responsive layout
-  📱 **Cross-Platform:** Fully responsive design optimized for mobile, tablet, and desktop
-  🔒 **Security Features:** Protected routes, input validation, and secure file uploads

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

## 🏆 Technical Achievements

### **Architecture & Design Patterns**
- **Component-based React architecture** with reusable UI components
- **Redux Toolkit** for predictable state management and data flow
- **RESTful API design** following industry best practices
- **Separation of concerns** with organized file structure
- **Modular design** for easy maintenance and feature additions

### **Real-time Implementation**
- **WebSocket connections** using Socket.IO for instant communication
- **Event-driven architecture** for handling real-time updates
- **Connection pooling** and user session management
- **Efficient message broadcasting** to specific users and rooms
- **Automatic reconnection** handling for robust user experience

### **Database Design**
- **MongoDB schema optimization** with proper indexing
- **Relationship modeling** between users, conversations, and messages
- **Query optimization** for fast search and data retrieval
- **Data validation** with Mongoose schemas
- **Efficient aggregation pipelines** for complex data operations

### **Performance Optimizations**
- **Lazy loading** for images and components
- **Memoization** with React.memo and useMemo hooks
- **Debounced search** to reduce API calls
- **Image optimization** through Cloudinary transformations
- **Bundle optimization** with code splitting

### **Security Implementation**
- **JWT token authentication** with refresh token strategy
- **Password hashing** using bcrypt with salt rounds
- **Input validation** and sanitization on both client and server
- **CORS configuration** for secure cross-origin requests
- **File upload security** with type and size validation

## Installation

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

### 🚀 Real-Time Communication
- **Instant messaging** with Socket.io WebSocket connections
- **Online/offline status** indicators with real-time updates
- **Message delivery confirmations** and read receipts
- **Real-time conversation updates** for seamless chat experience
- **Connection management** with automatic reconnection

### 📱 Media Sharing & Storage
- **Image upload and sharing** with drag-and-drop support
- **Video upload and sharing** with playback controls
- **Full-screen media viewing** modal with zoom capabilities
- **Cloudinary CDN integration** for optimized global delivery
- **File type validation** and size limit enforcement

### 🎨 User Experience & Design
- **Fully responsive design** for all screen sizes and devices
- **Modern dark theme** with gradient accents and professional styling
- **Smooth animations and transitions** for enhanced user interaction
- **Emoji picker integration** for expressive messaging
- **User search and discovery** with real-time filtering
- **Intuitive navigation** with clear visual hierarchy

### 🔐 Security & Performance
- **JWT-based authentication** with secure token management
- **Password hashing** with bcrypt for maximum security
- **Protected API endpoints** with middleware validation
- **Input sanitization** and XSS protection
- **Optimized database queries** with MongoDB indexing
- **Performance monitoring** and error handling


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.