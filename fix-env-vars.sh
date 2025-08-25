#!/bin/bash

# Fix production environment variables for Vercel deployment

echo "Updating environment variables for production..."

# Remove existing environment variables
echo "Removing existing environment variables..."
vercel env rm NEXTAUTH_URL production --yes 2>/dev/null || true
vercel env rm NEXT_PUBLIC_SITE_URL production --yes 2>/dev/null || true

# Add correct production URLs
echo "Adding correct production environment variables..."

# NEXTAUTH_URL for production
echo "https://easewaymedicare.co.uk" | vercel env add NEXTAUTH_URL production

# NEXT_PUBLIC_SITE_URL for production  
echo "https://easewaymedicare.co.uk" | vercel env add NEXT_PUBLIC_SITE_URL production

echo "Environment variables updated successfully!"
echo "Please redeploy your application for changes to take effect."
