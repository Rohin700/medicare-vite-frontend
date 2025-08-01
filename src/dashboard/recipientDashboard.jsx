// import React, { useState, useEffect } from 'react';
// import { Heart, Users, Shield, Sun } from 'lucide-react';

// const RecipientDashboard = () => {
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

//   const hopefulMessages = [
//     {
//       image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=face",
//       title: "You Are Not Alone",
//       message: "There's an entire community of caring hearts standing with you every step of the way.",
//       author: "Support Team"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&crop=face",
//       title: "Help is Always Available",
//       message: "Whenever you need assistance, resources, or just someone to listen, we're here for you.",
//       author: "Care Coordinator"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=face",
//       title: "Every Day Brings New Hope",
//       message: "Each sunrise brings new possibilities and reasons to believe in brighter days ahead.",
//       author: "Wellness Team"
//     },
//     {
//       image: "https://images.unsplash.com/photo-1559757175-0eb1c24a919f?w=600&h=400&fit=crop&crop=face",
//       title: "Your Strength Inspires Us",
//       message: "Your courage and resilience remind us why this work matters so much.",
//       author: "Community Leaders"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessageIndex(prev => (prev + 1) % hopefulMessages.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const comfortingImages = [
//     "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=face",
//     "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=300&h=200&fit=crop&crop=face",
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=face",
//     "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&h=200&fit=crop&crop=face"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Hero Section with Rotating Messages */}
//       <div className="relative h-96 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             {hopefulMessages[currentMessageIndex].title}
//           </h1>
//           <p className="text-xl md:text-2xl mb-2 font-light italic">
//             "{hopefulMessages[currentMessageIndex].message}"
//           </p>
//           <p className="text-lg opacity-90">
//             - {hopefulMessages[currentMessageIndex].author}
//           </p>
//         </div>
//         <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-4">
//           <Heart className="h-8 w-8 text-white fill-current animate-pulse" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Welcome & Reassurance */}
//         <div className="text-center mb-16">
//           <div className="text-6xl mb-6">🌅</div>
//           <h2 className="text-4xl font-bold text-gray-800 mb-6">
//             Welcome to Your Safe Space
//           </h2>
//           <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//             This is your personal dashboard where you can find all the support, resources, and care you need. 
//             Remember, asking for help is a sign of strength, not weakness. You are valued, you are supported, 
//             and you are never alone in this journey.
//           </p>
//         </div>

//         {/* Encouraging Quote */}
//         <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-12 text-white text-center mb-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-6xl mb-6">🌟</div>
//             <h3 className="text-3xl font-bold mb-6">
//               "Difficult roads often lead to beautiful destinations."
//             </h3>
//             <p className="text-xl opacity-90">
//               Every challenge you face today is building the strength for tomorrow's victories.
//             </p>
//           </div>
//         </div>

//         {/* Community Faces */}
//         <div className="mb-16">
//           <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
//             You're Part of Our Family
//           </h3>
//           <p className="text-center text-gray-600 mb-12 text-lg">
//             Meet some of the caring people who are here to support you
//           </p>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {comfortingImages.map((image, index) => (
//               <div key={index} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
//                 <img 
//                   src={image}
//                   alt={`Support team member ${index + 1}`}
//                   className="w-full h-32 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                 <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
//                   Here for you
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Comfort Statistics */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
//           <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
//             <div className="text-4xl mb-4">🤗</div>
//             <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
//             <div className="text-gray-600">Support Available</div>
//           </div>
//           <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
//             <div className="text-4xl mb-4">🏠</div>
//             <div className="text-3xl font-bold text-green-600 mb-2">Safe</div>
//             <div className="text-gray-600">Environment Always</div>
//           </div>
//           <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
//             <div className="text-4xl mb-4">❤️</div>
//             <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
//             <div className="text-gray-600">Confidential Care</div>
//           </div>
//           <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
//             <div className="text-4xl mb-4">🌈</div>
//             <div className="text-3xl font-bold text-pink-600 mb-2">Hope</div>
//             <div className="text-gray-600">Always Present</div>
//           </div>
//         </div>

