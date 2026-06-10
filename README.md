# salveshanthidurga

A modern, elegant academic portfolio for Bachelor of Education (B.Ed) students — with a secure admin panel powered by Firebase.

![React](https://img.shields.io/badge/React-19-61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)

## Features

### Public Portfolio
- Hero, About, and semester-wise content sections
- Curricular & co-curricular activities with image galleries
- Clean professional image frames with subtle borders and shadows
- Dark/light mode, search, semester filter
- PDF export & print-friendly layout
- Smooth animations & lazy-loaded images

### Admin Panel
- Firebase Authentication
- Profile management
- Content CRUD with rich text editor
- Multi-image upload with auto-compression (~200KB each, base64 in Firestore)
- Drag-and-drop reordering

## Tech Stack

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Backend:** Firebase (Auth, Firestore) — images stored as base64 in Firestore

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Firebase config

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the portfolio and [http://localhost:5173/admin/login](http://localhost:5173/admin/login) for admin.

## Documentation

- [Firebase Setup](./docs/FIREBASE_SETUP.md)
- [Admin Credentials](./docs/ADMIN_SETUP.md)
- [Vercel Deployment](./docs/DEPLOYMENT.md)

## Project Structure

```
src/
├── components/     # UI components (portfolio, admin, common)
├── pages/          # Route pages
├── layouts/        # Main & admin layouts
├── hooks/          # Custom React hooks
├── context/        # Auth & theme providers
├── firebase/       # Firebase initialization
├── services/       # Firestore & storage services
└── utils/          # Helpers (compression, PDF, constants)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## License

MIT
