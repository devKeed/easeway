# GitHub OAuth Authentication Setup

This project now includes GitHub OAuth authentication using NextAuth.js with role-based access control.

## Features Implemented

### 1. Authentication System

- **GitHub OAuth Provider**: Users can sign in with their GitHub accounts
- **Role-based Access Control**: Users can be either `client` or `admin`
- **Persistent Sessions**: Using database sessions with Prisma
- **Protected Routes**: Middleware protection for admin and API routes

### 2. Database Schema

- **Users**: Store user information and roles
- **Sessions/Accounts**: NextAuth.js session management
- **Bookings**: Store appointment bookings linked to users

### 3. API Routes

- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/user/me` - Get current user session and role (protected)
- `/api/admin/bookings` - Admin-only route to view all bookings
- `/api/bookings` - Create and view user's own bookings (protected)

### 4. Pages

- `/auth/signin` - Custom sign-in page
- `/auth/error` - Authentication error page
- `/admin` - Admin dashboard (admin-only)
- `/booking` - Enhanced booking page

## Setup Instructions

### 1. GitHub OAuth Application

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - **Application name**: Easeway Medicare Physiotherapy
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret

### 2. Environment Variables

Update your `.env.local` file with:

```bash
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-here-generate-a-secure-one"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Generate a Secure Secret

Run this command to generate a secure NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### 4. Admin Users

To make a user an admin, update the `adminEmails` array in `lib/auth.ts`:

```typescript
const adminEmails = [
  "your-admin-email@example.com",
  "another-admin@example.com",
  // Add more admin emails here
];
```

### 5. Database Setup

The database is already set up with:

```bash
npx prisma generate
npx prisma db push
```

## User Roles

### Client Role

- Can sign in and create bookings
- Can view their own bookings
- Access to booking page

### Admin Role

- All client permissions
- Access to admin dashboard
- Can view all bookings
- Access to admin-only API routes

## Authentication Flow

1. User clicks "Sign In" in header
2. Redirected to `/auth/signin`
3. Clicks "Sign in with GitHub"
4. GitHub OAuth flow
5. User account created/updated with role
6. Redirected back to homepage
7. Header shows user info and role

## Protected Routes

### Middleware Protection

The middleware protects:

- `/admin/*` - Requires admin role
- `/api/admin/*` - Requires admin role
- `/api/user/*` - Requires authentication

### Custom Hook

Use the `useAuth` hook in components:

```typescript
import { useAuth } from "../hooks/useAuth";

const MyComponent = () => {
  const { user, isAuthenticated, isAdmin, isClient } = useAuth();

  if (isAdmin) {
    // Show admin content
  }

  if (isAuthenticated) {
    // Show authenticated content
  }
};
```

## Database Models

### User

- `id`: Unique identifier
- `name`: User's display name
- `email`: Email address
- `image`: Profile image URL
- `role`: 'client' or 'admin'

### Booking

- `id`: Unique identifier
- `userId`: Links to user
- `name`, `email`, `phone`: Contact info
- `service`: Selected service
- `date`, `time`: Appointment details
- `message`: User's message
- Medical fields for comprehensive booking
- `status`: 'pending', 'confirmed', 'cancelled', 'completed'

## Testing

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Test authentication:

   - Click "Sign In" in header
   - Sign in with GitHub
   - Check user role in header

3. Test admin access (if you're an admin):

   - Visit `/admin` to see dashboard
   - View all bookings

4. Test API routes:
   - `/api/user/me` - Your user info
   - `/api/admin/bookings` - All bookings (admin only)

## Security Features

- **CSRF Protection**: Built into NextAuth.js
- **Secure Cookies**: HTTPOnly, Secure flags
- **Role Validation**: Server-side role checking
- **Input Validation**: API route validation
- **Environment Variables**: Secure credential storage

## Production Deployment

For production:

1. Update `NEXTAUTH_URL` to your domain
2. Use a production database (PostgreSQL recommended)
3. Generate a new secure `NEXTAUTH_SECRET`
4. Update GitHub OAuth app URLs
5. Set environment variables in your hosting platform
