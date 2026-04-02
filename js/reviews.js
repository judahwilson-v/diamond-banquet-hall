// Fallback seed reviews for public rendering if the hosted data service is unavailable.
// Cloudflare D1 becomes the source of truth once the database is configured.

export const fallbackReviews = [
  {
    id: "fallback-review-1",
    name: "Rajan & Priya",
    event: "Wedding",
    date: "March 2025",
    text: "The hall was stunning and the staff were so helpful throughout. Our wedding day was perfect. Highly recommend Diamond Banquet Hall to everyone in Perumbavoor."
  },
  {
    id: "fallback-review-2",
    name: "Suresh Nair",
    event: "Reception",
    date: "January 2025",
    text: "Excellent venue, very well maintained and spacious. The valet parking was smooth and all our guests were impressed. Will definitely book again."
  },
  {
    id: "fallback-review-3",
    name: "Anjali Thomas",
    event: "Engagement",
    date: "November 2024",
    text: "Beautiful hall, affordable price, and wonderful service. The rooms were clean and comfortable for our out-of-town guests. Truly a premium experience."
  },
  {
    id: "fallback-review-4",
    name: "Mohammed Rashid",
    event: "Birthday Celebration",
    date: "October 2024",
    text: "Booked for my daughter's birthday. The team was cooperative and flexible. Decor came out beautifully in this space. Very happy with the overall experience."
  },
  {
    id: "fallback-review-5",
    name: "Lekha & Arun",
    event: "Wedding",
    date: "September 2024",
    text: "From the first enquiry to the final day, everything was seamless. The hall looked absolutely royal. Our guests could not stop complimenting the venue."
  }
];
