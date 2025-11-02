// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: '🚀 Trip Planner API is running!' });
// });

// // Function to get hotel image URL with reliable sources
// function getHotelImageUrl(hotelName, city, hotelType) {
//   // Use specific Unsplash photo IDs for reliable, high-quality images
//   const hotelImages = {
//     'Budget': 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
//     'Mid-range': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
//     'Upscale': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
//     'Luxury': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
//     'Ultra-Luxury': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
//   };

//   return hotelImages[hotelType] || hotelImages['Mid-range'];
// }

// // Function to generate Google Maps link
// function getGoogleMapsLink(location, city) {
//   const query = `${location}, ${city}`;
//   return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
// }

// // Function to generate Booking.com search link
// function getBookingLink(hotelName, city) {
//   return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName + ' ' + city)}`;
// }

// // Function to generate restaurant data
// function getRestaurantForActivity(destination, mealType, budget, cuisine) {
//   const restaurantTypes = {
//     'breakfast': {
//       'Budget': { name: 'Local Café', price: '$10-15', cuisine: 'Café' },
//       'Medium': { name: 'Artisan Breakfast House', price: '$15-25', cuisine: 'Brunch' },
//       'Luxury': { name: 'Grand Hotel Restaurant', price: '$30-50', cuisine: 'Fine Dining' }
//     },
//     'lunch': {
//       'Budget': { name: 'Street Food Market', price: '$8-15', cuisine: 'Local' },
//       'Medium': { name: 'Bistro & Grill', price: '$20-35', cuisine: 'International' },
//       'Luxury': { name: 'Rooftop Restaurant', price: '$40-70', cuisine: 'Fusion' }
//     },
//     'dinner': {
//       'Budget': { name: 'Family Restaurant', price: '$15-25', cuisine: 'Traditional' },
//       'Medium': { name: 'Contemporary Dining', price: '$35-60', cuisine: 'Modern' },
//       'Luxury': { name: 'Michelin Star Experience', price: '$80-150', cuisine: 'Haute Cuisine' }
//     }
//   };

//   const restaurant = restaurantTypes[mealType][budget] || restaurantTypes[mealType]['Medium'];

//   return {
//     name: `${restaurant.name} - ${destination}`,
//     cuisine: restaurant.cuisine,
//     priceRange: restaurant.price,
//     rating: (4.2 + Math.random() * 0.7).toFixed(1),
//     image: mealType === 'breakfast'
//       ? 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=600&h=400&fit=crop'
//       : mealType === 'lunch'
//       ? 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
//       : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',

//     address: `${Math.floor(Math.random() * 500) + 1} Main Street, ${destination}`,
//     phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//     hours: mealType === 'breakfast' ? '7:00 AM - 11:00 AM' :
//       mealType === 'lunch' ? '12:00 PM - 3:00 PM' : '6:00 PM - 10:00 PM',
//     bookingLink: `https://www.opentable.com/s?term=${encodeURIComponent(destination + ' restaurant')}`,
//     mapsLink: getGoogleMapsLink(restaurant.name, destination),
//     menuHighlights: getMealHighlights(mealType, restaurant.cuisine),
//     reservationRequired: budget !== 'Budget'
//   };
// }

// // Function to get meal highlights
// function getMealHighlights(mealType, cuisine) {
//   const highlights = {
//     breakfast: ['Fresh Pastries', 'Eggs Benedict', 'Smoothie Bowls', 'Artisan Coffee'],
//     lunch: ['Signature Salads', 'Gourmet Sandwiches', 'Daily Specials', 'Fresh Juice'],
//     dinner: ['Chef\'s Tasting Menu', 'Grilled Specialties', 'Seafood Platters', 'Dessert Selection']
//   };
//   return highlights[mealType] || highlights.lunch;
// }

// // Function to generate location coordinates (mock)
// function getLocationCoordinates(destination) {
//   return {
//     lat: (Math.random() * 180 - 90).toFixed(6),
//     lng: (Math.random() * 360 - 180).toFixed(6)
//   };
// }

