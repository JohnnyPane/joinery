## Deployment

### Staging Environment

**Backend:** https://joinery-api-test.fly.dev  
**Frontend:** https://bdf48e3f.joinery-frontend-staging.pages.dev

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