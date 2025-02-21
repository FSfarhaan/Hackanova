import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="flex items-center">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
            AeroVolt
          </span>
        </div>
        <div className="flex items-center space-x-8">
         
          <button 
            onClick={() => navigate('/contact')}
            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-blue-500 hover:text-white hover:border-transparent transition-all duration-300 ease-in-out"
          >
            Contact Us
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-12 flex items-center min-h-screen">
        <div className="w-1/2 pr-12">
          <h1 className="text-8xl font-bold leading-tight mb-8">
            <span className="block transition-transform duration-300 hover:translate-x-2">
              Your Safety,
            </span>
            <span className="block transition-transform duration-300 hover:translate-x-2">
              Is Our Priority
            </span>
          </h1>
          
          <p className="text-gray-600 mb-12 text-4xl text-justify">
          We ensure your security with real-time location sharing, safe route planning, and emergency assistance.
          </p>
          
          <div className="flex items-center  space-x-8">
            <button 
              onClick={() => navigate("/feelsafe")} 
              className="px-6 py-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 mb-8 text-2xl"
            >
              FeelSafe
            </button>
            <button 
              onClick={() => navigate("/sos")} 
              className="px-6 py-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 mb-8 text-2xl"
            >
              Send Emergency SOS
            </button>
          </div>
          
          {/* Project Link */}
          <div className="mt-12">
            <button 
              onClick={() => navigate("/projects")}
              className="group flex items-center space-x-4 p-4 bg-white rounded-xl hover:bg-gray-50 transform hover:translate-x-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl w-full"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white">
                <ChevronRight className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Discover our</p>
                <p className="text-gray-600">recent project</p>
              </div>
              <ChevronRight className="ml-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-1/2 relative">
          <div className="relative w-full h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent" />
            <img
              src="/landing-page-img.png"
              alt="Floating island with wind turbines"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;