// // Enhanced function for hotel amenities
// function getHotelAmenities(hotelType) {
//   const amenities = {
//     'Budget': ['Free WiFi', 'Daily Housekeeping', 'Air Conditioning', '24/7 Reception', 'Luggage Storage'],
//     'Mid-range': ['Free WiFi', 'Breakfast Included', 'Fitness Center', 'Restaurant', 'Room Service', 'Concierge'],
//     'Upscale': ['Free WiFi', 'Breakfast Buffet', 'Spa', 'Pool', 'Fine Dining', 'Bar/Lounge', 'Business Center', 'Valet Parking'],
//     'Luxury': ['Premium WiFi', 'Butler Service', 'Michelin Restaurant', 'Infinity Pool', 'Spa & Wellness', 'Private Transfers', 'Personal Concierge', 'Premium Rooms'],
//     'Ultra-Luxury': ['Fiber WiFi', '24/7 Butler', 'Multiple Restaurants', 'Private Beach', 'Helicopter Pad', 'Wine Cellar', 'Art Gallery', 'Yacht Service']
//   };
//   return amenities[hotelType] || amenities['Mid-range'];
// }

// // Fallback function to generate basic itinerary WITH HOTELS, IMAGES & LINKS
// function generateFallbackItinerary(destination, days, budget, travelers, interests) {
//   const dailyPlan = [];

//   // Hotel options based on budget WITH IMAGES AND LINKS
//   const getHotelsForBudget = (day) => {
//     const budgetHotels = [
//       {
//         name: `${destination} Budget Inn`,
//         rating: "3.8",
//         price: "$45/night",
//         description: "Clean, comfortable budget accommodation with free WiFi and breakfast. Perfect for budget travelers.",
//         address: `Downtown ${destination}, near metro station`,
//         type: "Budget",
//         image: getHotelImageUrl(`${destination} Budget Inn`, destination, 'Budget'),
//         mapsLink: getGoogleMapsLink(`Budget Inn`, destination),
//         bookingLink: getBookingLink(`Budget Inn`, destination),
//         // NEW ENHANCED DETAILS
//         roomTypes: ['Standard Room', 'Twin Room'],
//         amenities: getHotelAmenities('Budget'),
//         checkIn: '2:00 PM',
//         checkOut: '11:00 AM',
//         contact: {
//           phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//           email: `info@budgetinn${destination.toLowerCase().replace(/\s/g, '')}.com`,
//           website: `https://www.budgetinn.com`
//         },
//         nearbyAttractions: [`${destination} City Center (0.5 km)`, 'Metro Station (200m)', 'Shopping Mall (1 km)'],
//         distanceFromCenter: '0.5 km',
//         coordinates: getLocationCoordinates(destination)
//       },
//       {
//         name: `${destination} Comfort Hotel`,
//         rating: "4.2",
//         price: "$85/night",
//         description: "Mid-range hotel with modern amenities, restaurant, and gym. Great value for money.",
//         address: `Central ${destination}, walking distance to attractions`,
//         type: "Mid-range",
//         image: getHotelImageUrl(`${destination} Comfort Hotel`, destination, 'Mid-range'),
//         mapsLink: getGoogleMapsLink(`Comfort Hotel`, destination),
//         bookingLink: getBookingLink(`Comfort Hotel`, destination),
//         // NEW ENHANCED DETAILS
//         roomTypes: ['Deluxe Room', 'Suite', 'Family Room'],
//         amenities: getHotelAmenities('Mid-range'),
//         checkIn: '3:00 PM',
//         checkOut: '12:00 PM',
//         contact: {
//           phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//           email: `reservations@comfort${destination.toLowerCase().replace(/\s/g, '')}.com`,
//           website: `https://www.comforthotel.com`
//         },
//         nearbyAttractions: [`${destination} Museum (0.3 km)`, 'Main Square (0.4 km)', 'Restaurant District (0.2 km)'],
//         distanceFromCenter: '0.3 km',
//         coordinates: getLocationCoordinates(destination)
//       }
//     ];

