# Photo Upload API Documentation

## Overview
This is a standalone API server for photo upload and download functionality. The API accepts image files and returns direct download links.

## Base URL
```
http://localhost:3001
```

## Endpoints

### 1. Health Check
**GET** `/health`

Check if the API server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Photo Upload API Server is running"
}
```

### 2. Upload Photo
**POST** `/upload`

Upload an image file and get a download link.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `photo` field containing the image file

**Supported file types:**
- PNG
- JPG/JPEG
- GIF
- WebP

**File size limit:** 10MB

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "unique-file-id",
    "filename": "generated-filename.png",
    "originalName": "original-filename.png",
    "size": 1024000,
    "downloadUrl": "http://localhost:3001/download/generated-filename.png",
    "uploadedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

### 3. Download Photo
**GET** `/download/:filename`

Download an uploaded image file.

**Parameters:**
- `filename`: The filename returned from the upload endpoint

**Response:**
- Content-Type: Appropriate image MIME type
- Content-Disposition: Attachment with original filename
- Body: Binary image data

## Postman Testing

### Setup
1. Start the API server:
   ```bash
   cd /path/to/project
   npm install express multer cors uuid
   node api-server.js
   ```

2. The server will run on `http://localhost:3001`

### Test Cases

#### 1. Health Check
- **Method:** GET
- **URL:** `http://localhost:3001/health`
- **Expected:** 200 OK with status message

#### 2. Upload Image
- **Method:** POST
- **URL:** `http://localhost:3001/upload`
- **Body:** form-data
- **Key:** `photo` (file)
- **Value:** Select an image file (PNG, JPG, etc.)
- **Expected:** 200 OK with upload data including downloadUrl

#### 3. Download Image
- **Method:** GET
- **URL:** `http://localhost:3001/download/{filename}`
- **Replace `{filename}` with the filename from upload response**
- **Expected:** 200 OK with image file download

### Postman Collection JSON
```json
{
  "info": {
    "name": "Photo Upload API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3001/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["health"]
        }
      }
    },
    {
      "name": "Upload Photo",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "photo",
              "type": "file",
              "src": []
            }
          ]
        },
        "url": {
          "raw": "http://localhost:3001/upload",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["upload"]
        }
      }
    },
    {
      "name": "Download Photo",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3001/download/{{filename}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["download", "{{filename}}"]
        }
      }
    }
  ]
}
```

## Error Codes

- **400 Bad Request:** Invalid file type, no file provided, file too large
- **404 Not Found:** File not found for download
- **500 Internal Server Error:** Server error during processing

## Notes

- Files are stored in the `uploads/` directory
- Each upload gets a unique filename to prevent conflicts
- The API supports CORS for cross-origin requests
- File size is limited to 10MB
- Only image files are accepted
