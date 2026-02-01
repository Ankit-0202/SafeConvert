# Self-Hosting Guide

SafeConvert can be self-hosted on your own infrastructure. This guide covers various deployment options.

## Quick Start with Docker / Podman

The fastest way to self-host SafeConvert:

```bash
# Docker
docker run -d -p 3000:8080 ghcr.io/alam00000/safeconvert:latest

# Podman
podman run -d -p 3000:8080 ghcr.io/alam00000/safeconvert:latest
```

Or with Docker Compose / Podman Compose:

```yaml
# docker-compose.yml
services:
  safeconvert:
    image: ghcr.io/alam00000/safeconvert:latest
    ports:
      - "3000:8080"
    restart: unless-stopped
```

```bash
# Docker Compose
docker compose up -d

# Podman Compose
podman-compose up -d
```

## Podman Quadlet (Linux Systemd)

Run SafeConvert as a systemd service. Create `~/.config/containers/systemd/safeconvert.container`:

```ini
[Container]
Image=ghcr.io/alam00000/safeconvert:latest
ContainerName=safeconvert
PublishPort=3000:8080
AutoUpdate=registry

[Service]
Restart=always

[Install]
WantedBy=default.target
```

```bash
systemctl --user daemon-reload
systemctl --user enable --now safeconvert
```

See [Docker deployment guide](/self-hosting/docker) for full Quadlet documentation.

## Building from Source

```bash
# Clone and build
git clone https://github.com/alam00000/safeconvert.git
cd safeconvert
npm install
npm run build

# The built files are in the `dist` folder
```

## Configuration Options

### Simple Mode

Simple Mode is designed for internal organizational use where you want to hide all branding and marketing content, showing only the essential PDF tools.

**What Simple Mode hides:**

- Navigation bar
- Hero section with marketing content
- Features, FAQ, testimonials sections
- Footer
- Updates page title to "PDF Tools"

```bash
# Build with Simple Mode
SIMPLE_MODE=true npm run build

# Or use the pre-built Docker image
docker run -p 3000:8080 safeconvertteam/safeconvert-simple:latest
```

See [SIMPLE_MODE.md](https://github.com/alam00000/safeconvert/blob/main/SIMPLE_MODE.md) for full details.

### Base URL

Deploy to a subdirectory:

```bash
BASE_URL=/pdf-tools/ npm run build
```

## Deployment Guides

Choose your platform:

- [Vercel](/self-hosting/vercel)
- [Netlify](/self-hosting/netlify)
- [Cloudflare Pages](/self-hosting/cloudflare)
- [AWS S3 + CloudFront](/self-hosting/aws)
- [Hostinger](/self-hosting/hostinger)
- [Nginx](/self-hosting/nginx)
- [Apache](/self-hosting/apache)
- [Docker](/self-hosting/docker)
- [Kubernetes](/self-hosting/kubernetes)
- [CORS Proxy](/self-hosting/cors-proxy) - Required for digital signatures

## Configuring Optional WASM Components

SafeConvert does not bundle some large processing modules. Some advanced features require you to configure WASM modules separately.

::: warning Optional Components Not Included
The following WASM modules are not bundled and must be configured by users who want to use features powered by these libraries:

| Component       | Features                                                         |
| --------------- | ---------------------------------------------------------------- |
| **PyMuPDF**     | EPUB/MOBI/FB2/XPS conversion, image extraction, table extraction |
| **Ghostscript** | PDF/A conversion, compression, deskewing, rasterization          |
| **CoherentPDF** | Table of contents, attachments, PDF merge with bookmarks         |

:::

### How to Configure WASM Sources

1. Navigate to **Advanced Settings** in the SafeConvert interface
2. Enter the URLs for the WASM modules you want to use
3. You can use:
   - Your own hosted WASM files
   - A [WASM proxy](/self-hosting/cors-proxy) you deploy (handles CORS)
   - Any compatible CDN hosting these packages

### Hosting Your Own WASM Proxy

If you need to serve WASM files with proper CORS headers, you can deploy a simple proxy. See the [Cloudflare WASM Proxy guide](https://github.com/alam00000/safeconvert/blob/main/cloudflare/WASM-PROXY.md) for an example implementation.

## System Requirements

| Requirement | Minimum                                 |
| ----------- | --------------------------------------- |
| Storage     | ~100 MB (core without optional modules) |
| RAM         | 512 MB                                  |
| CPU         | Any modern processor                    |

::: tip
SafeConvert is a static site—there's no database or backend server required!
:::