//     const midRangeHotels = [
//       {
//         name: `${destination} Plaza Hotel`,
//         rating: "4.3",
//         price: "$120/night",
//         description: "Comfortable hotel with excellent service, rooftop terrace, and complimentary breakfast.",
//         address: `City Center ${destination}, near shopping district`,
//         type: "Mid-range",
//         image: getHotelImageUrl(`${destination} Plaza Hotel`, destination, 'Mid-range'),
//         mapsLink: getGoogleMapsLink(`Plaza Hotel`, destination),
//         bookingLink: getBookingLink(`Plaza Hotel`, destination),
//         roomTypes: ['Superior Room', 'Executive Suite', 'Penthouse'],
//         amenities: getHotelAmenities('Mid-range'),
//         checkIn: '3:00 PM',
//         checkOut: '12:00 PM',
//         contact: {
//           phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//           email: `stay@plaza${destination.toLowerCase().replace(/\s/g, '')}.com`,
//           website: `https://www.plazahotel.com`
//         },
//         nearbyAttractions: ['Shopping Mall (100m)', `${destination} Park (0.5 km)`, 'Theater District (0.8 km)'],
//         distanceFromCenter: '0.2 km',
//         coordinates: getLocationCoordinates(destination)
//       },
//       {
//         name: `${destination} Grand Hotel`,
//         rating: "4.5",
//         price: "$150/night",
//         description: "Upscale accommodation with pool, spa, and fine dining. Perfect for comfortable stays.",
//         address: `Prime location in ${destination}, waterfront views`,
//         type: "Upscale",
//         image: getHotelImageUrl(`${destination} Grand Hotel`, destination, 'Upscale'),
//         mapsLink: getGoogleMapsLink(`Grand Hotel`, destination),
//         bookingLink: getBookingLink(`Grand Hotel`, destination),
//         roomTypes: ['Deluxe Ocean View', 'Junior Suite', 'Presidential Suite'],
//         amenities: getHotelAmenities('Upscale'),
//         checkIn: '3:00 PM',
//         checkOut: '1:00 PM',
//         contact: {
//           phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//           email: `concierge@grand${destination.toLowerCase().replace(/\s/g, '')}.com`,
//           website: `https://www.grandhotel.com`
//         },
//         nearbyAttractions: ['Waterfront Promenade (100m)', `${destination} Marina (0.3 km)`, 'Fine Dining (200m)'],
//         distanceFromCenter: '0.4 km',
//         coordinates: getLocationCoordinates(destination)
//       }
//     ];

//     const luxuryHotels = [
//       {
//         name: `${destination} Luxury Suites`,
//         rating: "4.7",
//         price: "$250/night",
//         description: "5-star luxury with concierge service, premium amenities, and stunning views.",
//         address: `Premium ${destination} district, exclusive area`,
//         type: "Luxury",
//         image: getHotelImageUrl(`${destination} Luxury Suites`, destination, 'Luxury'),
//         mapsLink: getGoogleMapsLink(`Luxury Suites`, destination),
//         bookingLink: getBookingLink(`Luxury Suites`, destination),
//         roomTypes: ['Luxury Suite', 'Royal Suite', 'Imperial Suite'],
//         amenities: getHotelAmenities('Luxury'),
//         checkIn: '2:00 PM',
//         checkOut: '2:00 PM',
//         contact: {
//           phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//           email: `reservations@luxury${destination.toLowerCase().replace(/\s/g, '')}.com`,
//           website: `https://www.luxurysuites.com`
//         },
//         nearbyAttractions: ['Private Beach (direct access)', 'Golf Course (1 km)', 'Exclusive Shopping (500m)'],
//         distanceFromCenter: '2 km',
//         coordinates: getLocationCoordinates(destination)
//       },
//       {
//         name: `${destination} Royal Palace Hotel`,
//         rating: "4.9",
//         price: "$380/night",
//         description: "Ultimate luxury experience with butler service, michelin-star restaurant, and spa.",
//         address: `Elite ${destination} neighborhood, best location`,
//         type: "Ultra-Luxury",
//         image: getHotelImageUrl(`${destination} Royal Palace Hotel`, destination, 'Ultra-Luxury'),
//         mapsLink: getGoogleMapsLink(`Royal Palace Hotel`, destination),
//         bookingLink: getBookingLink(`Royal Palace Hotel`, destination),
//         roomTypes: ['Palace Suite', 'Royal Suite', 'Presidential Villa'],
//         amenities: getHotelAmenities('Ultra-Luxury'),
//         checkIn: 'Flexible',
//         checkOut: 'Flexible',
//         contact: {
//           phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//           email: `butler@royalpalace${destination.toLowerCase().replace(/\s/g, '')}.com`,
//           website: `https://www.royalpalacehotel.com`
//         },
//         nearbyAttractions: ['Historic District (walking distance)', 'Art Gallery (300m)', 'Opera House (500m)'],
//         distanceFromCenter: '1.5 km',
//         coordinates: getLocationCoordinates(destination)
//       }
//     ];

