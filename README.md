# Google OAuth Example with Next.js

A demonstration of OAuth 2.0 authentication with Google using Next.js 15, TypeScript, and NextAuth.js v5.

## Features

- ✅ Google OAuth 2.0 authentication
- ✅ NextAuth.js v5 integration
- ✅ Session management with JWT
- ✅ Protected routes
- ✅ TypeScript support
- ✅ Modern Next.js App Router
- ✅ Tailwind CSS styling
- ✅ Complete API documentation (OpenAPI)

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Authentication:** NextAuth.js v5 (beta.29)
- **Styling:** Tailwind CSS
- **OAuth Provider:** Google OAuth 2.0

## Project Structure

```
example-oauth-google/
├── app/
│   ├── api/auth/[...nextauth]/   # NextAuth API routes
│   ├── profile/                   # Protected profile page
│   ├── page.tsx                   # Home page
│   └── layout.tsx                 # Root layout
├── components/
│   ├── LoginButton.tsx            # Google sign-in button
│   ├── LogoutButton.tsx           # Sign-out button
│   └── UserProfile.tsx            # User profile display
├── lib/
│   └── auth.ts                    # NextAuth legacy config
├── types/
│   └── next-auth.d.ts             # TypeScript type extensions
├── docs/
│   └── openapi.yaml               # API documentation
├── ai-process/                    # Implementation documentation
├── auth.ts                        # NextAuth v5 configuration
└── .env.local                     # Environment variables
```

## Prerequisites

- Node.js 18+ installed
- Google Cloud Console account
- Basic knowledge of OAuth 2.0

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"

### 2. Configure OAuth Consent Screen

1. Click "OAuth consent screen" in the sidebar
2. Select "External" user type
3. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
4. Add scopes (optional for basic profile):
   - `userinfo.email`
   - `userinfo.profile`
5. Add test users if using "Testing" mode
6. Save and continue

### 3. Create OAuth 2.0 Client ID

1. Go to "Credentials" tab
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Configure:
   - **Name:** Your app name
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. Click "Create"
6. Copy your **Client ID** and **Client Secret**

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository (or download the project)
cd example-oauth-google

# Install dependencies
npm install
```

### 2. Configure Environment Variables

The `.env.local` file already exists. Update it with your Google OAuth credentials:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Sign In

1. Click the "Sign in with Google" button on the home page
2. You'll be redirected to Google's OAuth consent screen
3. Sign in with your Google account
4. Grant permissions to the application
5. You'll be redirected back to the home page, now authenticated

### View Profile

1. After signing in, click "View Profile"
2. The profile page displays:
   - User avatar
   - User name
   - Email address
   - Session details (JSON)

### Sign Out

1. Click the "Sign Out" button on the profile page
2. Your session will be cleared
3. You'll be redirected to the home page

## API Endpoints

All authentication endpoints are handled by NextAuth.js:

- `GET /api/auth/signin/google` - Initiate Google OAuth sign-in
- `GET /api/auth/callback/google` - OAuth callback handler
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token
- `GET /api/auth/providers` - List available providers

### Testing API Endpoints

You can test the endpoints using curl:

```bash
# Get available providers
curl http://localhost:3000/api/auth/providers

# Get CSRF token
curl http://localhost:3000/api/auth/csrf

# Get current session (returns null if not authenticated)
curl http://localhost:3000/api/auth/session
```

## OpenAPI Documentation

Import the OpenAPI specification into Postman or any API client:

1. Open Postman
2. Click "Import"
3. Select `docs/openapi.yaml`
4. All endpoints will be available for testing

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Documentation

### Production Documentation

- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Complete deployment guide for production
  - Pre-deployment checklist
  - Platform-specific guides (Vercel, Railway, VPS)
  - Post-deployment verification
  - Monitoring and maintenance

- **[SECURITY.md](docs/SECURITY.md)** - Security documentation
  - Security features and threat model
  - Best practices and incident response
  - GDPR compliance considerations

- **[openapi.yaml](docs/openapi.yaml)** - API specification
  - OpenAPI 3.0.3 format
  - Ready for Postman import

### Implementation Documentation

Detailed implementation documentation is available in the `ai-process/` directory:

- [requirement.md](ai-process/requirement.md) - Project requirements
- [plan.md](ai-process/plan.md) - Implementation plan
- [task.md](ai-process/task.md) - Task breakdown
- [prompt.md](ai-process/prompt.md) - Implementation log
- [oauth-flow.puml](ai-process/oauth-flow.puml) - OAuth flow diagram

## Troubleshooting

### OAuth Callback Error

**Problem:** "Redirect URI mismatch" error

**Solution:**
- Verify the redirect URI in Google Console matches exactly:
  - `http://localhost:3000/api/auth/callback/google` (development)
- Check for trailing slashes or protocol mismatches (http vs https)

### Environment Variables Not Loading

**Problem:** Application can't read environment variables

**Solution:**
- Ensure `.env.local` is in the project root
- Restart the development server after changing `.env.local`
- Verify variable names match exactly (case-sensitive)

### NextAuth Session Not Persisting

**Problem:** User gets logged out on page refresh

**Solution:**
- Check that `NEXTAUTH_SECRET` is set in `.env.local`
- Verify cookies are enabled in your browser
- Clear browser cookies and try again

### Build Errors

**Problem:** TypeScript or build errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### "Invalid credentials" Error

**Problem:** Google returns invalid credentials error

**Solution:**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Ensure no extra spaces or quotes in `.env.local`
- Regenerate credentials in Google Console if needed

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

Then update `NEXTAUTH_URL` to match the new port.

## Security Considerations

### Development

- ✅ `.env.local` is excluded from git (in `.gitignore`)
- ✅ CSRF protection enabled via NextAuth.js
- ✅ HTTP-only session cookies
- ✅ Secrets stored in environment variables

### Production

For production deployment, ensure:

1. **HTTPS Only:** Always use HTTPS in production
2. **Secure Environment Variables:** Use platform environment variables (Vercel, Railway, etc.)
3. **Update Redirect URIs:** Add production URLs to Google Console
4. **Generate New Secret:** Create a production-specific `NEXTAUTH_SECRET`
5. **Review Consent Screen:** Verify OAuth consent screen is production-ready

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL)
5. Deploy

### Update Google Console

After deployment, add your production URLs to Google Console:

- **Authorized JavaScript origins:** `https://yourdomain.com`
- **Authorized redirect URIs:** `https://yourdomain.com/api/auth/callback/google`

## Architecture Decisions

### Why NextAuth.js v5?

- Latest version with improved App Router support
- Better TypeScript integration
- Simplified API and configuration
- Active development and community support

### Why JWT Sessions?

- Stateless authentication (no database required)
- Faster performance
- Suitable for demonstration and small applications
- Easy to scale horizontally

### Why Server Components?

- Better performance (less JavaScript sent to client)
- Improved SEO
- Reduced client-side bundle size
- Only interactive components use client-side rendering

## License

This is a demonstration project for educational purposes.

## Contributing

This is an example project. Feel free to fork and modify for your own use.

## Support

For issues with:
- **Next.js:** See [Next.js Documentation](https://nextjs.org/docs)
- **NextAuth.js:** See [NextAuth.js Documentation](https://authjs.dev)
- **Google OAuth:** See [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

---

**Built with ❤️ using Next.js 15 and NextAuth.js v5**