//         {/* Daily Affirmation */}
//         <div className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-12 border border-yellow-200">
//           <div className="text-5xl mb-6">☀️</div>
//           <h3 className="text-3xl font-bold text-gray-800 mb-6">
//             Today's Reminder
//           </h3>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
//             You are stronger than you know, braver than you feel, and more loved than you can imagine. 
//             Every step forward, no matter how small, is progress worth celebrating.
//           </p>
//           <div className="text-lg text-gray-600 font-medium">
//             Take it one day at a time. We believe in you. 💪
//           </div>
//         </div>

//         {/* Final Comfort Message */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
//             <Shield className="h-8 w-8 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">
//             You Are Protected Here
//           </h3>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             This space is designed to be your sanctuary. Everything here is meant to support your journey 
//             toward healing, growth, and hope. Trust in the process, trust in the community, and most 
//             importantly, trust in yourself.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientDashboard;

import React, { useState, useEffect } from 'react';
import { Heart, Users, Shield, Sun } from 'lucide-react';

const RecipientDashboard = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const hopefulMessages = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=face",
      title: "You Are Not Alone",
      message: "There's an entire community of caring hearts standing with you every step of the way.",
      author: "Support Team"
    },
    {
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&crop=face",
      title: "Help is Always Available",
      message: "Whenever you need assistance, resources, or just someone to listen, we're here for you.",
      author: "Care Coordinator"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % hopefulMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const comfortingImages = [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=300&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&h=200&fit=crop&crop=face"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section with Rotating Messages */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={hopefulMessages[currentMessageIndex].image}
          alt="Supportive community"
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {hopefulMessages[currentMessageIndex].title}
          </h1>
          <p className="text-xl md:text-2xl mb-2 font-light italic">
            "{hopefulMessages[currentMessageIndex].message}"
          </p>
          <p className="text-lg opacity-90">
            - {hopefulMessages[currentMessageIndex].author}
          </p>
        </div>
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-4">
          <Heart className="h-8 w-8 text-white fill-current animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome & Reassurance */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🌅</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Your Safe Space
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            This is your personal dashboard where you can find all the support, resources, and care you need. 
            Remember, asking for help is a sign of strength, not weakness. You are valued, you are supported, 
            and you are never alone in this journey.
          </p>
        </div>

        {/* Encouraging Quote */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-12 text-white text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🌟</div>
            <h3 className="text-3xl font-bold mb-6">
              "Difficult roads often lead to beautiful destinations."
            </h3>
            <p className="text-xl opacity-90">
              Every challenge you face today is building the strength for tomorrow's victories.
            </p>
          </div>
        </div>

        {/* Community Faces */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
            You're Part of Our Family
          </h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Meet some of the caring people who are here to support you
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {comfortingImages.map((image, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image}
                  alt={`Support team member ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                  Here for you
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comfort Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🤗</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🏠</div>
            <div className="text-3xl font-bold text-green-600 mb-2">Safe</div>
            <div className="text-gray-600">Environment Always</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">❤️</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Confidential Care</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🌈</div>
            <div className="text-3xl font-bold text-pink-600 mb-2">Hope</div>
            <div className="text-gray-600">Always Present</div>
          </div>
        </div>

        {/* Daily Affirmation */}
        <div className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-12 border border-yellow-200">
          <div className="text-5xl mb-6">☀️</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Today's Reminder
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
            You are stronger than you know, braver than you feel, and more loved than you can imagine. 
            Every step forward, no matter how small, is progress worth celebrating.
          </p>
          <div className="text-lg text-gray-600 font-medium">
            Take it one day at a time. We believe in you. 💪
          </div>
        </div>

        {/* Final Comfort Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            You Are Protected Here
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This space is designed to be your sanctuary. Everything here is meant to support your journey 
            toward healing, growth, and hope. Trust in the process, trust in the community, and most 
            importantly, trust in yourself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;