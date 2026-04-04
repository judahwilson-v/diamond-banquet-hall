// Curated homepage testimonials used by the public reviews section.
// Supabase review management remains available elsewhere in the project.

export const curatedTestimonials = [
  {
    id: "testimonial-muhammed-sali",
    name: "Muhammed Sali",
    text: "Diamond Banquet Hall is a fantastic venue, perfect for hosting gatherings of up to 500 guests. The spacious hall is fully air-conditioned, ensuring comfort for all attendees. One of its standout features is the ample parking space, which makes it convenient for guests arriving by car. Its location is easy to spot from the main road, and the availability of outdoor seating adds a nice touch for those who prefer open-air arrangements. The staff is friendly and accommodating, contributing to a seamless experience. The hall is well-maintained, reflecting attention to detail. Additionally, rooms are available for daily rent, providing a convenient stay option for out-of-town guests."
  },
  {
    id: "testimonial-jeeson-varghese",
    name: "Jeeson Varghese",
    text: "We recently had the pleasure of hosting my engagement reception at Diamond Banquet Hall and I must say, it was an unforgettable experience. The venue itself is very beautiful, neat, with ambient interiors and an ambiance that set the tone for a perfect party. But what truly made our experience stand out was the outstanding service provided there. Ample car parking, neat and hygienic washrooms, spacious dining area, and arrangements need to be highlighted. I would highly recommend this venue to anyone looking for a wedding venue that offers exceptional service, stunning ambiance, and unforgettable memories."
  },
  {
    id: "testimonial-sreerag-r",
    name: "Sreerag R.",
    text: "Five stars for the exceptional experience at Diamond Banquet Hall. Our engagement was perfect, thanks to their superb facilities. The ample and decent parking for about 50 to 70 cars, complete with security, was a stress-free start. Inside, the soundproof premium interior hall allowed for a flawless ceremony, and the ground-floor dining area made it incredibly convenient for all our guests. Impeccable service and a truly elegant venue. Highly recommend. The owner of the hall was present throughout the event in order to help with any shortcomings. The hall is located just behind the BP petrol pump on the roadside."
  },
  {
    id: "testimonial-sabu-paul",
    name: "Sabu Paul",
    text: "Excellent, well-maintained banquet hall in town with easy access to transportation. The banquet hall is good for hosting 200 to 300 people."
  },
  {
    id: "testimonial-anwar-sadath",
    name: "Anwar Sadath",
    text: "താഴെയുള്ള ചെറിയ ഓഡിറ്റോറിയത്തിലെ പരിപാടിയിലാണ് പങ്കെടുത്തത് 50 നും 100 നും ഇടയിലുള്ള ആളുകൾക്ക് പങ്കെടുക്കാൻ പാകത്തിനുള്ള സ്ഥലം.",
    translation:
      "Attended a program in the smaller auditorium below; it is a suitable space for 50 to 100 people."
  },
  {
    id: "testimonial-vinu-vijay",
    name: "Vinu Vijay",
    text: "Spacious and neatly maintained venue. Good place for wedding functions and nice atmosphere with good parking facility."
  },
  {
    id: "testimonial-afsal-k",
    name: "Afsal K.",
    text: "Good hall for marriage functions. Main advantage is parking space, and it is right on the roadside, so it is easy to find for guests coming from far away. The A/C was working perfectly even though it was very crowded inside."
  },
  {
    id: "testimonial-justin-george",
    name: "Justin George",
    text: "Actually a very decent place for the price. We conducted a small family get-together here last month. The dining area is separate, so there is no smell of food inside the main hall, which is a big plus. Staff are very helpful."
  },
  {
    id: "testimonial-faris-mohammed",
    name: "Faris Mohammed",
    text: "Premium-feel interiors and lighting are very good for photography. We had no issues with the power because they have a good backup generator. The owner is a nice person and personally takes care of things."
  },
  {
    id: "testimonial-sreejith-s",
    name: "Sreejith S.",
    text: "The hall is soundproof, so outside noise does not disturb the function. The parking area is big enough for 50+ cars and they have security to manage the traffic. Very neat toilets also."
  },
  {
    id: "testimonial-midhun-murali",
    name: "Midhun Murali",
    text: "Nice atmosphere and budget friendly. It is located just behind the petrol pump. Good for engagement or reception with 300 to 400 people. Overall, a satisfied experience."
  }
];

export const fallbackReviews = curatedTestimonials.map((item, index) => ({
  id: `fallback-review-${index + 1}`,
  name: item.name,
  event: "Google Review",
  date: "Guest Feedback",
  text: item.translation ? `${item.text} ${item.translation}` : item.text
}));
