# Production Deployment Checklist

This document provides a comprehensive checklist for deploying the Google OAuth application to production.

## Pre-Deployment Security Review

### Environment Variables ✅
- [x] `.env.local` is in `.gitignore`
- [x] No secrets hardcoded in source code
- [x] All secrets use `process.env.*`
- [ ] Production `NEXTAUTH_SECRET` generated (different from dev)
- [ ] Production credentials obtained from Google Console

### Code Security ✅
- [x] CSRF protection enabled (NextAuth.js)
- [x] HTTP-only cookies for sessions
- [x] No console.logs with sensitive data
- [x] Error messages don't expose internal details
- [ ] HTTPS enforced in production

### Dependencies ✅
- [x] No known vulnerabilities (`npm audit`)
- [x] All dependencies up to date
- [x] Production dependencies only

---

## Production Environment Variables

Create these environment variables in your hosting platform (Vercel, Railway, etc.):

### Required Variables

```bash
# Google OAuth Credentials (Production)
GOOGLE_CLIENT_ID=your-production-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-production-client-secret

# NextAuth Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-here
```

### Generate Production Secret

```bash
# Generate a new secret for production (do NOT reuse development secret)
openssl rand -base64 32
```

### Important Notes

- **Never reuse development secrets in production**
- **Store secrets securely** in your hosting platform's environment variable system
- **Do not commit** production credentials to git
- **Rotate secrets regularly** (recommended: every 90 days)

---

## Google Cloud Console Configuration

### 1. Create Production OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Create a **new** OAuth 2.0 Client ID for production (separate from dev)
4. Configure:

**Authorized JavaScript origins:**
```
https://yourdomain.com
```

**Authorized redirect URIs:**
```
https://yourdomain.com/api/auth/callback/google
```

### 2. Update OAuth Consent Screen

- [ ] Review app name and branding
- [ ] Update privacy policy URL (if required)
- [ ] Update terms of service URL (if required)
- [ ] Submit for verification (if publishing publicly)

### 3. Scopes Review

Ensure only necessary scopes are requested:
- ✅ `userinfo.email`
- ✅ `userinfo.profile`
- ❌ Remove any unused scopes

---

## Deployment Platforms

### Option 1: Vercel (Recommended)

#### Prerequisites
- [ ] Code pushed to GitHub repository
- [ ] Vercel account created

#### Steps

1. **Import Project**
   ```
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   ```

2. **Configure Environment Variables**
   ```
   - Go to Project Settings > Environment Variables
   - Add all 4 required variables (see above)
   - Set for "Production" environment
   ```

3. **Deploy**
   ```
   - Click "Deploy"
   - Wait for build to complete
   - Note your production URL
   ```

4. **Update Google Console**
   ```
   - Add production URL to authorized origins
   - Add callback URL to authorized redirect URIs
   ```

5. **Test**
   ```
   - Visit your production URL
   - Test OAuth flow
   - Verify session persistence
   ```

#### Vercel-Specific Settings

```bash
# Optional: Vercel automatically sets these
# VERCEL_URL - Automatically provided
# NODE_ENV=production - Automatically set
```

---

### Option 2: Railway

#### Prerequisites
- [ ] Code pushed to GitHub repository
- [ ] Railway account created

#### Steps

1. **Create New Project**
   ```
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   ```

2. **Configure Environment Variables**
   ```
   - Go to project > Variables
   - Add all 4 required variables
   ```

3. **Configure Build**
   ```
   Build Command: npm run build
   Start Command: npm start
   ```

4. **Deploy & Configure Domain**
   ```
   - Deploy the project
   - Generate domain or add custom domain
   - Update NEXTAUTH_URL with your domain
   ```

5. **Update Google Console**
   ```
   - Add Railway domain to authorized origins
   - Add callback URL to authorized redirect URIs
   ```

---

### Option 3: Self-Hosted (VPS)

