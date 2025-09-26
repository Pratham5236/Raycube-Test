'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Download, Upload, Users, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
                <p className="text-gray-600">Complete API reference for Pizza Hut Community App</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">API Overview</CardTitle>
            <CardDescription>
              The Pizza Hut Community App provides a comprehensive API for user registration, 
              photo uploads, and administrative functions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-sm text-gray-600">Register users and manage data</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Upload className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Photo Upload</h3>
                <p className="text-sm text-gray-600">Upload and share images</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
                <p className="text-sm text-gray-600">Generate CSV reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="space-y-8">
          {/* User Registration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">User Registration</CardTitle>
                  <CardDescription>Register new users in the system</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700">POST</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Endpoint</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">POST /api/register</code>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "registeredAt": "2024-01-01T12:00:00.000Z"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Photo Upload</CardTitle>
                  <CardDescription>Upload images and generate QR codes</CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-700">POST</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Endpoint</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">POST /api/upload</code>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
                <p className="text-sm text-gray-600 mb-2">Content-Type: multipart/form-data</p>
                <p className="text-sm text-gray-600">Body: Form data with 'file' field containing the image</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "id": "file-uuid",
  "downloadUrl": "/api/download/filename.jpg",
  "filename": "generated-filename.jpg"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Get Users */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Get All Users</CardTitle>
                  <CardDescription>Retrieve all registered users</CardDescription>
                </div>
                <Badge className="bg-gray-100 text-gray-700">GET</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Endpoint</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">GET /api/users</code>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "registeredAt": "2024-01-01T12:00:00.000Z"
  }
]`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* CSV Report */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">CSV Report</CardTitle>
                  <CardDescription>Download user data as CSV file</CardDescription>
                </div>
                <Badge className="bg-gray-100 text-gray-700">GET</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Endpoint</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">GET /api/report</code>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <p className="text-sm text-gray-600">Returns a CSV file with all user data</p>
                <p className="text-sm text-gray-600">Content-Type: text/csv</p>
                <p className="text-sm text-gray-600">Content-Disposition: attachment; filename="pizza-hut-registrations.csv"</p>
              </div>
            </CardContent>
          </Card>

          {/* Download Photo */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Download Photo</CardTitle>
                  <CardDescription>Download uploaded images</CardDescription>
                </div>
                <Badge className="bg-gray-100 text-gray-700">GET</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Endpoint</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">GET /api/download/:filename</code>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <p className="text-sm text-gray-600">Returns the image file</p>
                <p className="text-sm text-gray-600">Content-Type: image/jpeg, image/png, etc.</p>
                <p className="text-sm text-gray-600">Content-Disposition: attachment; filename="original-name.jpg"</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Codes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Error Codes</CardTitle>
            <CardDescription>Common HTTP status codes and their meanings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">400 Bad Request</p>
                  <p className="text-sm text-gray-600">Invalid request data or missing fields</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-semibold text-gray-900">404 Not Found</p>
                  <p className="text-sm text-gray-600">Resource not found</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">500 Internal Server Error</p>
                  <p className="text-sm text-gray-600">Server error during processing</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">200 OK</p>
                  <p className="text-sm text-gray-600">Request successful</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Testing the API</CardTitle>
            <CardDescription>How to test the API endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Using Postman</h4>
              <p className="text-sm text-gray-600 mb-2">Import the provided Postman collection to test all endpoints</p>
              <Button asChild variant="outline" size="sm">
                <a href="/API_DOCUMENTATION.md" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download Postman Collection
                </a>
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
              <code className="bg-gray-100 px-3 py-1 rounded text-sm">http://localhost:3000</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
