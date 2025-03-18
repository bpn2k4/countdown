# countdown

A simple countdown clock build with html, css and javascript.

### 1. Build Docker image

```bash
docker build -t countdown .
```

### 2. Run Docker container

```bash
docker run --name countdown -dp 8080:80 -e TARGET_DATE="2025-03-19T00:00:00Z" countdown
```

### 3. Clean up

```bash
docker rm -f countdown
```