#### Prerequisites
- [ ] VPS with Node.js 18+ installed
- [ ] Nginx or similar reverse proxy
- [ ] SSL certificate (Let's Encrypt recommended)

#### Steps

1. **Install Dependencies**
   ```bash
   npm install --production
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Configure Environment Variables**
   ```bash
   # Create .env.production.local
   nano .env.production.local
   # Add all required variables
   ```

4. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "oauth-app" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

6. **Test & Monitor**
   ```bash
   pm2 logs oauth-app
   pm2 monit
   ```

---

## Post-Deployment Verification

### Functional Testing
- [ ] Home page loads correctly
- [ ] "Sign in with Google" button works
- [ ] OAuth redirect to Google succeeds
- [ ] Callback returns to app successfully
- [ ] User profile displays correctly
- [ ] Session persists across page refreshes
- [ ] Logout clears session
- [ ] Protected routes redirect unauthenticated users

### Security Testing
- [ ] HTTPS is enforced (no HTTP access)
- [ ] Session cookies are HttpOnly
- [ ] Session cookies are Secure
- [ ] CSRF tokens are validated
- [ ] No secrets exposed in client-side code
- [ ] No sensitive data in error messages

### Performance Testing
- [ ] Page load times acceptable (<3s)
- [ ] OAuth flow completes quickly (<5s)
- [ ] No console errors in browser
- [ ] No memory leaks

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Monitoring & Maintenance

### Setup Monitoring

1. **Error Tracking**
   - Consider: Sentry, LogRocket, or similar
   - Track OAuth failures
   - Monitor session errors

2. **Analytics** (Optional)
   - Google Analytics
   - Vercel Analytics
   - Track sign-in success rate

3. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - Check every 5 minutes

### Regular Maintenance

- [ ] **Weekly:** Review error logs
- [ ] **Monthly:** Check for dependency updates
- [ ] **Quarterly:** Rotate NEXTAUTH_SECRET
- [ ] **Annually:** Review Google OAuth consent screen

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Rebuild and redeploy
npm run build
```

---

## Rollback Plan

If deployment fails or issues arise:

1. **Immediate Rollback**
   - Vercel: Revert to previous deployment in dashboard
   - Railway: Redeploy previous version
   - Self-hosted: `pm2 restart oauth-app --update-env`

2. **Identify Issue**
   - Check error logs
   - Verify environment variables
   - Test OAuth credentials

3. **Fix & Redeploy**
   - Fix issue in development
   - Test thoroughly
   - Redeploy to production

---

## Troubleshooting Production Issues

### OAuth Redirect URI Mismatch

**Error:** "Error 400: redirect_uri_mismatch"

**Solution:**
1. Check `NEXTAUTH_URL` matches exactly (including https://)
2. Verify Google Console has correct redirect URI
3. Ensure no trailing slashes
4. Clear browser cache and retry

### Session Not Persisting

**Error:** User logged out on page refresh

**Solution:**
1. Verify `NEXTAUTH_SECRET` is set
2. Check cookies are enabled
3. Ensure HTTPS is working
4. Verify cookie domain settings

### "Invalid Client" Error

**Error:** Google returns invalid client error

**Solution:**
1. Verify `GOOGLE_CLIENT_ID` is correct
2. Check credentials are for production (not development)
3. Ensure OAuth consent screen is published
4. Verify API is enabled in Google Console

---

## Success Criteria

Your deployment is successful when:

- ✅ Application is accessible via HTTPS
- ✅ OAuth flow completes without errors
- ✅ User can sign in and sign out
- ✅ Sessions persist correctly
- ✅ No security warnings in browser
- ✅ No console errors
- ✅ Performance is acceptable
- ✅ Monitoring is in place

---

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [NextAuth.js Deployment Guide](https://authjs.dev/getting-started/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

---

**Last Updated:** Phase 7 - Deployment Preparation
**Status:** Ready for Production Deployment
