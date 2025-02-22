import React, { useState } from 'react';import React, { useState } from 'react';
import { MapPin, Star, Navigation, Bookmark, Share, Phone, ThumbsUp, MoreVertical, AlertTriangle, Newspaper, Shield } from 'lucide-react';


const KandivaliDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const locationData = {
    name: 'Kandivali',
    nameHindi: 'कांदिवली',
    rating: 4.4,
    totalReviews: 22581,
    type: 'Suburb',
    features: ['Shopping Centers', 'Schools', 'Parks'],
    address: 'Western Suburb of Mumbai',
    fullAddress: 'Kandivali East & West, Mumbai, Maharashtra 400067',
    safetyScore: 8.5,
    crimeStats: {
      overall: 'Low',
      recentIncidents: 12,
      mostCommon: 'Petty theft',
      safeAreas: ['Mahavir Nagar', 'Thakur Complex', 'Lokhandwala Township'],
      cautionAreas: ['Railway Station area during late hours']
    },
    recentNews: [
      {
        title: 'New Metro Line Extension',
        date: '1 week ago',
        type: 'infrastructure'
      },
      {
        title: 'Local Park Renovation Complete',
        date: '2 weeks ago',
        type: 'community'
      },
      {
        title: 'Traffic Improvement Project',
        date: '3 weeks ago',
        type: 'infrastructure'
      }
    ]
  };

  const dummyReviews = [
    {
      id: 1,
      author: 'Priya Sharma',
      rating: 5,
      time: '2 weeks ago',
      content: 'Kandivali is a fantastic place to live! The area has developed so much in recent years. Thakur Complex has everything you need - from shopping to entertainment. Very safe for families.',
      likes: 145,
      images: true
    },
    {
      id: 2,
      author: 'Rajesh Kumar',
      rating: 4,
      time: '1 month ago',
      content: 'Great locality with good schools and markets. Metro connectivity has made commuting much easier. Only drawback is peak hour traffic near the station.',
      likes: 92,
      images: false
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 5,
      time: '2 months ago',
      content: 'Living here for 10 years. Very peaceful area with excellent amenities. The new gardens and walking tracks are a great addition. Perfect for families.',
      likes: 78,
      images: true
    },
    {
      id: 4,
      author: 'Meera Desai',
      rating: 4,
      time: '3 months ago',
      content: 'Nice residential area with good connectivity. Markets are nearby and the area feels safe even at night. Would recommend avoiding station area late evening though.',
      likes: 56,
      images: false
    },
    {
      id: 5,
      author: 'Sunil Mehta',
      rating: 5,
      time: '3 months ago',
      content: 'Best suburb in Mumbai! The infrastructure development in recent years has been impressive. Great place for both families and working professionals.',
      likes: 112,
      images: true
    }
  ];

  const ReviewCard = ({ review }) => (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">
                {review.author[0]}
              </span>
            </div>
            <div>
              <h3 className="font-medium">{review.author}</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">{review.time}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="text-gray-500">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <p className="mt-2 text-gray-700">{review.content}</p>
      
      {review.images && (
        <div className="mt-3 flex gap-2">
          <img src="/api/placeholder/120/120" alt="Review" className="w-28 h-28 rounded object-cover" />
          <img src="/api/placeholder/120/120" alt="Review" className="w-28 h-28 rounded object-cover" />
        </div>
      )}
      
      <div className="mt-3 flex items-center gap-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
          <ThumbsUp className="w-4 h-4" />
          <span>Like ({review.likes})</span>
        </button>
      </div>
    </div>
  );

  const SafetyIndicator = ({ score }) => {
    const getColor = (score) => {
      if (score >= 8) return 'bg-green-500';
      if (score >= 6) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
        <div className="flex items-center gap-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${getColor(score)} h-2 rounded-full`} 
            style={{ width: `${score * 10}%` }}
          />
        </div>
        <span className="font-semibold">{score}/10</span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
      {/* Header Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src="/api/placeholder/800/400"
          alt="Kandivali Skyline"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Info */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold">{locationData.name}</h1>
        <p className="text-gray-600">{locationData.nameHindi}</p>
        
        <div className="flex items-center mt-2">
          <span className="font-semibold mr-2">{locationData.rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(locationData.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">({locationData.totalReviews.toLocaleString()})</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6 px-4">
          <button
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-5 gap-2 p-4 border-b">
        <button className="flex flex-col items-center text-blue-600 text-sm">
          <Navigation className="w-6 h-6 mb-1" />
          Directions
        </button>
        <button className="flex flex-col items-center text-blue-600 text-sm">
          <Bookmark className="w-6 h-6 mb-1" />
          Save
        </button>
        <button className="flex flex-col items-center text-blue-600 text-sm">
          <MapPin className="w-6 h-6 mb-1" />
          Nearby
        </button>
        <button className="flex flex-col items-center text-blue-600 text-sm">
          <Share className="w-6 h-6 mb-1" />
          Share
        </button>
        <button className="flex flex-col items-center text-blue-600 text-sm">
          <Shield className="w-6 h-6 mb-1" />
          Safety
        </button>
      </div>

      {/* Content Based on Active Tab */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Location Info */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">{locationData.address}</p>
                <p className="text-gray-600">{locationData.fullAddress}</p>
              </div>
            </div>

            {/* Safety Score */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Safety Score</h3>
              </div>
              <SafetyIndicator score={locationData.safetyScore} />
              
              <div className="mt-4 space-y-2">
                <Alert>
                  <AlertDescription>
                    <strong>Crime Rate:</strong> {locationData.crimeStats.overall} ({locationData.crimeStats.recentIncidents} incidents in last month)
                  </AlertDescription>
                </Alert>
                
                <div className="text-sm">
                  <p className="font-medium mt-2">Safe Areas:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {locationData.crimeStats.safeAreas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm">
                  <p className="font-medium mt-2">Exercise Caution:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {locationData.crimeStats.cautionAreas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent News */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Newspaper className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Recent News</h3>
              </div>
              <div className="space-y-3">
                {locationData.recentNews.map((news, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`px-2 py-1 rounded text-xs ${
                      news.type === 'infrastructure' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {news.type}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{news.title}</p>
                      <p className="text-xs text-gray-500">{news.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="divide-y">
            {dummyReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KandivaliDetails;

import { MapPin, Star, Navigation, Bookmark, Share, Phone, ThumbsUp, MoreVertical, AlertTriangle, Newspaper, Shield } from 'lucide-react';

import { Alert, AlertDescription } from "@/components/ui/alert";



const KandivaliDetail = () => {

  const [activeTab, setActiveTab] = useState('overview');



  const locationData = {

    name: 'Kandivali',

    nameHindi: 'कांदिवली',

    rating: 4.4,

    totalReviews: 22581,

    type: 'Suburb',

    features: ['Shopping Centers', 'Schools', 'Parks'],

    address: 'Western Suburb of Mumbai',

    fullAddress: 'Kandivali East & West, Mumbai, Maharashtra 400067',

    safetyScore: 8.5,

    crimeStats: {

      overall: 'Low',

      recentIncidents: 12,

      mostCommon: 'Petty theft',

      safeAreas: ['Mahavir Nagar', 'Thakur Complex', 'Lokhandwala Township'],

      cautionAreas: ['Railway Station area during late hours']

    },

    recentNews: [

      {

        title: 'New Metro Line Extension',

        date: '1 week ago',

        type: 'infrastructure'

      },

      {

        title: 'Local Park Renovation Complete',

        date: '2 weeks ago',

        type: 'community'

      },

      {

        title: 'Traffic Improvement Project',

        date: '3 weeks ago',

        type: 'infrastructure'

      }

    ]

  };



  const dummyReviews = [

    {

      id: 1,

      author: 'Priya Sharma',

      rating: 5,

      time: '2 weeks ago',

      content: 'Kandivali is a fantastic place to live! The area has developed so much in recent years. Thakur Complex has everything you need - from shopping to entertainment. Very safe for families.',

      likes: 145,

      images: true

    },

    {

      id: 2,

      author: 'Rajesh Kumar',

      rating: 4,

      time: '1 month ago',

      content: 'Great locality with good schools and markets. Metro connectivity has made commuting much easier. Only drawback is peak hour traffic near the station.',

      likes: 92,

      images: false

    },

    {

      id: 3,

      author: 'Amit Patel',

      rating: 5,

      time: '2 months ago',

      content: 'Living here for 10 years. Very peaceful area with excellent amenities. The new gardens and walking tracks are a great addition. Perfect for families.',

      likes: 78,

      images: true

    },

    {

      id: 4,

      author: 'Meera Desai',

      rating: 4,

      time: '3 months ago',

      content: 'Nice residential area with good connectivity. Markets are nearby and the area feels safe even at night. Would recommend avoiding station area late evening though.',

      likes: 56,

      images: false

    },

    {

      id: 5,

      author: 'Sunil Mehta',

      rating: 5,

      time: '3 months ago',

      content: 'Best suburb in Mumbai! The infrastructure development in recent years has been impressive. Great place for both families and working professionals.',

      likes: 112,

      images: true

    }

  ];



  const ReviewCard = ({ review }) => (

    <div className="py-4 border-b last:border-b-0">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-2">

            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">

              <span className="text-lg font-medium text-gray-600">

                {review.author[0]}

              </span>

            </div>

            <div>

              <h3 className="font-medium">{review.author}</h3>

              <div className="flex items-center gap-2">

                <div className="flex">

                  {[...Array(5)].map((_, I) => (

                    <Star

                      key={I}

                      className={`w-4 h-4 ${

                        I < review.rating

                          ? 'text-yellow-400 fill-current'

                          : 'text-gray-300'

                      }`}

                    />

                  ))}

                </div>

                <span className="text-gray-500 text-sm">{review.time}</span>

              </div>

            </div>

          </div>

        </div>

        <button className="text-gray-500">

          <MoreVertical className="w-5 h-5" />

        </button>

      </div>

      

      <p className="mt-2 text-gray-700">{review.content}</p>

      

      {review.images && (

        <div className="mt-3 flex gap-2">

          <img src="/api/placeholder/120/120" alt="Review" className="w-28 h-28 rounded object-cover" />

          <img src="/api/placeholder/120/120" alt="Review" className="w-28 h-28 rounded object-cover" />

        </div>

      )}

      

      <div className="mt-3 flex items-center gap-4">

        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">

          <ThumbsUp className="w-4 h-4" />

          <span>Like ({review.likes})</span>

        </button>

      </div>

    </div>

  );



  const SafetyIndicator = ({ score }) => {

    const getColor = (score) => {

      if (score >= 8) return 'bg-green-500';

      if (score >= 6) return 'bg-yellow-500';

      return 'bg-red-500';

    };



    return (
<div className="flex items-center gap-2">
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`${getColor(score)} h-2 rounded-full`} 
        style={{ width: `${score * 10}%` }}
      />
    </div>
    <span className="font-semibold">{score}/10</span>
  </div>
);

  };



  return (

    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">

      {/* Header Image */}

      <div className="relative h-48 bg-gray-200">

        <img 

          src="/api/placeholder/800/400"

          alt="Kandivali Skyline"

          className="w-full h-full object-cover"

        />

      </div>



      {/* Main Info */}

      <div className="p-4">

        <h1 className="text-2xl font-semibold">{locationData.name}</h1>

        <p className="text-gray-600">{locationData.nameHindi}</p>

        

        <div className="flex items-center mt-2">

          <span className="font-semibold mr-2">{locationData.rating}</span>

          <div className="flex">

            {[...Array(5)].map((_, I) => (

              <Star

                key={I}

                className={`w-4 h-4 ${

                  I < Math.floor(locationData.rating)

                    ? 'text-yellow-400 fill-current'

                    : 'text-gray-300'

                }`}

              />

            ))}

          </div>

          <span className="ml-2 text-gray-600">({locationData.totalReviews.toLocaleString()})</span>

        </div>

      </div>



      {/* Tabs */}

      <div className="border-b">

        <div className="flex gap-6 px-4">

          <button

            className={`py-2 px-1 border-b-2 ${

              activeTab === 'overview'

                ? 'border-blue-600 text-blue-600'

                : 'border-transparent'

            }`}

            onClick={() => setActiveTab('overview')}

          >

            Overview

          </button>

          <button

            className={`py-2 px-1 border-b-2 ${

              activeTab === 'reviews'

                ? 'border-blue-600 text-blue-600'

                : 'border-transparent'

            }`}

            onClick={() => setActiveTab('reviews')}

          >

            Reviews

          </button>

        </div>

      </div>



      {/* Action Buttons */}

      <div className="grid grid-cols-5 gap-2 p-4 border-b">

        <button className="flex flex-col items-center text-blue-600 text-sm">

          <Navigation className="w-6 h-6 mb-1" />

          Directions

        </button>

        <button className="flex flex-col items-center text-blue-600 text-sm">

          <Bookmark className="w-6 h-6 mb-1" />

          Save

        </button>

        <button className="flex flex-col items-center text-blue-600 text-sm">

          <MapPin className="w-6 h-6 mb-1" />

          Nearby

        </button>

        <button className="flex flex-col items-center text-blue-600 text-sm">

          <Share className="w-6 h-6 mb-1" />

          Share

        </button>

        <button className="flex flex-col items-center text-blue-600 text-sm">

          <Shield className="w-6 h-6 mb-1" />

          Safety

        </button>

      </div>



      {/* Content Based on Active Tab */}

      <div className="p-4">

        {activeTab === 'overview' && (

          <div className="space-y-6">

            {/* Location Info */}

            <div className="flex items-start gap-3">

              <MapPin className="w-5 h-5 text-gray-600 mt-1" />

              <div>

                <p className="font-medium">{locationData.address}</p>

                <p className="text-gray-600">{locationData.fullAddress}</p>

              </div>

            </div>



            {/* Safety Score */}

            <div className="bg-gray-50 p-4 rounded-lg">

              <div className="flex items-center gap-2 mb-3">

                <Shield className="w-5 h-5 text-green-600" />

                <h3 className="font-semibold">Safety Score</h3>

              </div>

              <SafetyIndicator score={locationData.safetyScore} />

              

              <div className="mt-4 space-y-2">

                <Alert>

                  <AlertDescription>

                    <strong>Crime Rate:</strong> {locationData.crimeStats.overall} ({locationData.crimeStats.recentIncidents} incidents in last month)

                  </AlertDescription>

                </Alert>

                

                <div className="text-sm">

                  <p className="font-medium mt-2">Safe Areas:</p>

                  <ul className="list-disc list-inside text-gray-600">

                    {locationData.crimeStats.safeAreas.map((area, index) => (

                      <li key={index}>{area}</li>

                    ))}

                  </ul>

                </div>



                <div className="text-sm">

                  <p className="font-medium mt-2">Exercise Caution:</p>

                  <ul className="list-disc list-inside text-gray-600">

                    {locationData.crimeStats.cautionAreas.map((area, index) => (

                      <li key={index}>{area}</li>

                    ))}

                  </ul>

                </div>

              </div>

            </div>



            {/* Recent News */}

            <div className="bg-gray-50 p-4 rounded-lg">

              <div className="flex items-center gap-2 mb-3">

                <Newspaper className="w-5 h-5 text-blue-600" />

                <h3 className="font-semibold">Recent News</h3>

              </div>

              <div className="space-y-3">

                {locationData.recentNews.map((news, index) => (

                  <div key={index} className="flex items-start gap-2">

                    <div className={`px-2 py-1 rounded text-xs ${

                      news.type === 'infrastructure' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'

                    }`}>

                      {news.type}

                    </div>

                    <div>

                      <p className="text-sm font-medium">{news.title}</p>

                      <p className="text-xs text-gray-500">{news.date}</p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        

        {activeTab === 'reviews' && (

          <div className="divide-y">

            {dummyReviews.map(review => (

              <ReviewCard key={review.id} review={review} />

            ))}

          </div>

        )}

      </div>

    </div>

  );

};



export default KandivaliDetails;