# Firebase Setup Guide

This guide walks you through connecting your B.Ed Portfolio to Firebase.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** and follow the wizard
3. Enable Google Analytics (optional)

## 2. Register Your Web App

1. In Project Overview, click the **Web** icon (`</>`)
2. Register app with nickname: `bed-portfolio`
3. Copy the `firebaseConfig` values

## 3. Enable Authentication

1. Go to **Build → Authentication → Sign-in method**
2. Enable **Email/Password**
3. Go to **Users** tab and click **Add user**
4. Create your admin email and password (save these securely)

## 4. Create Firestore Database

1. Go to **Build → Firestore Database**
2. Click **Create database**
3. Start in **production mode**
4. Choose a region close to your users

### Deploy Security Rules

From the project root:

```bash
firebase deploy --only firestore:rules
```

Or paste the contents of `firestore.rules` in the Firebase Console under **Rules**.

### Deploy Indexes

```bash
firebase deploy --only firestore:indexes
```

Or upload `firestore.indexes.json` when prompted by Firestore.

## 5. Image Storage (Firestore Base64)

This project does **not** use Firebase Storage. Images are:

1. Compressed in the browser (~200KB each, WebP)
2. Converted to base64 data URLs
3. Stored in the `images[]` array on each Firestore document

Firestore has a **1MB limit per document**, so keep descriptions concise and use at most **4 images** per activity.

## 6. Environment Variables

1. Copy `.env.example` to `.env` in the project root
2. Fill in your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=your_admin@email.com
```

3. Restart the dev server after changing `.env`

## 7. Initial Data (Optional)

The app works with default profile data out of the box. After logging into the admin panel:

1. Go to **Profile** and customize your information
2. Go to **Content Manager** and add semester activities

## Firestore Collections

| Collection     | Purpose                          |
|----------------|----------------------------------|
| `profile`      | Student hero & about (doc: `main`) |
| `curricular`   | Curricular activity items        |
| `cocurricular` | Co-curricular activity items     |
| `semesters`    | Reserved for future metadata     |

## Troubleshooting

- **Permission denied**: Ensure you're logged in as admin and rules are deployed
- **Index required**: Deploy `firestore.indexes.json` or click the link in the browser console error
- **Document too large**: Reduce image count or use smaller source photos (auto-compressed to ~200KB)
