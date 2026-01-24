# Frenmio

Frenmio is a modern, real-time video conferencing application built with React, WebRTC, and Socket.io. It allows users to create and join rooms for video calls, screen sharing, real-time chat, and collaborative whiteboarding.

## Features

- **Real-time Video & Audio**: High-quality peer-to-peer communication using WebRTC.
- **Screen Sharing**: Share your screen with other participants in the room.
- **Instant chat**: Built-in text chat for communicating with peers.
- **Whiteboard**: Collaborative whiteboard for drawing and brainstorming.
- **Room Management**: Easy creation and joining of rooms via unique IDs or links.
- **Modern UI**: Sleek interface built with Tailwind CSS and Fluent UI.
- **Responsive Design**: Works across different screen sizes.

## Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (TypeScript)
- **Build Tool**: [Craco](https://craco.js.org/) (Create React App Configuration Override)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **WebRTC**: [simple-peer](https://github.com/feross/simple-peer) & [socket.io-client](https://socket.io/docs/v4/client-api/)
- **Whiteboard**: [Excalidraw](https://excalidraw.com/) libraries (`@excalidraw/excalidraw`)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Signaling**: [Socket.io](https://socket.io/)
- **Language**: TypeScript

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd frenmio
```

### 2. Set up the Server

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (or remove `.example` from `.env.example`):
```bash
# server/.env
PORT=5005
ALLOW_ORIGIN=["http://localhost:3000"] # Adjust to match your client URL
```

Start the development server:
```bash
npm run dev
```
The server will start on port `5005`.

### 3. Set up the Client (Frontend)

Open a new terminal, navigate to the root directory, and install dependencies:
```bash
cd .. # if you are in server directory
npm install
```

Create a `.env` file in the root directory:
```bash
# .env
REACT_APP_SAME_ORIGIN_SOCKET_PORT=5005
# If running on a different host/port, use REACT_APP_SOCKET_URL
# REACT_APP_SOCKET_URL=http://localhost:5005
```

Start the frontend application:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Project Structure

```
frenmio/
├── server/                 # Backend signaling server
│   ├── index.ts            # Entry point for the server
│   └── ...
├── src/                    # Frontend source code
│   ├── app/                # Main application logic (Room view)
│   ├── comps/              # Reusable UI components
│   ├── landing/            # Landing page components
│   ├── state/              # Global state (Zustand stores)
│   ├── utils/              # Helper functions and hooks
│   ├── index.tsx           # Entry point
│   └── ...
├── public/                 # Static assets
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
