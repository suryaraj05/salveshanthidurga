# Admin Credentials Setup Guide

## Creating Your Admin Account

The admin panel uses **Firebase Authentication** with email/password. There is no hardcoded password in the app.

### Step 1: Create Admin User in Firebase

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication → Users**
4. Click **Add user**
5. Enter your admin email (e.g. `you@university.edu`)
6. Set a strong password (12+ characters recommended)
7. Click **Add user**

### Step 2: Store Credentials Securely

- Use a password manager
- Never commit credentials to git
- The `.env` file only stores the Firebase project config, not your password

### Step 3: Optional — Admin Email in Environment

Set `VITE_ADMIN_EMAIL` in `.env` for reference (used for documentation only):

```env
VITE_ADMIN_EMAIL=you@university.edu
```

### Step 4: Login

1. Start the app: `npm run dev`
2. Navigate to `/admin/login`
3. Enter your Firebase admin email and password

## Security Best Practices

1. **One admin account** — Create only the account you need
2. **Strong password** — Mix letters, numbers, and symbols
3. **Firestore rules** — Only authenticated users can write (see `firestore.rules`)
4. **Image size** — Images are stored as base64 in Firestore; keep at most 4 per activity
5. **HTTPS** — Always deploy to HTTPS (Vercel provides this automatically)

## Resetting Password

1. Firebase Console → **Authentication → Users**
2. Click the admin user → **Reset password** (sends email)
3. Or delete and recreate the user

## Multiple Admins

To add another admin, create another user in Firebase Authentication. Any authenticated user can manage content per current security rules.

To restrict to specific emails, update `firestore.rules`:

```
function isAdmin() {
  return request.auth != null
    && request.auth.token.email in ['admin1@email.com', 'admin2@email.com'];
}
```
