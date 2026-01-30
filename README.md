# Joinery

Joinery is a platform that connects users to every step of the woodworking journey, from finding inspiration to sourcing materials and tools, to sharing finished projects with the community.

Our mission is to empower woodworkers of all skill levels by providing a comprehensive resource hub that fosters creativity, learning, and collaboration.

## Deployment

### Staging Environment

**Backend:** https://joinery-api-test.fly.dev  
**Frontend:** https://joinery-frontend-staging.pages.dev/

### Quick Deploy

**Backend (Fly.io):**
```bash
cd api
fly deploy
```

**Frontend (Cloudflare Pages):**Ï
```bash
cd frontend
npm run build
wrangler pages deploy dist --project-name=joinery-frontend-staging

OR build bash script (cloudflare needs access to env vars)

bash build-and-deploy.sh
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
```