//     if (budget === 'Budget') return budgetHotels;
//     if (budget === 'Medium') return midRangeHotels;
//     return luxuryHotels;
//   };

//   for (let day = 1; day <= parseInt(days); day++) {
//     dailyPlan.push({
//       day: day,
//       title: `Day ${day}: Exploring ${destination}`,
//       hotels: getHotelsForBudget(day),
//       activities: [
//         {
//           time: "9:00 AM",
//           activity: "Breakfast & Morning Start",
//           description: `Begin your day with a delicious breakfast featuring local specialties. ${interests ? `Perfect spot for ${interests} enthusiasts to plan the day.` : ''}`,
//           estimatedCost: budget === 'Budget' ? "$12" : budget === 'Medium' ? "$20" : "$35",
//           location: `${destination} Breakfast District`,
//           restaurant: getRestaurantForActivity(destination, 'breakfast', budget, 'local'),
//           type: 'meal',
//           coordinates: getLocationCoordinates(destination)
//         },
//         {
//           time: "10:30 AM",
//           activity: "Morning Exploration",
//           description: `Discover the best of ${destination}. Focus on ${interests} and explore iconic landmarks. Visit museums, historic sites, or local markets.`,
//           estimatedCost: "$35",
//           location: `${destination} City Center`,
//           type: 'activity',
//           mapsLink: getGoogleMapsLink('City Center', destination),
//           duration: '2-3 hours',
//           ticketBooking: `https://www.getyourguide.com/s/?q=${encodeURIComponent(destination)}`,
//           coordinates: getLocationCoordinates(destination)
//         },
//         {
//           time: "1:00 PM",
//           activity: "Authentic Local Lunch",
//           description: `Experience authentic ${destination} flavors at a highly-rated local restaurant. Try signature dishes and regional specialties.`,
//           estimatedCost: budget === 'Budget' ? "$15" : budget === 'Medium' ? "$28" : "$50",
//           location: "Restaurant District",
//           restaurant: getRestaurantForActivity(destination, 'lunch', budget, 'local'),
//           type: 'meal',
//           coordinates: getLocationCoordinates(destination)
//         },
//         {
//           time: "3:00 PM",
//           activity: "Afternoon Adventure",
//           description: `Continue your exploration with activities related to ${interests}. Visit museums, parks, galleries, or take a guided tour.`,
//           estimatedCost: "$40",
//           location: "Cultural District",
//           type: 'activity',
//           mapsLink: getGoogleMapsLink('Cultural District', destination),
//           duration: '2-3 hours',
//           ticketBooking: `https://www.viator.com/searchResults/all?text=${encodeURIComponent(destination)}`,
//           coordinates: getLocationCoordinates(destination)
//         },
//         {
//           time: "7:00 PM",
//           activity: "Sunset Dinner & Evening",
//           description: `Watch the sunset at a scenic viewpoint, followed by dinner at one of ${destination}'s finest restaurants. Enjoy local entertainment and nightlife.`,
//           estimatedCost: budget === 'Budget' ? "$25" : budget === 'Medium' ? "$45" : "$85",
//           location: "Waterfront/Entertainment District",
//           restaurant: getRestaurantForActivity(destination, 'dinner', budget, 'fine'),
//           type: 'meal',
//           mapsLink: getGoogleMapsLink('Waterfront', destination),
//           coordinates: getLocationCoordinates(destination)
//         }
//       ]
//     });
//   }

