# GitHub Pages Deployment

!!! tip ""
    Deploying documentation and static sites through GitHub Pages combines version control, automation, and hosting in one elegant solution.

<div class="grid cards" markdown>

- :material-rocket: **Zero Configuration**
  Seamless deployment directly from GitHub repositories.

- :material-globe: **Always Available**
  HTTPS by default, global CDN, zero maintenance.

- :material-sync: **Automatic Updates**
  Changes automatically reflected when code is pushed.

</div>

---

## GitHub Pages Fundamentals

### What is GitHub Pages

GitHub Pages transforms repositories into hosted websites:

- **Static site hosting** for free
- **Automatic HTTPS** and SSL certificates
- **Custom domain** support
- **Automatic building** from source files
- **Version control** for all content

### Supported Site Types

- **Project sites**: Documentation for repositories
- **User/Organization sites**: Personal portfolios and blogs
- **Custom domain sites**: Professional websites
- **Generated sites**: Built from static generators

---

## Setting Up GitHub Pages

### Basic Setup

**Step 1**: Navigate to repository settings  
**Step 2**: Scroll to GitHub Pages section  
**Step 3**: Select source branch (main, gh-pages, or docs folder)  
**Step 4**: Choose a theme (optional)  
**Step 5**: Click Save  
**Step 6**: Wait for deployment  
**Step 7**: Access your site at `username.github.io/repo-name`

### Configuration Options

```yaml
# _config.yml for Jekyll-based sites
title: My Documentation
description: Professional documentation site
theme: jekyll-theme-slate
markdown: CommonMark
```

---

## MkDocs with GitHub Pages

### MkDocs Configuration

```yaml
site_name: Professional Portfolio
site_description: Complete documentation and portfolio

theme:
  name: material
  
docs_dir: docs
site_dir: site

nav:
  - Home: index.md
  - About: about.md
  - Projects: projects.md
```

### Building and Deploying

```bash
# Build static site
mkdocs build

# Result: site/ directory with HTML files
# Push to gh-pages branch or upload to hosting
```

---

## Deployment Methods

### Method 1: gh-pages Branch

Dedicated branch for generated static files:

```bash
# Build the site
mkdocs build

# Commit to gh-pages branch
mkdocs gh-deploy
```

**Advantages:**
- Simple setup
- Works with all site generators
- Easy to maintain

---

### Method 2: GitHub Actions

Automate build and deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      
      - run: pip install mkdocs-material
      
      - run: mkdocs build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

---

### Method 3: docs/ Folder

Publish from docs folder in main branch:

**Setup:**
1. Create docs folder in repository root
2. Add index.md and other markdown files
3. In GitHub settings, select "docs folder" as source
4. GitHub automatically builds and deploys

**Benefits:**
- Documentation lives with code
- Simple to understand
- No need for separate branch

---

## Advanced Deployment

### Custom Domains

```bash
# CNAME file in repository
myportfolio.com
```

### DNS Configuration

Point domain to GitHub Pages:

```
A Record:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

CNAME Record (for www):
  username.github.io
```

---

## Optimization

### Build Time

Strategies to speed up builds:

| Strategy | Benefit |
|---|---|
| Exclude unnecessary files | Fewer files to process |
| Use incremental builds | Rebuild only changes |
| Optimize images | Smaller file sizes |
| Lazy load content | Faster initial load |

### Site Performance

```
Optimization	Result
────────────────────────────
CSS minification	30% smaller
JavaScript minification	25% smaller
Image optimization	40% smaller
Caching headers	90% faster repeat visits
```

---

## Maintenance and Updates

### Regular Updates

- Update theme and dependencies
- Test locally before deploying
- Monitor site performance
- Fix broken links
- Update outdated content

### Monitoring

**Check deployment status:**
- GitHub Actions tab shows build logs
- Settings shows last deployment time
- Browse your site to verify changes

---

## SEO and Discovery

### Making Sites Discoverable

```html
<!-- robots.txt for search engines -->
User-agent: *
Allow: /

<!-- sitemap.xml for search engines -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-15</lastmod>
  </url>
</urlset>
```

### Meta Tags

```html
<meta name="description" content="Professional portfolio and documentation">
<meta name="keywords" content="developer, portfolio, documentation">
<meta property="og:title" content="Professional Portfolio">
<meta property="og:description" content="Complete documentation of professional work">
<meta property="og:image" content="preview-image.png">
```

---

## Common Challenges

| Challenge | Solution |
|---|---|
| Site not updating | Clear browser cache, check Actions status |
| Build errors | Check error logs in Actions tab |
| Styling broken | Ensure CSS paths are relative |
| Images not loading | Check image paths and permissions |
| Custom domain not working | Verify DNS and CNAME settings |

---

## Best Practices

### Content Organization

- Use clear folder structure
- Organize by topic or section
- Keep navigation flat and simple
- Include table of contents

### Documentation Quality

- Write clear, concise content
- Include code examples
- Add screenshots where helpful
- Keep content updated

### Technical Excellence

- Test changes locally
- Use version control properly
- Automate deployments
- Monitor performance

---

## Examples

### Project Documentation Site

```
repo/
├── README.md
├── docs/
│   ├── index.md
│   ├── getting-started.md
│   ├── api/
│   │   ├── overview.md
│   │   └── endpoints.md
│   └── guides/
│       └── tutorial.md
└── mkdocs.yml
```

### Personal Portfolio Site

```
username.github.io/
├── index.md
├── about.md
├── projects.md
├── blog/
│   ├── post-1.md
│   └── post-2.md
└── mkdocs.yml
```

---

## Advanced Features

### Search Integration

Enable full-text search in documentation:

```yaml
plugins:
  - search:
      lang: en
```

### Analytics

Track visitor behavior:

```yaml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
```

---

## Scaling GitHub Pages

### Performance at Scale

GitHub Pages handles enterprise traffic:

- Global CDN ensures fast delivery
- Built-in DDoS protection
- Unlimited bandwidth
- Automatic scaling

### Limitations

- 1GB site size limit
- 100GB monthly build time
- 10 builds per hour per repository
- For most use cases, these are not constraints

---

## Deployment Success

<div class="grid cards" markdown>

- :material-check: **Ease**
  One-click deployment with GitHub integration.

- :material-check: **Reliability**
  Enterprise-grade infrastructure.

- :material-check: **Speed**
  Global CDN for fast content delivery.

- :material-check: **Cost**
  Free hosting for projects and portfolios.

</div>

!!! success ""
    GitHub Pages democratizes web publishing. Every developer should leverage this powerful, free service to showcase their work and share knowledge.
