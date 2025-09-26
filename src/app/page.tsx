'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Pizza, Users, Download, Upload, Star, ChefHat, Clock, Award, CheckCircle, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface UploadResult {
  id: string;
  downloadUrl: string;
  qrCodeDataUrl: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsRegistered(true);
        setIsModalOpen(false);
      } else {
        const json = await response.json();
        alert(json.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isRegistered) {
    return <RegistrationSuccess />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <FeaturesSection />
      <MenuSection />
      <CTASection 
        isModalOpen={isModalOpen}
        onModalChange={setIsModalOpen}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

// Registration Success Component
function RegistrationSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-3000" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Pizza className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
              Welcome to Pizza Hut!
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thank you for joining our community! You now have exclusive access to our latest content and special offers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Video Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 text-center">Exclusive Content</h3>
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  title="Pizza Hut Commercial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <YouTubeDownloadButton />
              <Button asChild variant="outline" className="h-14 text-lg font-semibold rounded-xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300">
                <Link href="/upload">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Photo
                </Link>
              </Button>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Exclusive Offers</h4>
                <p className="text-sm text-gray-600">Get special discounts and promotions</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChefHat className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">New Recipes</h4>
                <p className="text-sm text-gray-600">Access to secret menu items</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">VIP Status</h4>
                <p className="text-sm text-gray-600">Priority service and delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Hero Section Component
interface HeroSectionProps {
  onOpenModal: () => void;
}

function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Black Background Base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.tasteandflavors.com/wp-content/uploads/2021/02/best-pizza-landscape.gif')`,
          opacity: 0.4,
          filter: 'sepia(20%) saturate(120%) hue-rotate(350deg)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
      
      {/* Subtle Red Tint */}
      <div className="absolute inset-0 bg-red-600/20" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-3000" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border-2 border-white/30">
            <Pizza className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">
            Pizza Hut
          </h1>
          <p className="text-2xl md:text-3xl mb-8 drop-shadow-lg font-light">
            Experience the taste that brings families together
          </p>
          <p className="text-lg md:text-xl mb-12 drop-shadow-md opacity-90">
            Join our community and get exclusive access to our latest content!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            onClick={onOpenModal}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Join Our Community
          </Button>

          <Button asChild variant="outline" size="lg" className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm">
            <Link href="/upload">
              <Upload className="w-5 h-5 mr-2" />
              Upload Photo
            </Link>
          </Button>
        </div>

        {/* Admin Report Button */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            <Link href="/admin">
              <Users className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            <Link href="/api-docs">
              <FileText className="w-4 h-4 mr-2" />
              API Docs
            </Link>
          </Button>
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

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description: "Our master chefs use only the finest ingredients and traditional recipes passed down through generations."
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Get your pizza hot and fresh in 30 minutes or less, delivered right to your door."
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Every pizza is made with love and care, ensuring the highest quality and taste."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Pizza Hut?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've been serving delicious pizza for over 60 years, bringing families together one slice at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                  <feature.icon className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Menu Section Component
function MenuSection() {
  const pizzas = [
    {
      id: 1,
      name: "Pepperoni Supreme",
      description: "Classic pepperoni with our signature sauce and mozzarella cheese.",
      price: "$12.99",
      image: "/pepperoni.jpeg",
      rating: 5
    },
    {
      id: 2,
      name: "Margherita Classic",
      description: "Fresh tomatoes, basil, and mozzarella on our thin crust.",
      price: "$10.99",
      image: "/margherita.jpeg",
      rating: 5
    },
    {
      id: 3,
      name: "BBQ Chicken",
      description: "Grilled chicken, BBQ sauce, red onions, and cilantro.",
      price: "$14.99",
      image: "/BBQ.jpeg",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Signature Pizzas
          </h2>
          <p className="text-xl text-gray-600">
            Discover our most popular pizzas, crafted with the finest ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pizzas.map((pizza) => (
            <Card key={pizza.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold text-gray-900">{pizza.name}</h3>
                  <Badge variant="secondary" className="bg-red-100 text-red-600">
                    Popular
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{pizza.description}</p>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">{pizza.price}</span>
                  <div className="flex items-center">
                    {[...Array(pizza.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
interface CTASectionProps {
  isModalOpen: boolean;
  onModalChange: (open: boolean) => void;
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

function CTASection({ isModalOpen, onModalChange, formData, onInputChange, onSubmit, isSubmitting }: CTASectionProps) {
  return (
    <section className="py-20 bg-red-600">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Join Our Community?
        </h2>
        <p className="text-xl text-red-100 mb-8">
          Get exclusive access to our latest content, special offers, and more!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog open={isModalOpen} onOpenChange={onModalChange}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
              >
                Join Now
              </Button>
            </DialogTrigger>
            <RegistrationModal 
              formData={formData}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </Dialog>
          <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full">
            <Link href="/upload">
              <Upload className="w-5 h-5 mr-2" />
              Upload Photo
            </Link>
          </Button>
        </div>
        
        {/* Admin Report Button */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="text-red-100 hover:text-white hover:bg-white/10">
            <Link href="/admin">
              <Users className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-red-100 hover:text-white hover:bg-white/10">
            <Link href="/api-docs">
              <FileText className="w-4 h-4 mr-2" />
              API Docs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Registration Modal Component
interface RegistrationModalProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

function RegistrationModal({ formData, onInputChange, onSubmit, isSubmitting }: RegistrationModalProps) {
  return (
    <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
      <DialogHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Pizza className="w-8 h-8 text-red-600" />
        </div>
        <DialogTitle className="text-3xl font-bold text-gray-900">Join Pizza Hut</DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-2">
          Register to get exclusive access to our content and special offers
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={onInputChange}
            required
            className="h-12 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onInputChange}
            required
            className="h-12 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={onInputChange}
            required
            className="h-12 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Registering...</span>
            </div>
          ) : (
            'Join Pizza Hut Community'
          )}
        </Button>
      </form>
    </DialogContent>
  );
}

// YouTube Download Button Component
function YouTubeDownloadButton() {
  const handleDownload = () => {
    // Direct download URL - replace with your actual download link
    const downloadUrl = 'https://sakm9p8wxgr8pari.public.blob.vercel-storage.com/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20%28Official%20Video%29%20%284K%20Remaster%29%20-%20Rick%20Astley%20%28720p%2C%20h264%29.mp4?download=1';
    window.open(downloadUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleDownload}
      className="h-14 bg-red-600 hover:bg-red-700 text-lg font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
    >
      <div className="flex items-center space-x-2">
        <Download className="w-5 h-5" />
        <span>Download Video</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </Button>
  );
}