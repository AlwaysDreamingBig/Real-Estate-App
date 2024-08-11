export const initialMessages = [
    { id: 1, sender: "Alice", text: "Hi, I’m interested in the property at 123 Main Street. Can you provide more details and schedule a viewing for me?", timestamp: "10:00 AM", read: true },
    { id: 2, sender: "Bob", text: "Hello, could you send me the floor plan and any recent inspection reports for the house on Elm Street?", timestamp: "10:05 AM", read: false },
    { id: 3, sender: "Charlie", text: "Hi, I’m considering making an offer on the property at 456 Oak Avenue. Is the seller open to negotiations on the price?", timestamp: "10:10 AM", read: true },
    { id: 4, sender: "Alice", text: "Hello, I submitted an offer for the property at 789 Pine Lane last week. Have there been any updates from the seller?", timestamp: "10:00 AM", read: true },
    { id: 5, sender: "Bob", text: "Hi, could you provide a comparative market analysis for the neighborhood around 321 Birch Road?", timestamp: "10:05 AM", read: false },
    { id: 6, sender: "Charlie", text: "Hello, can you recommend any mortgage brokers or financing options for purchasing a home in this area?", timestamp: "10:10 AM", read: true },
    { id: 7, sender: "Alice", text: "Hi, what are the monthly HOA fees for the condo at 654 Maple Street, and what do they cover?", timestamp: "10:00 AM", read: true },
    { id: 8, sender: "Bob", text: "Hello, I’m currently out of town. Is it possible to arrange a virtual tour of the property at 987 Cedar Avenue?", timestamp: "10:05 AM", read: false },
    { id: 9, sender: "Charlie", text: "Hi, can you provide any information on the previous owners or history of the property at 222 Spruce Street?", timestamp: "10:10 AM", read: true },
  ];

  const comments = [
    {
      id: 1,
      text: "Great place! Very clean and well-located. The host was very friendly and helpful.",
      imageUrl: "https://example.com/user1.jpg",
      stars: 5,
      name: "Alice Johnson",
      country: "USA",
      city: "New York",
      anciennete: "2 months ago"
    },
    {
      id: 2,
      text: "We had a wonderful stay. The apartment is beautiful and has everything you need.",
      imageUrl: "https://example.com/user2.jpg",
      stars: 4,
      name: "Bob Smith",
      country: "Canada",
      city: "Toronto",
      anciennete: "3 months ago"
    },
    {
      id: 3,
      text: "The location is perfect, right in the heart of the city. Highly recommended!",
      imageUrl: "https://example.com/user3.jpg",
      stars: 5,
      name: "Charlie Brown",
      country: "UK",
      city: "London",
      anciennete: "1 month ago"
    },
    {
      id: 4,
      text: "Nice and cozy place. It was a great experience staying here.",
      imageUrl: "https://example.com/user4.jpg",
      stars: 4,
      name: "David Wilson",
      country: "Australia",
      city: "Sydney",
      anciennete: "4 months ago"
    },
    {
      id: 5,
      text: "The host was very accommodating and the apartment was clean and comfortable.",
      imageUrl: "https://example.com/user5.jpg",
      stars: 5,
      name: "Emma Thomas",
      country: "France",
      city: "Paris",
      anciennete: "5 months ago"
    },
    {
      id: 6,
      text: "Fantastic stay! Everything was as described and the location was perfect.",
      imageUrl: "https://example.com/user6.jpg",
      stars: 5,
      name: "Fiona Davis",
      country: "Germany",
      city: "Berlin",
      anciennete: "6 months ago"
    },
    {
      id: 7,
      text: "We enjoyed our stay very much. The apartment is stylish and comfortable.",
      imageUrl: "https://example.com/user7.jpg",
      stars: 4,
      name: "George Martin",
      country: "Italy",
      city: "Rome",
      anciennete: "7 months ago"
    },
    {
      id: 8,
      text: "Great value for money. The place was clean and the host was very friendly.",
      imageUrl: "https://example.com/user8.jpg",
      stars: 5,
      name: "Hannah White",
      country: "Spain",
      city: "Madrid",
      anciennete: "8 months ago"
    },
    {
      id: 9,
      text: "The apartment was exactly as shown in the pictures. Very comfortable stay.",
      imageUrl: "https://example.com/user9.jpg",
      stars: 5,
      name: "Ian Green",
      country: "Netherlands",
      city: "Amsterdam",
      anciennete: "9 months ago"
    },
    {
      id: 10,
      text: "Nice place, good location, and the host was very helpful. Would recommend.",
      imageUrl: "https://example.com/user10.jpg",
      stars: 4,
      name: "Julia Brown",
      country: "Switzerland",
      city: "Zurich",
      anciennete: "10 months ago"
    },
    {
      id: 11,
      text: "The apartment was cozy and had all the amenities we needed. Great stay overall.",
      imageUrl: "https://example.com/user11.jpg",
      stars: 4,
      name: "Karen Black",
      country: "Sweden",
      city: "Stockholm",
      anciennete: "11 months ago"
    },
    {
      id: 12,
      text: "We had a lovely time. The location is superb and the host was very attentive.",
      imageUrl: "https://example.com/user12.jpg",
      stars: 5,
      name: "Liam Brown",
      country: "Norway",
      city: "Oslo",
      anciennete: "1 year ago"
    },
    {
      id: 13,
      text: "Excellent place to stay. Very clean and the host was super friendly.",
      imageUrl: "https://example.com/user13.jpg",
      stars: 5,
      name: "Mia Wilson",
      country: "Denmark",
      city: "Copenhagen",
      anciennete: "1 year ago"
    },
    {
      id: 14,
      text: "Good location, comfortable bed, and well-equipped kitchen. Would stay again.",
      imageUrl: "https://example.com/user14.jpg",
      stars: 4,
      name: "Noah Johnson",
      country: "Finland",
      city: "Helsinki",
      anciennete: "1 year ago"
    },
    {
      id: 15,
      text: "The apartment was perfect for our needs. Quiet neighborhood and close to public transport.",
      imageUrl: "https://example.com/user15.jpg",
      stars: 5,
      name: "Olivia Martinez",
      country: "Portugal",
      city: "Lisbon",
      anciennete: "1 year ago"
    },
    {
      id: 16,
      text: "We had a fantastic stay. The apartment is modern and very comfortable.",
      imageUrl: "https://example.com/user16.jpg",
      stars: 5,
      name: "Paul Lee",
      country: "Belgium",
      city: "Brussels",
      anciennete: "1 year ago"
    },
    {
      id: 17,
      text: "Very nice place with a lot of space. The host was very accommodating.",
      imageUrl: "https://example.com/user17.jpg",
      stars: 4,
      name: "Quinn Kim",
      country: "Austria",
      city: "Vienna",
      anciennete: "1 year ago"
    },
    {
      id: 18,
      text: "The place was clean, well-located, and the host was extremely helpful.",
      imageUrl: "https://example.com/user18.jpg",
      stars: 5,
      name: "Riley Davis",
      country: "Ireland",
      city: "Dublin",
      anciennete: "1 year ago"
    },
    {
      id: 19,
      text: "Great experience. The apartment had everything we needed and more.",
      imageUrl: "https://example.com/user19.jpg",
      stars: 5,
      name: "Sophia Nguyen",
      country: "Greece",
      city: "Athens",
      anciennete: "1 year ago"
    },
    {
      id: 20,
      text: "Nice and cozy place. Close to shops and restaurants. Would recommend.",
      imageUrl: "https://example.com/user20.jpg",
      stars: 4,
      name: "Thomas Brown",
      country: "Hungary",
      city: "Budapest",
      anciennete: "1 year ago"
    },
    {
      id: 21,
      text: "The apartment was very clean and well-maintained. We enjoyed our stay.",
      imageUrl: "https://example.com/user21.jpg",
      stars: 4,
      name: "Ursula Smith",
      country: "Spain",
      city: "Madrid",
      anciennete: "2 years ago"
    },
    {
      id: 22,
      text: "Perfect location and the host was very friendly and helpful.",
      imageUrl: "https://example.com/user22.jpg",
      stars: 5,
      name: "Victor Adams",
      country: "France",
      city: "Paris",
      anciennete: "2 years ago"
    },
    {
      id: 23,
      text: "We had a wonderful time. The apartment had everything we needed.",
      imageUrl: "https://example.com/user23.jpg",
      stars: 5,
      name: "Wendy Brown",
      country: "Germany",
      city: "Berlin",
      anciennete: "2 years ago"
    },
    {
      id: 24,
      text: "Great value for money. The place was clean and comfortable.",
      imageUrl: "https://example.com/user24.jpg",
      stars: 4,
      name: "Xavier Clark",
      country: "Netherlands",
      city: "Amsterdam",
      anciennete: "2 years ago"
    },
    {
      id: 25,
      text: "The host was very accommodating and the apartment was in a great location.",
      imageUrl: "https://example.com/user25.jpg",
      stars: 5,
      name: "Yara Davis",
      country: "Italy",
      city: "Rome",
      anciennete: "2 years ago"
    },
    {
      id: 26,
      text: "We loved our stay here. The apartment was spacious and clean.",
      imageUrl: "https://example.com/user26.jpg",
      stars: 5,
      name: "Zane Evans",
      country: "Switzerland",
      city: "Zurich",
      anciennete: "2 years ago"
    },
    {
      id: 27,
      text: "Very nice apartment. Close to all the main attractions.",
      imageUrl: "https://example.com/user27.jpg",
      stars: 4,
      name: "Alice Foster",
      country: "Portugal",
      city: "Porto",
      anciennete: "2 years ago"
    },
    {
      id: 28,
      text: "The place was perfect for our family vacation. Highly recommend.",
      imageUrl: "https://example.com/user28.jpg",
      stars: 5,
      name: "Brian Garcia",
      country: "Sweden",
      city: "Gothenburg",
      anciennete: "2 years ago"
    },
    {
      id: 29,
      text: "Amazing apartment. Very clean and the host was super helpful.",
      imageUrl: "https://example.com/user29.jpg",
      stars: 5,
      name: "Catherine Harris",
      country: "Norway",
      city: "Bergen",
      anciennete: "2 years ago"
    },
    {
      id: 30,
      text: "We had a great stay. The apartment was well-equipped and in a good location.",
      imageUrl: "https://example.com/user30.jpg",
      stars: 4,
      name: "David Johnson",
      country: "Denmark",
      city: "Aarhus",
      anciennete: "2 years ago"
    }
  ];
  
  export default comments;

  export const steps = [
    {
      title: 'Browse Listings',
      description: 'Search through our extensive database of properties with advanced filters to find exactly what you’re looking for.',
      icon: '📍',
    },
    {
      title: 'Schedule a Viewing',
      description: 'Book a property viewing directly through the app and see your future home in person.',
      icon: '📅',
    },
    {
      title: 'Make an Offer',
      description: 'Submit your offer on properties and communicate directly with sellers through our secure platform.',
      icon: '💬',
    },
    {
      title: 'Close the Deal',
      description: 'Complete the purchase or rental process with the help of our expert team and streamline the paperwork.',
      icon: '✍️',
    },
  ];
  
  
  export const uniquePoints = [
    {
      title: 'Verified Listings',
      description: 'All our listings are verified to ensure you get accurate and trustworthy information.',
      icon: '✔️',
    },
    {
      title: 'Easy Search',
      description: 'Our advanced search features allow you to find properties that perfectly match your criteria.',
      icon: '🔍',
    },
    {
      title: 'Customer Support',
      description: 'Our dedicated support team is available 24/7 to assist you with any queries or issues.',
      icon: '📞',
    },
    {
      title: 'Virtual Tours',
      description: 'Explore properties through immersive virtual tours right from the comfort of your home.',
      icon: '🖥️',
    },
  ];
  