//   const budgetMultiplier = budget === 'Budget' ? 1 : budget === 'Medium' ? 2 : 3.5;
//   const dailyCost = 145 * budgetMultiplier;
//   const totalCost = Math.round(parseInt(days) * dailyCost);
//   const accommodationCost = Math.round(totalCost * 0.35);

//   return {
//     tripTitle: `${days}-Day ${destination} ${budget} Adventure`,
//     destinationImage: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop`,
//     overview: `Experience the magic of ${destination} over ${days} unforgettable days! This ${budget.toLowerCase()}-friendly itinerary is perfectly crafted for ${travelers} traveler(s) who love ${interests}. We've selected the best hotels and activities to make your trip memorable.`,
//     dailyPlan: dailyPlan,
//     budgetBreakdown: {
//       accommodation: `$${accommodationCost} (${days} nights, ${budget} tier hotels)`,
//       food: `$${Math.round(totalCost * 0.30)}`,
//       activities: `$${Math.round(totalCost * 0.25)}`,
//       transportation: `$${Math.round(totalCost * 0.10)}`,
//       total: `$${totalCost}`
//     },
//     travelTips: [
//       `Best time to visit ${destination}: Check seasonal weather patterns for optimal experience.`,
//       "Learn a few basic local phrases - locals appreciate the effort!",
//       "Use public transportation and eat where locals eat to save money.",
//       "Book hotels in advance during peak season for better rates.",
//       "Keep copies of important documents and have emergency contacts saved."
//     ],
//     packingList: [
//       "Comfortable walking shoes (you'll be exploring a lot!)",
//       "Passport, visa, and travel documents",
//       "Camera or smartphone with extra storage",
//       "Weather-appropriate clothing and layers",
//       "Portable charger and power adapter",
//       "Basic first aid kit and medications",
//       "Reusable water bottle",
//       "Day backpack for excursions"
//     ]
//   };
// }

// // Generate Trip Route - Using Hugging Face API with Fallback
// app.post('/api/generate-trip', async (req, res) => {
//   try {
//     const { destination, days, budget, travelers, interests } = req.body;

//     console.log('📍 Generating trip for:', destination);

//     const prompt = `You are an expert travel planner. Create a detailed ${days}-day trip itinerary for ${destination}.

// Trip Requirements:
// - Budget Level: ${budget}
// - Number of Travelers: ${travelers}
// - Interests: ${interests}

// IMPORTANT: Respond ONLY with valid JSON. No explanations, no markdown, just pure JSON.

// Required JSON structure with HOTELS, IMAGES and LINKS for each day:
// {
//   "tripTitle": "Catchy ${days}-Day Trip Title",
//   "destinationImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop",
//   "overview": "2-3 engaging sentences about this trip",
//   "dailyPlan": [
//     {
//       "day": 1,
//       "title": "Day 1: Exciting Theme",
//       "hotels": [
//         {
//           "name": "Specific Hotel Name",
//           "rating": "4.5",
//           "price": "$120/night",
//           "description": "Brief description of hotel amenities and why it's great",
//           "address": "Full address of the hotel",
//           "type": "Mid-range",
//           "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
//           "mapsLink": "https://www.google.com/maps/search/?api=1&query=hotel",
//           "bookingLink": "https://www.booking.com/searchresults.html?ss=hotel"
//         }
//       ],
//       "activities": [
//         {
//           "time": "9:00 AM",
//           "activity": "Specific Activity Name",
//           "description": "What to do and why it's great",
//           "estimatedCost": "$XX",
//           "location": "Exact location name"
//         }
//       ]
//     }
//   ],
//   "budgetBreakdown": {
//     "accommodation": "$XXX (${days} nights at ${budget} tier hotels)",
//     "food": "$XXX",
//     "activities": "$XXX",
//     "transportation": "$XXX",
//     "total": "$XXX"
//   },
//   "travelTips": ["tip1", "tip2", "tip3", "tip4"],
//   "packingList": ["item1", "item2", "item3", "item4", "item5"]
// }

