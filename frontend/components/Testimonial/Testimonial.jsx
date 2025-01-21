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
    name: "Sarah J.",
    location: "Delhi",
    image: "./userImage.jpg",
  },
  {
    feedback: "The plants were so well-packed, and the quality is amazing. Definitely ordering again!",
    name: "Rahul S.",
    location: "Mumbai",
    image: "https://imgs.search.brave.com/8bpuWMBJVZ9iDzRpbMkSYvQtDxeSkxw7zvr5su0y6eo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/Njk0NDM3Ni9waG90/by93b21hbi10YWtl/LWNhcmUtb2YtY3lw/cmVzcy1wbGFudHMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXdiUnl3U05Yd05W/YlRlYjBMVVo0Zk5K/ZEVwRjF4d2c5am1K/ZkV0MU1qaWM9",
  },
  {
    feedback: "Great variety and excellent service. My home looks vibrant now. Thank you so much!",
    name: "Priya K.",
    location: "Bangalore",
    image: "https://imgs.search.brave.com/no_mUQXYY0P88gKQGEZ1v5zkA4kA5M2q3GMCkEVYjXo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/NTQ0NzY4Ny9waG90/by90YWtpbmctY2Fy/ZS1vZi1teS1wbGFu/dHMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWxRT2tUdy04/OC1STEIybm41Vmhu/c01QaXB1QWVteHc0/S1dhSVBoSmFBMzQ9",
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
              <h4 className={styles.feedbackAuthorLocation}>
                {testimonial.location}
              </h4>
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
