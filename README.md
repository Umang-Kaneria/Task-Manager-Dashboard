# Task Manager Dashboard

This is a full-stack Task Manager Dashboard built with Next.js, React, Firebase Firestore/Auth, Tailwind CSS, Material UI (MUI), and Zustand. All CRUD and authentication are handled via Next.js API routes.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** (Email/Password) and **Firestore Database**.
- Copy your Firebase config and update `src/lib/firebase.js` with your credentials.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- User authentication (register/login/logout)
- Create, read, update, delete projects and tasks
- User-specific data filtering
- Responsive dashboard UI
- Modals for project/task creation and editing
- Zustand for state management
- Tailwind CSS and MUI for styling

## Deployment

You can deploy this app to [Vercel](https://vercel.com/) or any platform that supports Next.js. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## API Routes

All backend logic is handled via Next.js API routes in `src/pages/api/`:
- `src/pages/api/auth/` for authentication
- `src/pages/api/projects/` for project CRUD
- `src/pages/api/tasks/` for task CRUD

## License
MIT
