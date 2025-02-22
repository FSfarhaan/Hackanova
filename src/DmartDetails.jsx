import React, { useState } from 'react';
import { MapPin, Star, Navigation, Bookmark, Share, Phone, ThumbsUp, MoreVertical } from 'lucide-react';

const DMartDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const locationData = {
    name: 'D Mart',
    nameHindi: 'डिमार्ट',
    rating: 4.2,
    totalReviews: 15581,
    type: 'Supermarket',
    features: ['In-store pick-up', 'Delivery'],
    address: '90 Feet Road, Mahavir Nagar Sports Club',
    fullAddress: 'Opposite Kamla Vihar, Kandivali, Mumbai, Maharashtra 400067',
    location: 'Located in: Leisha HR and PR Solutions LLP'
  };

  const dummyReviews = [
    {
      id: 1,
      author: 'Priya Sharma',
      rating: 5,
      time: '2 weeks ago',
      content: 'Great shopping experience! The store is well-organized and staff is helpful. Found everything I needed at reasonable prices. The fruits and vegetables section is particularly fresh.',
      likes: 45,
      images: true
    },
    {
      id: 2,
      author: 'Rajesh Kumar',
      rating: 4,
      time: '1 month ago',
      content: 'Good variety of products and competitive prices. Sometimes it gets crowded during weekends but overall good experience. Wish they would add more checkout counters.',
      likes: 32,
      images: false
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 3,
      time: '2 months ago',
      content: 'Decent store but parking can be a hassle during peak hours. Products are well-priced though and they usually have good deals on groceries.',
      likes: 18,
      images: false
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

  const RatingBarChart = ({ percentage }) => (
    <div className="flex items-center gap-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-500 w-8">{percentage}%</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
      {/* Header Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src="/api/placeholder/800/400"
          alt="D Mart Store Front"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
          <span>See photos</span>
        </button>
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
        
        <div className="flex items-center mt-2">
          <span className="text-gray-700">{locationData.type}</span>
          <span className="mx-2">•</span>
          <span className="text-blue-600">♿</span>
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
          <button
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'about'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
            disabled
          >
            About
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
          <Phone className="w-6 h-6 mb-1" />
          Send to phone
        </button>
        <button className="flex flex-col items-center text-blue-600 text-sm">
          <Share className="w-6 h-6 mb-1" />
          Share
        </button>
      </div>

      {/* Features */}
      <div className="p-4 border-b">
        <div className="flex gap-4">
          {locationData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Based on Active Tab */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">{locationData.address}</p>
                <p className="text-gray-600">{locationData.fullAddress}</p>
                <p className="text-gray-600 mt-2">{locationData.location}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            {/* Rating Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{locationData.rating}</div>
                  <div className="flex mt-1">
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
                  <div className="text-sm text-gray-500 mt-1">
                    {locationData.totalReviews.toLocaleString()} reviews
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-6">5</span>
                      <RatingBarChart percentage={65} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-6">4</span>
                      <RatingBarChart percentage={25} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-6">3</span>
                      <RatingBarChart percentage={7} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-6">2</span>
                      <RatingBarChart percentage={2} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-6">1</span>
                      <RatingBarChart percentage={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="divide-y">
              {dummyReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DMartDetails;