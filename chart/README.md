# SafeConvert Helm Chart

Deploys **SafeConvert** as a **single NGINX container** serving the static frontend.

## Prereqs

- Kubernetes cluster
- Helm v3 with OCI support
- An image that serves SafeConvert via nginx (default chart expects the repo image, which listens on **8080** inside the container)

## Quickstart (ClusterIP + port-forward)

```bash
helm install safeconvert ./chart

kubectl port-forward deploy/safeconvert 8080:8080
# open http://127.0.0.1:8080
```

## Configuration

### Image

- **`image.repository`**: container image repo (default `safeconvert/safeconvert`)
- **`image.tag`**: image tag (default: `Chart.appVersion`)
- **`image.pullPolicy`**: default `IfNotPresent`

### Ports

- **`containerPort`**: container listen port (**8080** for the SafeConvert nginx image)
- **`service.port`**: Service port exposed in-cluster (default **80**)

### Environment variables

Use **`env`** for the container.

Example (IPv4-only environments):

```yaml
env:
  - name: DISABLE_IPV6
    value: "true"
```

### Ingress (optional)

Enable the built-in Kubernetes Ingress:

```yaml
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: safeconvert.example.com
      paths:
        - path: /
          pathType: Prefix
```

### Gateway API: Gateway + HTTPRoute (optional)

This chart can optionally:

- Create a **Gateway** (`gateway.enabled=true`)
- Create an **HTTPRoute** (`httpRoute.enabled=true`) that points at the chart Service

If your cluster uses a shared Gateway created elsewhere, set `gateway.enabled=false` and point `httpRoute.parentRefs` to that Gateway.

Example (create both Gateway + HTTPRoute):

```yaml
gateway:
  enabled: true
  gatewayClassName: cloudflare # or nginx, istio, etc (controller-specific)
  listeners:
    - name: http
      protocol: HTTP
      port: 80

httpRoute:
  enabled: true
  hostnames:
    - safeconvert.example.com
  parentRefs:
    - name: "" # default: release fullname (or gateway.name if set)
      sectionName: http
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
```

## Publish this chart to GHCR (OCI) for testing/deploying

### Build And Push OCI

```bash
echo "$GHCR_TOKEN" | helm registry login ghcr.io -u "$GHCR_USERNAME" --password-stdin

cd chart
helm package .

# produces safeconvert-<version>.tgz
helm push safeconvert-*.tgz oci://ghcr.io/$GHCR_USERNAME/charts
```

This could be automated as part of a Github workflow.

### Deploy

```bash
helm upgrade --install safeconvert oci://ghcr.io/$GHCR_USERNAME/charts/safeconvert --version 0.1.0
```
