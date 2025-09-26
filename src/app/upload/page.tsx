'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, QrCode, Download, ArrowLeft, Image as ImageIcon, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from 'qrcode';

interface UploadResult {
  id: string;
  downloadUrl: string;
  qrCodeDataUrl: string;
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, JPEG, GIF, WebP)');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        
        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(result.downloadUrl);
        
        setUploadResult({
          id: result.id,
          downloadUrl: result.downloadUrl,
          qrCodeDataUrl
        });
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  if (uploadResult) {
    return <UploadSuccess result={uploadResult} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <UploadSection 
        selectedFile={selectedFile}
        isUploading={isUploading}
        onFileSelect={handleFileSelect}
        onFileInputClick={handleFileInputClick}
        onUpload={handleUpload}
        fileInputRef={fileInputRef}
      />
    </div>
  );
}

// Upload Success Component
interface UploadSuccessProps {
  result: UploadResult;
}

function UploadSuccess({ result }: UploadSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-600">Upload Successful!</CardTitle>
          <CardDescription className="text-lg">
            Scan the QR code below to download your image directly to your phone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image 
                src={result.qrCodeDataUrl} 
                alt="QR Code for download"
                width={256}
                height={256}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Scan this QR code with your phone camera to download the image
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                <a href={result.downloadUrl} download>
                  <Download className="w-4 h-4 mr-2" />
                  Direct Download
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Another
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/80 to-blue-800/80" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-3000" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border-2 border-white/30">
            <Upload className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Upload Photo
          </h1>
          <p className="text-2xl md:text-3xl mb-8 drop-shadow-lg font-light">
            Share your memories with the world
          </p>
          <p className="text-lg md:text-xl mb-12 drop-shadow-md opacity-90">
            Upload an image and get a QR code for easy download and sharing
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Upload Section Component
interface UploadSectionProps {
  selectedFile: File | null;
  isUploading: boolean;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileInputClick: () => void;
  onUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function UploadSection({ 
  selectedFile, 
  isUploading, 
  onFileSelect, 
  onFileInputClick, 
  onUpload, 
  fileInputRef 
}: UploadSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upload Your Image
          </h2>
          <p className="text-xl text-gray-600">
            Choose from PNG, JPG, JPEG, GIF, or WebP files
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl text-blue-600">Choose Your Image</CardTitle>
            <CardDescription className="text-lg">
              Select an image file to upload and generate a QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileSelect}
                className="hidden"
              />
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-500 transition-all duration-300 hover:bg-blue-50 group hover:shadow-lg"
                onClick={onFileInputClick}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <ImageIcon className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Click to select an image file
                  </p>
                  <p className="text-gray-500 mb-4">
                    PNG, JPG, JPEG, GIF, WebP supported
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Max file size: 4MB</span>
                  </div>
                </div>
              </div>

              {selectedFile && (
                <Card className="bg-green-50 border-green-200 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-green-800">File Selected</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Ready
                          </Badge>
                        </div>
                        <p className="text-green-700 mb-1">{selectedFile.name}</p>
                        <p className="text-sm text-green-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button 
                onClick={onUpload}
                disabled={!selectedFile || isUploading}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold py-4 rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5" />
                    <span>Upload & Generate QR Code</span>
                  </div>
                )}
              </Button>
            </div>

            <Separator />

            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg" className="bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 rounded-2xl">
                <Link href="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}