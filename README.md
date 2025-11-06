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

**Frontend (Cloudflare Pages):**
```bash
cd frontend
npm run build
wrangler pages deploy dist --project-name=joinery-frontend-staging
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
```