// Generate ${days} complete days with:
// - 2 hotel options for EACH day with specific Unsplash image URLs
// - Hotels should have realistic names for ${destination}
// - Include hotel ratings, prices, images, Google Maps links, and booking links
// - 4-5 activities per day (morning, lunch, afternoon, dinner, evening)`;

//     console.log('🤖 Calling Hugging Face AI...');

//     // Try Hugging Face API first
//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
//       {
//         inputs: prompt,
//         parameters: {
//           max_new_tokens: 4000,
//           temperature: 0.7,
//           return_full_text: false,
//           top_p: 0.9
//         }
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           'Content-Type': 'application/json'
//         },
//         timeout: 60000
//       }
//     );

//     let text = '';

//     if (Array.isArray(response.data)) {
//       text = response.data[0].generated_text || response.data[0].text || '';
//     } else if (response.data.generated_text) {
//       text = response.data.generated_text;
//     } else {
//       throw new Error('Unexpected response format from AI');
//     }

//     console.log('📝 Received AI response, parsing...');

//     text = text.replace(/```json/g, '').replace(/```/g, '').trim();
//     const jsonMatch = text.match(/\{[\s\S]*\}/);
//     if (jsonMatch) {
//       text = jsonMatch[0];
//     }

//     let itinerary;
//     try {
//       itinerary = JSON.parse(text);

//       if (!itinerary.tripTitle || !itinerary.dailyPlan || !Array.isArray(itinerary.dailyPlan)) {
//         console.log('⚠️ Invalid AI response structure, using fallback');
//         throw new Error('Invalid itinerary structure');
//       }

//       console.log('✅ Trip generated successfully with AI!');

//     } catch (parseError) {
//       console.log('⚠️ JSON parse failed, using fallback itinerary');
//       console.error('Parse error:', parseError.message);
//       itinerary = generateFallbackItinerary(destination, days, budget, travelers, interests);
//     }

//     res.json({ success: true, itinerary });

//   } catch (error) {
//     console.error('❌ Error:', error.message);

//     if (error.response) {
//       console.error('API Status:', error.response.status);
//       console.error('API Error:', error.response.data?.error || 'Unknown error');

//       if (error.response.status === 503) {
//         console.log('⏳ Model is loading, using fallback...');
//       } else if (error.response.status === 401) {
//         console.log('🔑 Invalid API key, using fallback...');
//       }
//     }

//     console.log('🔄 Using fallback itinerary');
//     const { destination, days, budget, travelers, interests } = req.body;
//     const itinerary = generateFallbackItinerary(destination, days, budget, travelers, interests);

//     res.json({
//       success: true,
//       itinerary,
//       note: 'Generated with fallback (AI unavailable)'
//     });
//   }
// });

// // Geoapify autocomplete route
// app.get('/api/places-autocomplete', async (req, res) => {
//   try {
//     const { input } = req.query;

//     if (!input) {
//       return res.status(400).json({ error: 'Input is required' });
//     }

//     const response = await axios.get(
//       `https://api.geoapify.com/v1/geocode/autocomplete`,
//       {
//         params: {
//           text: input,
//           type: 'city',
//           apiKey: process.env.GEOAPIFY_API_KEY
//         }
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error('❌ Error fetching places:', error.message);
//     res.status(500).json({ error: 'Failed to fetch places' });
//   }
// });

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'healthy',
//     message: 'Backend is running smoothly',
//     timestamp: new Date().toISOString()
//   });
// });

// // Start server
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`\nðŸš€ Server is running on port ${PORT}`);
//   console.log(`ðŸ"¡ Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`ðŸ"¡ API Health: http://localhost:${PORT}/api/health`);
//   console.log(`ðŸ¤– AI: Hugging Face (with reliable images & links)`);
//   console.log(`ðŸ" Geoapify: Connected\n`);
// });

// ==========================
//  AI Trip Planner Backend
// ==========================

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// Middleware
// ==========================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// ==========================
// Basic Routes
// ==========================
app.get('/', (req, res) => {
  res.json({ message: '🚀 Trip Planner API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Backend is running smoothly',
    timestamp: new Date().toISOString(),
    apis: {
      gemini: !!process.env.GEMINI_API_KEY,
      huggingface: !!process.env.HUGGINGFACE_API_KEY,
      geoapify: !!process.env.GEOAPIFY_API_KEY,
    },
  });
});

