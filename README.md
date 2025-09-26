# Pizza Hut Community App

A comprehensive Next.js application featuring user registration, photo upload with QR code generation, and a standalone API server.

## Features

### Task 1: Landing Page & Registration
- ✅ Beautiful fullscreen landing page with Pizza Hut branding
- ✅ User registration form (name, email, phone)
- ✅ Video display after registration with download button
- ✅ Database storage for user data
- ✅ CSV report generation for all registered users

### Task 2: Upload Photo Page
- ✅ Photo upload page with file explorer integration
- ✅ Support for PNG, JPG, JPEG, GIF, WebP files
- ✅ QR code generation for direct download links
- ✅ Mobile-friendly QR code scanning

### Task 3: Upload Photo API
- ✅ Standalone API server for photo upload/download
- ✅ Complete API documentation for Postman testing
- ✅ File validation and error handling

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS with custom components
- **Database:** SQLite3
- **File Handling:** Multer, Node.js fs
- **QR Code:** qrcode library
- **UI Components:** Radix UI with custom styling

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd raycube
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Start the development server:**
   ```bash
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Server (Task 3)

### Setup Standalone API Server

1. **Install API server dependencies:**
   ```bash
   npm install express multer cors uuid
   ```

2. **Start the API server:**
   ```bash
   node api-server.js
   ```

3. **API Server runs on:** [http://localhost:3001](http://localhost:3001)

### API Endpoints

- **Health Check:** `GET /health`
- **Upload Photo:** `POST /upload` (multipart/form-data)
- **Download Photo:** `GET /download/:filename`

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete documentation.

## Project Structure

```
raycube/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── register/route.ts      # User registration API
│   │   │   ├── upload/route.ts        # Photo upload API
│   │   │   ├── download/[filename]/   # Photo download API
│   │   │   └── report/route.ts        # CSV report API
│   │   ├── upload/page.tsx           # Photo upload page
│   │   ├── layout.tsx                 # App layout
│   │   └── page.tsx                   # Landing page
│   ├── components/ui/                 # Reusable UI components
│   └── lib/
│       ├── database.ts               # Database utilities
│       └── utils.ts                  # Helper functions
├── api-server.js                     # Standalone API server
├── api-server-package.json           # API server dependencies
└── API_DOCUMENTATION.md              # API documentation
```

## Usage

### Landing Page
1. Visit the homepage
2. Fill out the registration form
3. After registration, watch the exclusive Pizza Hut video
4. Download the video or navigate to photo upload

### Photo Upload
1. Navigate to `/upload`
2. Click to select an image file
3. Upload the image
4. Scan the generated QR code to download on mobile

### CSV Report
1. Visit `/api/report` to download all user registrations as CSV

### API Testing
1. Start the standalone API server
2. Use Postman with the provided collection
3. Test upload and download endpoints

## Database

The application uses SQLite3 for data persistence:
- **Users table:** Stores registration data
- **Photo_uploads table:** Stores uploaded file information

Database file: `database.sqlite` (created automatically)

## File Storage

- **Web App:** Files stored in `public/uploads/`
- **API Server:** Files stored in `uploads/`

## Development

### Available Scripts

```bash
# Development server
bun dev

# Build for production
bun build

# Start production server
bun start

# API server
node api-server.js
```

### Code Quality

- TypeScript for type safety
- Consistent code formatting
- Reusable components
- Error handling throughout
- Responsive design

## Deployment

### Web Application
Deploy to Vercel, Netlify, or any Next.js-compatible platform.

### API Server
Deploy to any Node.js hosting service (Railway, Heroku, etc.).

## Testing

### Postman Collection
Import the provided Postman collection to test the API endpoints.

### Manual Testing
1. Test registration flow
2. Test photo upload with QR code
3. Test CSV report generation
4. Test API server endpoints

## Support

For issues or questions, please check the documentation or create an issue in the repository.
