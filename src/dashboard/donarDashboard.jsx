import React, { useState, useEffect } from 'react';
import { Heart, Users, Globe, Smile } from 'lucide-react';

const DonorDashboard = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [donarEmail, setDonorEmail] = useState('');

  useEffect(() => {
    let email = localStorage.getItem("email");
    setDonorEmail(email);

    const interval = setInterval(() => {
      setCurrentStoryIndex(prev => (prev + 1) % inspiringStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const inspiringStories = [
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&crop=faces",
      title: "Education Changes Everything",
      quote: "Every child deserves the chance to learn and dream big",
      location: "Rural Schools Worldwide"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=faces",
      title: "Clean Water Brings Hope",
      quote: "A simple well transforms entire communities",
      location: "Villages in Need"
    },
    {
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop&crop=faces",
      title: "Feeding Families",
      quote: "No one should go to bed hungry",
      location: "Food Programs Globally"
    },
    {
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&crop=faces",
      title: "Healthcare for All",
      quote: "Your kindness saves lives every single day",
      location: "Medical Clinics"
    }
  ];

  const impactAreas = [
    {
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop&crop=faces",
      title: "Education & Learning",
      description: "Building schools, providing books, and creating opportunities for children to learn and grow.",
      icon: "📚"
    },
    {
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=faces",
      title: "Clean Water Access",
      description: "Drilling wells, installing filtration systems, and bringing safe drinking water to communities.",
      icon: "💧"
    },
    {
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop&crop=faces",
      title: "Healthcare Support",
      description: "Mobile clinics, medical supplies, and essential healthcare services for those in need.",
      icon: "🏥"
    },
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&crop=faces",
      title: "Emergency Relief",
      description: "Rapid response during disasters, providing shelter, food, and essential supplies.",
      icon: "🆘"
    }
  ];

  const communityImages = [
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&h=200&fit=crop&crop=faces"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={inspiringStories[currentStoryIndex].image}
          alt="Inspiring story"
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Thank You for Making a Difference
          </h1>
          <p className="text-2xl mb-2 italic">"{inspiringStories[currentStoryIndex].quote}"</p>
          <p className="text-lg opacity-90">{inspiringStories[currentStoryIndex].location}</p>
        </div>
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-4">
          <Heart className="h-8 w-8 text-white fill-current" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Generosity Creates Ripples of Hope
          </h2>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome {donarEmail}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every donation, no matter the size, creates waves of positive change that reach far beyond what we can imagine. 
            You are part of a global community of compassionate hearts working together to build a better world.
          </p>
        </div>

        {/* Impact Areas */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Where Your Heart Makes an Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative h-48">
                  <img 
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 text-3xl">{area.icon}</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{area.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspirational Quote Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-white text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6">✨</div>
            <h3 className="text-3xl font-bold mb-6">
              "The best way to find yourself is to lose yourself in the service of others."
            </h3>
            <p className="text-xl opacity-90">- Mahatma Gandhi</p>
          </div>
        </div>

        {/* Community Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Faces of Hope Around the World
          </h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            These smiles exist because of hearts like yours
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {communityImages.map((image, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image}
                  alt={`Community ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🌍</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Countries Reached</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-gray-600">Families Helped</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🏫</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
            <div className="text-gray-600">Schools Built</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">💝</div>
            <div className="text-3xl font-bold text-pink-600 mb-2">25K+</div>
            <div className="text-gray-600">Generous Hearts</div>
          </div>
        </div>

        {/* Final Inspiration */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
          <div className="text-5xl mb-6">🤲</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Your Kindness is a Gift to the World
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            In a world that can sometimes feel divided, your compassion builds bridges. 
            Your generosity plants seeds of hope that will bloom for generations to come. 
            Thank you for being a beacon of light in someone's darkness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;