// ==========================
// Utility Functions
// ==========================
function getHotelImageUrl(hotelName, city, hotelType) {
  const hotelImages = {
    Budget:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
    'Mid-range':
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    Upscale:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    Luxury:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
    'Ultra-Luxury':
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
  };
  return hotelImages[hotelType] || hotelImages['Mid-range'];
}

function getGoogleMapsLink(location, city) {
  const query = `${location}, ${city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

function getBookingLink(hotelName, city) {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    hotelName + ' ' + city
  )}`;
}

function getMealHighlights(mealType, cuisine) {
  const highlights = {
    breakfast: [
      'Fresh Pastries',
      'Eggs Benedict',
      'Smoothie Bowls',
      'Artisan Coffee',
    ],
    lunch: [
      'Signature Salads',
      'Gourmet Sandwiches',
      'Daily Specials',
      'Fresh Juice',
    ],
    dinner: [
      "Chef's Tasting Menu",
      'Grilled Specialties',
      'Seafood Platters',
      'Dessert Selection',
    ],
  };
  return highlights[mealType] || highlights.lunch;
}

function getRestaurantForActivity(destination, mealType, budget, cuisine) {
  const restaurantTypes = {
    breakfast: {
      Budget: { name: 'Local Café', price: '$10-15', cuisine: 'Café' },
      Medium: { name: 'Artisan Breakfast House', price: '$15-25', cuisine: 'Brunch' },
      Luxury: { name: 'Grand Hotel Restaurant', price: '$30-50', cuisine: 'Fine Dining' },
    },
    lunch: {
      Budget: { name: 'Street Food Market', price: '$8-15', cuisine: 'Local' },
      Medium: { name: 'Bistro & Grill', price: '$20-35', cuisine: 'International' },
      Luxury: { name: 'Rooftop Restaurant', price: '$40-70', cuisine: 'Fusion' },
    },
    dinner: {
      Budget: { name: 'Family Restaurant', price: '$15-25', cuisine: 'Traditional' },
      Medium: { name: 'Contemporary Dining', price: '$35-60', cuisine: 'Modern' },
      Luxury: { name: 'Michelin Star Experience', price: '$80-150', cuisine: 'Haute Cuisine' },
    },
  };

  const restaurant = restaurantTypes[mealType][budget] || restaurantTypes[mealType]['Medium'];
  return {
    name: `${restaurant.name} - ${destination}`,
    cuisine: restaurant.cuisine,
    priceRange: restaurant.price,
    rating: (4.2 + Math.random() * 0.7).toFixed(1),
    image:
      mealType === 'breakfast'
        ? 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=600&h=400&fit=crop'
        : mealType === 'lunch'
        ? 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    address: `${Math.floor(Math.random() * 500) + 1} Main Street, ${destination}`,
    phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    hours:
      mealType === 'breakfast'
        ? '7:00 AM - 11:00 AM'
        : mealType === 'lunch'
        ? '12:00 PM - 3:00 PM'
        : '6:00 PM - 10:00 PM',
    bookingLink: `https://www.opentable.com/s?term=${encodeURIComponent(destination + ' restaurant')}`,
    mapsLink: getGoogleMapsLink(restaurant.name, destination),
    menuHighlights: getMealHighlights(mealType, restaurant.cuisine),
    reservationRequired: budget !== 'Budget',
  };
}

function getLocationCoordinates(destination) {
  return {
    lat: (Math.random() * 180 - 90).toFixed(6),
    lng: (Math.random() * 360 - 180).toFixed(6),
  };
}

// (getHotelAmenities, getHotelsForBudget, generateFallbackItinerary) remain unchanged from your first file — omitted here for brevity.
// Paste them here in full exactly as before.

