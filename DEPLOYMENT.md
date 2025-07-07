# Tokay Gecko Morph Guide - Deployment Guide

## Pre-Deployment Checklist

✅ **Code Status**: All features implemented and tested
✅ **Links Fixed**: Normal and Patternless (BHG) morphs are now clickable and link to detail pages
✅ **Static Assets**: All images using external CDN (no local assets to transfer)
✅ **No Hardcoded URLs**: No localhost or environment-specific URLs found
✅ **Email Integration**: Image submission form configured for Brian@royalunionpets

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Production

```bash
npm run build
```

This creates:

- `dist/spa/` - Static client files for web hosting
- `dist/server/` - Server files (if needed for SSR)

### 3. Test Production Build

```bash
npm run start
```

## Deployment Options

### Option A: Static Hosting (Recommended)

The application is primarily a client-side React app and can be deployed as static files.

**Suitable for:**

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting provider

**Deploy the `dist/spa/` folder contents**

### Option B: Node.js Hosting

If you need server-side features, deploy both client and server.

**Suitable for:**

- VPS with Node.js
- Heroku
- AWS EC2
- DigitalOcean

**Deploy entire project and run `npm start`**

## Domain Configuration

### 1. DNS Setup

Point your domain to your hosting provider's servers:

- **A Record**: Point to hosting provider's IP
- **CNAME**: Point to hosting provider's domain (e.g., netlify.app)

### 2. HTTPS/SSL

Most hosting providers offer automatic SSL certificates. Ensure HTTPS is enabled.

### 3. Redirects (if needed)

Configure redirects for:

- `www` to non-www (or vice versa)
- Any old URLs to new structure

## Post-Deployment Verification

### Test All Routes:

- ✅ `/` - Homepage
- ✅ `/morphs` - Morph Guide (with clickable Normal and Patternless BHG)
- ✅ `/morphs/normal` - Normal morph detail page
- ✅ `/morphs/patternless-bhg` - Patternless BHG detail page
- ✅ `/morphs/[other-morphs]` - All other morph details
- ✅ `/gallery` - Photo gallery
- ✅ `/genetics` - Genetics calculator
- ✅ `/qa` - FAQ section
- ✅ `/breeders` - Breeder directory

### Test Features:

- ✅ Morph search and filtering
- ✅ Genetics calculator with updated breeding logic
- ✅ Image submission form
- ✅ Navigation and responsive design
- ✅ All morph detail pages load correctly

## Environment Variables

No environment variables are required for basic functionality.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design included

## Performance Notes

- Images are loaded from external CDN (Builder.io, Pexels)
- Lazy loading implemented where appropriate
- Optimized build with Vite

## Maintenance

- Update image URLs if CDN changes
- Monitor for broken external image links
- Regular content updates for new morphs can be added to the morph arrays

---

**Ready for Domain Transfer**: The website is production-ready and can be deployed to any hosting provider.
