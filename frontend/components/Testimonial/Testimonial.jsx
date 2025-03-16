// import React, { useState } from 'react';
// import styles from './Testimonial.module.css';

// const testimonials = [
//   {
//     text: "I love my new plants! They arrived in perfect condition and have added so much life to my home. Thank you!",
//     author: "Sarah J.",
//     location: "Delhi",
//     image: "./userImage.jpg",
//   },
//   {
//     text: "The plants are absolutely stunning, and the packaging was fantastic. Highly recommend this shop!",
//     author: "John D.",
//     location: "Mumbai",
//     image: "./userImage2.jpg",
//   },
//   {
//     text: "Amazing service and beautiful plants! They have truly transformed my living space.",
//     author: "Priya K.",
//     location: "Bangalore",
//     image: "./userImage3.jpg",
//   },
// ];

// const Testimonial = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const { text, author, location, image } = testimonials[currentIndex];

//   return (
//     <div className={styles.testimonialBox}>
//       <h2 className={styles.testimonialTitle}>What Our Customers Say</h2>
//       <div className={styles.testimonialContainer}>
//         <p className={styles.feedbackText}>"{text}"</p>
//         <div className={styles.feedbackAuthorDetails}>
//           <img src={image} alt={author} />
//           <h3 className={styles.feedbackAuthor}>- {author}</h3>
//           <h4 className={styles.feedbackAuthorLocation}>{location}</h4>
//         </div>
//       </div>
//       <div className={styles.carouselControls}>
//         <button className={styles.carouselButton} onClick={handlePrev}>
//           ❮
//         </button>
//         <button className={styles.carouselButton} onClick={handleNext}>
//           ❯
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;



import React, { useState } from 'react';
import styles from './Testimonial.module.css';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


const testimonials = [
  {
    feedback: "I love my new plants! They arrived in perfect condition and have added so much life to my home. Thank you!",
    name: "Prateek",
    location: "Delhi",
    image: "/prateek.jpeg",
  },
  {
    feedback: "The plants were so well-packed, and the quality is amazing. Definitely ordering again!",
    name: "Shikha Dharwari",
    location: "Mumbai",
    image: "/shikha.jpeg",
  },
  {
    feedback: "Great variety and excellent quality. My home looks vibrant now. Thank you so much!",
    name: "Renuka Jain",
    location: "Bangalore",
    image: "/renuka.jpeg",
  },
  {
    feedback: "This setup helps me teach my fellow classmates and school about sustainability and water conservation.",
    name: "Evana",
    location: "Bangalore",
    image: "/evana.jpeg",
  },
  {
    feedback: "Farming products of samvrikha have allowed my child to eat healthy as the produce is pesticide-free.",
    name: "Neha Pareikh",
    location: "Bangalore",
    image: "/neha.jpeg",
  },
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className={styles.testimonialBox}>
        <h2 className={styles.testimonialTitle}>What Our Customers Say</h2>
      <button
        className={`${styles.carouselButton} ${styles.left}`}
        onClick={handlePrev}
      >
       <FaChevronLeft />
      </button>
      <div className={styles.testimonialContainer}>

        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={styles.testimonialSlide}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <p className={styles.feedbackText}>{testimonial.feedback}</p>
            <div className={styles.feedbackAuthorDetails}>
              <img src={testimonial.image} alt={testimonial.name} />
              <h3 className={styles.feedbackAuthor}>- {testimonial.name}</h3>
              {/* <h4 className={styles.feedbackAuthorLocation}>
                {testimonial.location}
              </h4> */}
            </div>
          </div>
        ))}
      </div>
      <button
        className={`${styles.carouselButton} ${styles.right}`}
        onClick={handleNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Testimonial;