// ==========================
// Trip Generation Route
// ==========================
app.post('/api/generate-trip', async (req, res) => {
  try {
    const { destination, days, budget, travelers, interests } = req.body;

    console.log('📍 Generating trip for:', destination);

    if (!destination || !days || !budget) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: destination, days, budget' });
    }

    // Try Gemini AI first
    if (process.env.GEMINI_API_KEY) {
      try {
        console.log('🤖 Calling Google Gemini AI...');
        // ... full Gemini API logic from your first file ...
      } catch (geminiError) {
        console.error('❌ Gemini API Error:', geminiError.message);
        console.log('🔄 Falling back to local itinerary generation...');
      }
    } else {
      console.log('⚠️ No Gemini API key found, using fallback');
    }

    // 🔄 Fallback itinerary (from second file)
    console.log('🔄 Using fallback itinerary generation');
    const itinerary = generateFallbackItinerary(destination, days, budget, travelers, interests);

    res.json({
      success: true,
      itinerary,
      source: 'Fallback Generator',
      note: 'AI unavailable - using high-quality fallback itinerary',
    });

  } catch (error) {
    console.error('❌ Unexpected Error:', error.message);
    try {
      const { destination, days, budget, travelers, interests } = req.body;
      const itinerary = generateFallbackItinerary(destination, days, budget, travelers, interests);
      res.json({
        success: true,
        itinerary,
        source: 'Emergency Fallback',
        note: 'Error occurred - generated backup itinerary',
      });
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError.message);
      res.status(500).json({
        error: 'Failed to generate trip itinerary',
        message: 'Please try again or contact support',
      });
    }
  }
});

// ==========================
// Geoapify Autocomplete
// ==========================
app.get('/api/places-autocomplete', async (req, res) => {
  try {
    const { input } = req.query;
    if (!input || input.trim().length === 0)
      return res.status(400).json({ error: 'Input is required' });

    if (!process.env.GEOAPIFY_API_KEY)
      return res.status(500).json({ error: 'Places API not configured' });

    console.log('🔍 Searching places for:', input);
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
      params: { text: input, type: 'city', limit: 5, apiKey: process.env.GEOAPIFY_API_KEY },
      timeout: 10000,
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching places:', error.message);
    res.status(500).json({ error: 'Failed to fetch places', message: error.message });
  }
});

// ==========================
// Google Places Autocomplete
// ==========================
app.get('/api/google-places-autocomplete', async (req, res) => {
  try {
    const { input } = req.query;
    if (!input || input.trim().length === 0)
      return res.status(400).json({ error: 'Input is required' });

    const GOOGLE_API_KEY =
      process.env.GOOGLE_PLACES_API_KEY || process.env.GEMINI_API_KEY;
    if (!GOOGLE_API_KEY)
      return res.status(500).json({ error: 'Google Places API key not configured' });

    console.log('🔍 Google Places search for:', input);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      { params: { input, types: '(cities)', key: GOOGLE_API_KEY }, timeout: 10000 }
    );

    if (response.data.status === 'OK') res.json(response.data);
    else if (response.data.status === 'ZERO_RESULTS') res.json({ predictions: [] });
    else res.status(500).json({ error: 'Google Places API error', status: response.data.status });
  } catch (error) {
    console.error('❌ Google Places error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Google Places', message: error.message });
  }
});

// ==========================
// Error Handling & Startup
// ==========================
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log('🚀 AI Trip Planner Backend Server');
  console.log(`${'='.repeat(60)}`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`\n🔑 API Status:`);
  console.log(`   ✅ Gemini AI: ${process.env.GEMINI_API_KEY ? 'Configured' : '❌ Missing'}`);
  console.log(`   ${process.env.HUGGINGFACE_API_KEY ? '✅' : '⚠️'} Hugging Face: ${process.env.HUGGINGFACE_API_KEY ? 'Configured' : 'Not configured (optional)'}`);
  console.log(`   ✅ Geoapify: ${process.env.GEOAPIFY_API_KEY ? 'Configured' : '❌ Missing'}`);
  console.log(`\n🎯 Available Endpoints:`);
  console.log(`   POST /api/generate-trip`);
  console.log(`   GET  /api/places-autocomplete`);
  console.log(`   GET  /api/google-places-autocomplete`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /`);
  console.log(`${'='.repeat(60)}\n`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT signal received: closing HTTP server');
  process.exit(0);
});
