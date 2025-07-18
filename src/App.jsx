import React, { useState, useEffect } from 'react';

import { Menu, X, Phone, Mail, MapPin, Star, Users, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// Add this after your imports and before the main App component
const ImageSlideshow = ({ images, autoPlay = true, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
   <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">

      {/* Main Image Display */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              className="w-full h-full object-contain bg-amber-500"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

// Header Component
const Header = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            {/* Option 1: Using logo from public folder */}
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              <img 
                src="\logo-alpha-consulting-ke.jpg" 
                alt="Alpha Coaching KE Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't exist - show initials
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback logo with gold background */}
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-xl">AG</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alpha Group KE</h1>
              <p className="text-sm text-gray-600">Professional Therapy Services</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium ${
                  currentPage === item.id
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  // Add this at the top of your App.jsx file, after the other imports
  // import { ChevronLeft, ChevronRight } from 'lucide-react';
  

  // State for modal
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Slideshow images - you can add more images here
  const slideImages = [
    {
      src: "/logo-alpha-consulting-ke.jpg",
      alt: "Alpha Consulting KE Logo",
      caption: "Welcome to Alpha Consulting KE - Your transformation journey begins here"
    },
    {
      src: "/personal couch.jpg",
      alt: "personal trauma couching",
      caption: "Join our monthly trauma healing sessions - Every woman is invited to the healing table"
    },
    {
      src: "/relationship couch.jpg",
      alt: "relationship trauma couching",
      caption: "Join our monthly trauma healing sessions - Every woman is invited to the healing table"
    },
    {
      src: "/mother wound.jpg",
      alt: "relationship trauma couching",
      caption: "Join our monthly trauma healing sessions - Every woman is invited to the healing table"
    },
    {
      src: "/adult book club.jpg",
      alt: "relationship trauma couching",
      caption: "Join and connect with other passionate, like-minded individuals"
    },
    {
      src: "/child couch.jpg",
      alt: "Psalm 139",
      caption: "You are fearfully and wonderfully made - Psalm 139"
    }
  ];


  
  // Questions data with answers
  const questionsData = [
    {
      question: "Are my relationships thriving, or do I self-sabotage?",
      answer: "If you find yourself pushing people away or creating conflict in your relationships, you might be stuck in self-sabotaging patterns. These often stem from past experiences or fear of vulnerability.",
      actionText: "Get help building healthier relationships"
    },
    {
      question: "Is my work negatively affected by cycles that I just can't seem to break?",
      answer: "Recurring workplace challenges often reflect deeper patterns related to self-worth, boundary-setting, or unresolved personal issues that impact your professional life.",
      actionText: "Break through work-related barriers"
    },
    {
      question: "Do I feel like some childhood experiences are constantly triggered in my life?",
      answer: "Childhood experiences shape our adult responses. When past traumas are triggered repeatedly, it's a sign that healing work can help you move forward with greater freedom.",
      actionText: "Start your healing journey"
    },
    {
      question: "As a leader, am I equipped to manage the teams I work with during crisis moments?",
      answer: "Leadership during crisis requires emotional intelligence, clear communication, and the ability to remain calm under pressure. These skills can be developed through intentional coaching and practice.",
      actionText: "Develop your leadership skills"
    },
    {
      question: "As a parent, am I intentionally helping my child fill any learning gaps they might be facing academically?",
      answer: "Every child learns differently. Identifying and addressing learning gaps requires understanding your child's unique needs and finding the right support strategies.",
      actionText: "Get parenting support"
    },
    {
      question: "Do I feel like I am parenting negatively? Do I constantly feel defeated, implosive or explosive about parenting?",
      answer: "Parenting challenges often trigger our own childhood experiences. Feeling overwhelmed or reactive doesn't make you a bad parent—it means you could benefit from support and healing.",
      actionText: "Transform your parenting approach"
    }
  ];

  // Helper functions
  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
  };

 // Update the handleContactRedirect function:
  const handleContactRedirect = () => {
    //setSelectedQuestion(null); // Close the modal
    setCurrentPage('contact'); // Navigate to contact page
  };


  
  



  return (
    <>
      {/* Hero Section with Slideshow */}
      <section className="bg-gradient-to-r from-amber-600 to-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo and Main Heading */}
          {/*<div className="text-center mb-12">
            
            {<h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Alpha Consulting KE
            </h1>}
           
          </div>*/ }

          {/* Image Slideshow */}
          <div className="mb-8">
            <ImageSlideshow images={slideImages} autoPlay={true} autoPlayInterval={6000} />
          </div>

          <div className="text-center">
           
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
              <p className="mb-4">
                The intangible or unseen parts of our lives - childhood experiences, relationships, and personal experiences that we are 'stuck' in - often remain unnoticed, unmentioned, or undervalued.
              </p>
              <p className="mb-4">
                Our role is to support you to stand strong. We help ensure you are not 'pulled down' by intangible or unseen experiences that have previously held you back.
              </p>
              <p className="text-amber-600 font-semibold text-xl">
                Transformation begins when you say 'YES!' to intentionally engage to meet the best version of your future self.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Self-Assessment Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions to Ask Yourself</h2>
            <p className="text-gray-600 text-lg">Click on any question to explore it further</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {questionsData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600 cursor-pointer hover:shadow-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => handleQuestionClick(index)}
              >
                <p className="text-gray-700 font-medium">{item.question}</p>
                <div className="mt-3 text-amber-600 text-sm font-semibold">
                  Click to explore →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Amaze-ing Mom Program */}
      <section className="py-16 bg-amber-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What's NEW?!</h2>
      <h3 className="text-2xl font-semibold text-amber-600 mb-6">Amaze-ing Mom Program</h3>
      <p className="text-xl text-gray-600 mb-4">Every month in 2025 is trauma healing month.</p>
      <p className="text-lg text-gray-700 mb-8">Every woman is invited to the online webinar dubbed 'healing table' with Coach Moriah.</p>
    </div>

    {/*<div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h4 className="text-xl font-bold text-gray-900 mb-2">February Theme</h4>
        <p className="text-amber-600 font-semibold">Unwinding the cord of trauma</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h4 className="text-xl font-bold text-gray-900 mb-2">March Theme</h4>
        <p className="text-amber-600 font-semibold">Understanding trauma and starting from the middle</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h4 className="text-xl font-bold text-gray-900 mb-2">April Theme</h4>
        <p className="text-amber-600 font-semibold">Mother wound</p>
      </div>
    </div>

    {/* Mother Wound Section with Flier */}
    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h4 className="text-2xl font-bold text-gray-900 mb-4">July Special: Mother Wound Healing</h4>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">Join us for a transformative session focused on healing the mother wound - one of the most profound healing journeys a woman can undertake.</p>
          <p>This session will help you understand, process, and begin healing generational patterns that may be affecting your relationships, parenting, and self-worth.</p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <img 
          src="/mother wound flier.jpg" 
          alt="Mother Wound Healing Session Flier" 
          className="w-full max-w-md h-auto rounded-lg shadow-lg"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="hidden bg-amber-100 border-2 border-amber-600 rounded-lg p-8 text-center max-w-md">
          <h5 className="text-xl font-bold text-amber-700 mb-2">Mother Wound Healing</h5>
          <p className="text-amber-600">Special healing session - July 2025</p>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Join the Healing Table</h4>
      <div className="space-y-4 text-gray-700">
        <p><strong>Schedule:</strong> Every 2nd and 3rd Saturday at 7:00 PM GMT</p>
        <p><strong>Payment:</strong> MPESA Express to 254-710484899</p>
        <p><strong>Paybill:</strong> 595607 Account: Amaze-ing Mom</p>
        
        <div className="mt-6">
          <h5 className="font-semibold mb-2">You will need:</h5>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>A notebook and pen</li>
            <li>Water or other preferred drink</li>
            <li>Look your best (Wear something nice that you haven't worn in a while, and perfume!)</li>
          </ul>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://forms.gle/a4RezeUf7TaqKXY76" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-block px-8 py-3"
          >
            Register Here
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


 {/* Modal Popup */}
      {selectedQuestion !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 pr-8">
                {questionsData[selectedQuestion].question}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {questionsData[selectedQuestion].answer}
                </p>
              </div>

              {/* Call to Action */}
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <p className="text-amber-800 font-semibold mb-3">
                  Ready to take the next step?
                </p>
                <p className="text-amber-700 text-sm">
                  We're here to support you on your transformation journey. Let's discuss how we can help you move forward.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleContactRedirect}
                  className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  {questionsData[selectedQuestion].actionText}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}      
    </>
  );
};


// About Page Component
const AboutPage = () => {
  // Images for slideshow sections
  const moriahImages = [
    {
      src: "/about profile pic.jpg",
      alt: "Moriah - Founder of Alpha Group KE",
      caption: "Moriah - Multi-gifted businesswoman passionate about Personal Development and Healing Trauma"
    }
  ];

  const servicesImages = [
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2022/05/flier-lip-reasons-.jpg",
      alt: "LIP Program Benefits",
      caption: "Learning Intervention Program - Transforming lives in hours"
    }
  ];

  const programLogos = [
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2022/02/mwanicole-logo.jpg",
      alt: "Mwanicole Consultants Logo",
      caption: "Mwanicole Consultants - Education and Psychology"
    },
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2022/02/alpha-full-logo-1.jpg",
      alt: "Alpha Group Full Logo",
      caption: "Alpha Group - Transformational Recovery"
    },
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2022/02/bella-borsa-logo-2.jpg",
      alt: "Bella Borsa Logo",
      caption: "Bella Borsa Consultants - Image Consultancy"
    }
  ];

  const eventImages = [
    {
      src: "/birthday-pic.jpg",
      alt: "Birthday Event",
      caption: "Professional MC services for birthday celebrations"
    },
    {
      src: "/graduation photo alpha group.jpg",
      alt: "Graduation Event",
      caption: "Graduation ceremonies and milestone celebrations"
    },
    {
      src: "/strathmore address.jpg",
      alt: "Graduation Event",
      caption: "Graduation ceremonies and milestone celebrations"
    },
    {
      src: "/mc.jpg",
      alt: "Kids Birthday Party",
      caption: "Specialized kids' events with the 'midas touch'"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Alpha Group KE</h1>
          <h2 className="text-2xl text-amber-600 font-semibold mb-4">
            Transformational Recovery for Women and Children: A Holistic Approach
          </h2>
        </div>

        {/* Moriah's Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <ImageSlideshow images={moriahImages} autoPlay={false} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Meet Moriah</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Moriah is a multi-gifted businesswoman with a passion for Personal Development and Healing Trauma. 
                She is also passionate about Learning processes and Community Development using an Eclectic Psychology approach.
              </p>
              <p>
                She holds a Degree in Life Coaching and is pursuing her studies as a{' '}
                <a href="https://www.eaipc.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
                  Counsellor
                </a>{' '}
                and{' '}
                <a href="https://www.usiu.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
                  Psychologist
                </a>.
              </p>
              <p>
                Moriah is an alumnus of{' '}
                <a href="https://strathmore.edu/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
                  Strathmore University
                </a>, where she took an Accelerated Business Course that transformed her business.
              </p>
              <p>
                Based in Nairobi, Kenya, she has the joy of working with children with learning disabilities and those 
                with learning gaps due to the negative effects of various life experiences. She has done Pro bono Coaching 
                for Moringa School with excellent results for the students.
              </p>
              <p>
                She is a certified 'White belt' of Lean Six Sigma. She benefits from the Cherie Blair Foundation and has 
                received valuable mentorship from Cheryl Pullins and Naomi McLaughlan.
              </p>
            </div>
          </div>
        </div>


        {/* Events MC Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Events MC Services</h3>
            <h4 className="text-xl text-amber-600 font-semibold mb-2">What's an event without an MC?</h4>
            <p className="text-lg text-gray-600">Your anxiety ends here!</p>
            <p className="text-lg text-gray-700 mt-4">
              Moriah has a 'midas touch' for kids' events (new-born, graduation, pediatric care hospitalization, 
              infant maternal death, birthdays, baptism, baby dedication, and more)
            </p>
          </div>
          
          <ImageSlideshow images={eventImages} autoPlay={true} autoPlayInterval={5000} />
        </div>


        {/* Media Features Section */}
        <div className="bg-amber-50 p-8 rounded-lg mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Media Features & Recognition</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">TV & Media Appearances</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.youtube.com/watch?v=MdTnJTvnXpY&feature=youtu.be" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-amber-600 hover:text-amber-700">
                    Ebru TV - Importance of an Image Consultant
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=eUz60PEX0no&t=66s" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-amber-600 hover:text-amber-700">
                    Ebru TV - Widows in Kenya and beyond
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/watch/live/?ref=search&v=2212548072103552" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-amber-600 hover:text-amber-700">
                    Niusline TV - Successful parenting
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Publications & Awards</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://parentsafrica.com/nicole-ngigi-helping-widows-rebuild-their-lives/" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-amber-600 hover:text-amber-700">
                    Parents Africa Magazine - Helping widows rebuild their lives
                  </a>
                </li>
                <li>
                  <a href="https://m.facebook.com/RisingStarKenya/" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-amber-600 hover:text-amber-700">
                    CFC Stanbic Rising Star Kenya - Professional Services Category Finalist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-lg text-gray-600 mb-6">Join our mailing list for the latest updates and resources</p>
          <a 
            href="https://forms.gle/cnSmGWsxg3F8wBPs8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-block px-8 py-3"
          >
            Join Our Mailing List
          </a>
        </div>

        {/* Training Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Training for Lasting Transformation</h3>
            <p className="text-lg text-gray-600 mb-6 max-w-4xl mx-auto">
              Nicole's method of teaching has had an astounding impact. She would like children in Africa and 
              beyond to enjoy the same experience. This training is an opportunity for Educators to learn about 
              alternative learning solutions for children in the classroom and beyond.
            </p>
            <a 
              href="https://forms.gle/s7ccJzZeicrFXyYS7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-block px-8 py-3"
            >
              Sign Up for Training
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Services Page Component
const ServicesPage = () => {
  // Service program images
  const programImages = [
    {
      src: "/transform lives in hours.jpg",
      alt: "LIP Program Benefits",
      caption: "Learning Intervention Program - Transforming lives in hours"
    }
  ];

  const programLogos = [
    {
      src: "/child talk.jpg",
      alt: "Mwanicole Consultants Logo",
      caption: "Mwanicole Consultants - Education and Psychology"
    },
    {
      src: "/annual-writing-workshop-pic.jpg",
      alt: "Alpha Group Full Logo",
      caption: "Alpha Group - Transformational Recovery"
    },
    {
      src: "/child education.jpg",
      alt: "Mwanicole Consultants Logo",
      caption: "How to book a child consultation."
    },
    {
      src: "/english lessons for kids.jpg",
      alt: "Mwanicole Consultants Logo",
      caption: "Child education-English Lessons For Diplomat Kids."
    },
    {
      src: "/education kikuyu for kids.jpg",
      alt: "Mwanicole Consultants Logo",
      caption: "Child education- Kikuyu Lessons For Kids."
    },
    {
      src: "/bella-borsa-logo-2.jpg",
      alt: "Bella Borsa Logo",
      caption: "Bella Borsa Consultants - Image Consultancy"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
          <h2 className="text-2xl text-amber-600 font-semibold mb-4">
            Transformational Recovery for Women and Children: A Holistic Approach
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Alpha Group, our services encompass a holistic approach. We focus on life, purpose, and service 
            to the child and adult to impact the community positively. We value excellence and intentional 
            approaches towards the success of our clients.
          </p>
        </div>

        {/* Main Service Promise */}
        <div className="bg-amber-50 p-8 rounded-lg mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-amber-600 mb-4">
              Helping your child Learn.Transform.Repeat ……. in hours!
            </h3>
            <blockquote className="text-lg italic text-gray-700 mb-6">
              "Education is not the learning of facts, but the training of the mind to think."
              <footer className="text-sm text-gray-600 mt-2">— Albert Einstein</footer>
            </blockquote>
            <p className="text-xl font-semibold text-amber-600 mb-4">
              Children and adults experience a full transformation in hours!
            </p>
          </div>
        </div>

        {/* Transformation Services Overview */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Transformation in Hours</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Our services are ideal for struggling learners. They are also suitable for adults interested in 
                closing any learning gaps. These gaps may have been experienced along their learning or life journey.
              </p>
              <p>
                The LIP (Learning Intervention Program) has restored the 'alpha' state of the children we have 
                worked with. It has helped them continue with their learning journey completely transformed!
              </p>
              <p>
                The Masterpiece Program continues to elevate individuals to seek and attain their highest and 
                best possible outcomes.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                Choosing Alpha Group KE is one of the best decisions our clients have made; make yours today!
              </p>
            </div>
          </div>
          <div>
            <ImageSlideshow images={programImages} autoPlay={false} />
          </div>
        </div>

        {/* Service Divisions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Service Divisions</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-amber-600 mb-3">Bella Borsa Consultants</h4>
              <p className="text-gray-600 mb-4">
                An image consultancy that guides individuals and teams seeking successful transitions through 
                <span className="font-semibold text-amber-600"> #intentional living</span>
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Services:</strong></p>
                <ul className="text-left space-y-1">
                  <li>• Success Mindset Development</li>
                  <li>• Intentional Living Coaching</li>
                  <li>• Personal Image Consulting</li>
                  <li>• Leadership Transitions</li>
                
                  <li>
                <a
                  href="https://youtube.com/@bellaborsaconsultants?si=6dWzjtvVIsGnuEHK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-amber-400 transition-colors duration-200"
                >
                  <b>Youtube Link: @bellaborsaconsultants</b>
                </a>
              </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-amber-600 mb-3">Mwanicole Consultants</h4>
              <p className="text-gray-600 mb-4">
                A consulting firm in matters of Education and Psychology. Our clients enjoy 
                <span className="font-semibold text-amber-600"> #howtolearn</span>
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Services:</strong></p>
                <ul className="text-left space-y-1">
                  <li>• Learning Intervention Program (LIP)</li>
                  <li>• Educational Consultancy</li>
                  <li>• Learning Gap Assessment</li>
                  <li>• Trauma-Informed Learning</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-amber-600 mb-3">Knowell Book Busters</h4>
              <p className="text-gray-600 mb-4">
                A learner's experience based on their academic or developmental need towards desired outcomes.
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Services:</strong></p>
                <ul className="text-left space-y-1">
                  <li>• Kids Book Club</li>
                  <li>• Writing Workshops</li>
                  <li>• Reading Intervention</li>
                  <li>• Academic Support</li>
                  <a
                  href="https://youtube.com/@knowellbookbusters6516?si=L1-9HA3Q8kD7w7dt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-amber-400 transition-colors duration-200"
                >
                  <b>Youtube Link: @knowellbookbusters</b>
                </a>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Logos Slideshow */}
          <div className="mb-8">
            <ImageSlideshow images={programLogos} autoPlay={true} autoPlayInterval={4000} />
          </div>
        </div>

        {/* New Services from Website */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Additional Services</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-amber-600 mb-3">Trauma Recovery Coaching</h4>
              <p className="text-gray-600 mb-4">
                Specialized support for post-trauma recovery and healing, helping individuals break cycles 
                and move towards their best future self.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Individual trauma therapy</li>
                <li>• Relationship healing</li>
                <li>• Childhood trauma recovery</li>
                <li>• Crisis management for leaders</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-amber-600 mb-3">Parenting Support</h4>
              <p className="text-gray-600 mb-4">
                Intentional parenting guidance to help fill learning gaps and support healthy 
                child development academically and emotionally.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Learning gap assessment</li>
                <li>• Academic support strategies</li>
                <li>• Positive parenting techniques</li>
                <li>• Family dynamics improvement</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-amber-600 mb-3">Online Healing Webinars</h4>
              <p className="text-gray-600 mb-4">
                Monthly "Healing Table" webinars covering various trauma healing topics 
                for women's empowerment and recovery.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Unwinding trauma cords</li>
                <li>• Understanding trauma patterns</li>
                <li>• Mother wound healing</li>
                <li>• Monthly group sessions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Introduction Forms Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h3>
            <p className="text-lg text-gray-600 mb-6">
              Please introduce yourself and let us know exactly what you would like us to offer you. 
              This clarifies your need and helps us to match you with the best facilitator.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-amber-500 p-6 rounded-lg text-center">
              <h4 className="font-bold text-gray-900 mb-2">Bella Borsa</h4>
              <p className="text-sm text-gray-600 mb-4">Success Mindset and Intentional Living</p>
              <a 
                href="https://forms.gle/ekuCHQpbHFvpcggi9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block px-4 py-2 text-sm"
              >
                Introduction Form
              </a>
            </div>
            
            <div className="bg-amber-500 p-6 rounded-lg text-center">
              <h4 className="font-bold text-gray-900 mb-2">Mwanicole Consultants</h4>
              <p className="text-sm text-gray-600 mb-4">Educational Consultancy and Learning Journeys</p>
              <a 
                href="https://forms.gle/8xSCKxbnaLmujv2m9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block px-4 py-2 text-sm"
              >
                Introduction Form
              </a>
            </div>
            
            <div className="bg-amber-500 p-6 rounded-lg text-center">
              <h4 className="font-bold text-gray-900 mb-2">Knowell Book Busters</h4>
              <p className="text-sm text-gray-600 mb-4">Kids Book Club & Writing Workshop</p>
              <a 
                href="https://forms.gle/ecVEntkk5U7dxpzn8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block px-4 py-2 text-sm"
              >
                Introduction Form
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform?</h3>
          <p className="text-lg text-gray-600 mb-6">
            Reach us for in-person or online sessions
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> alphagroupkeoffice@gmail.com</p>
            <p><strong>Phone:</strong> +254-731308119 or +254-726089109</p>
            <p><strong>TikTok:</strong> @posttraumacoachke</p>
          </div>
        </div>

        {/* Rates Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Rates</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
            Many of our clients have enjoyed the benefits of blending at least 2 of the programs. 
            This approach caters for holistic growth and supports development and sustainable outcomes.
          </p>
          <a 
            href="https://forms.gle/mAwQY1fCLw9M9Pd97" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-block px-8 py-3 text-lg"
          >
            View Rates Schedule 2022-2023
          </a>
        </div>
      </div>
    </div>
  );
};
// Packages Page Component
const PackagesPage = () => {
  const packages = [
    {
      name: "Essential Care",
      price: "$149",
      period: "per month",
      features: [
        "2 individual therapy sessions",
        "Email support between sessions",
        "Access to mental health resources",
        "Progress tracking tools"
      ],
      popular: false
    },
    {
      name: "Comprehensive Care",
      price: "$249",
      period: "per month",
      features: [
        "4 individual therapy sessions",
        "24/7 crisis support hotline",
        "Group therapy sessions",
        "Personalized treatment plan",
        "Family session included",
        "Mobile app access"
      ],
      popular: true
    },
    {
      name: "Premium Care",
      price: "$399",
      period: "per month",
      features: [
        "Unlimited therapy sessions",
        "Dedicated therapist assignment",
        "Same-day appointment availability",
        "All group therapy sessions",
        "Family & couples sessions",
        "Priority support",
        "Wellness coaching included"
      ],
      popular: false
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Care Package</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible packages designed to meet your mental health needs and budget.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className={`relative bg-white p-8 rounded-lg shadow-md ${pkg.popular ? 'ring-2 ring-amber-600' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-amber-600">{pkg.price}</span>
                  <span className="text-gray-600 ml-2">{pkg.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-5 h-5 text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                pkg.popular 
                  ? 'bg-amber-600 text-white hover:bg-amber-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All packages include a 7-day free trial</p>
          <p className="text-sm text-gray-500">Cancel anytime • No long-term contracts • Secure & confidential</p>
        </div>
      </div>
    </div>
  );
};

// Testimonials Page Component (replaces PackagesPage)
const TestimonialsPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const clientJourneys = [
    {
      title: "Learning challenge - Reading & Writing",
      name: "Christine (Age 6)",
      challenge: "Christine was 6 years old at the time. Her mother was concerned because her cousin, who lived abroad, was more fluent in reading than her. She had spelling challenges as well. At the onset, there were huge gaps in Christine's reading, e.g she was 6 but could not read three-letter words like MAT, PEG, LID! Also, she had spelling mistakes in her written work. Her demeanour was shy, guessing that she had become accustomed to negative remarks about her reading and writing.",
      outcome: "In approximately 4 months, Christine was a new learner! She could read to herself, her parents and even to her cousin abroad via video calls! She was able to write with few or no mistakes, and one of the notable improvements was that she was pleasant and more outgoing.",
      tags: ["#reading", "#writing"]
    },
    {
      title: "Learning challenge - Dysgraphia, Dyscalculia, Recall challenges",
      name: "Michael (Fourth Grade)",
      challenge: "Michael was in Fourth grade when I met him. His mum was concerned about his handwriting, spelling mistakes and seeming demotivation about school work. In the field, though, he was a soccer champ! His poor academic performance was no match for his soccer skills, leading him to prefer to socialise only regarding soccer.",
      outcome: "I had to start from the basics with Michael, who slowly and steadily picked up and caught on over nine months. Towards the end of the engagement, Michael had been selected as the school Assistant Games Captain, meaning he had been through an 'interview' with the Games teachers to qualify. We were all overjoyed!",
      tags: ["#Dysgraphia", "#dyscalculia", "#Recall"]
    },
    {
      title: "Learning Challenge - Trauma born issues",
      name: "Ariel",
      challenge: "Ariel was born after the mother had experienced the trauma of losing a close family member. She experienced some delays, e.g she did not speak until 2.6 years, she had difficulty hearing and eventually had challenges socialising. She went to school, and her difficulties placed her behind in performance. Her esteem was very low.....",
      outcome: "Ariel was enrolled for the #learningintervention program, and she was able to successfully manage to write, read and spell. Her schoolteacher attended her Achievement Day and was moved to tears by the milestones she had achieved in only 3 months!",
      tags: ["#dysgraphia", "#dyscalculia", "#self-esteem", "#learningintervention"]
    },
    {
      title: "Learning challenge - ADHD & Childhood Trauma",
      name: "Leon (Age 9)",
      challenge: "Leon was nine when his parents got a referral from a schoolteacher. They had made several attempts to get him help and were at their lowest. They brought Leon for the consult session desperately on a Sunday, and there was a sign of hope as they learnt about the #learningintervention program. They were concerned that the #ADHD was a challenge and, coupled with dysgraphia, his chances of consistent learning were very low.",
      outcome: "Leon was eager to learn, and as days went by, the layers of low self-esteem were shed off! The #Masterpiece program was working wonders for him! He owned his learning journey, and there was no looking back. When he resumed his regular school learning, he was position seven! The parents were in shock.....and so were his classmates.",
      tags: ["#dysgraphia", "#adhd", "#childhoodtrauma"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % clientJourneys.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + clientJourneys.length) % clientJourneys.length);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Testimonials</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Real stories of transformation and growth from our learning intervention programs
          </p>
        </div>

        {/* Moriah's Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">Moriah's Story</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              My learning journey was quite normal until I was 9 years old, when our family was involved in a terrible car crash! We were headed back to Nairobi from a family vacation; as fate would have it, we did not get home that day. We were rescued by well-wishers who called for an ambulance, which saved our lives.
            </p>
            <p>
              Back then, trauma was not highly considered as a need to be addressed, so each one of us moved on as we hoped to recover. Naturally, my siblings and I had experienced some learning gaps. As schooling continued, we each recovered differently. My experience was that I constantly felt lost in most subjects, a disconnect of sorts.
            </p>
            <p>
              After working for 17 years, good luck knocked on my door...ONCE! I shared my life journey with someone who was deeply moved and immediately committed to paying for my entry-level university education. This was the beginning of a whole new chapter in my life.
            </p>
            <p>
              At 35 years, I joined campus and learning took on new meaning. I loved the library and took up a work-study opportunity there. The books I came across were like portals into an endless tunnel of knowledge.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-6">
              <p className="font-semibold text-amber-800">
                "Are these your grades?" she asked. "Yes, they are... Am I failing?" was my response. "Not at all, in fact, you qualify for the Vice Chancellor's grant! Your GPA is a consistent 3.6," she answered.
              </p>
            </div>
            <p>
              I had been on the Dean's list since I joined campus and had no idea at all! That is where I realised that I wanted to teach others <span className="font-semibold text-amber-600">#howtolearn</span>.
            </p>
          </div>
        </div>

        {/* Client Journeys Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Client Journeys</h2>
          
          {/* Slideshow */}
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
                >
                  <ChevronLeft size={24} className="text-amber-600" />
                </button>
                
                <h3 className="text-2xl font-bold text-amber-600 text-center flex-1">
                  {clientJourneys[currentSlide].title}
                </h3>
                
                <button 
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
                >
                  <ChevronRight size={24} className="text-amber-600" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {clientJourneys[currentSlide].name}
                </h4>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {clientJourneys[currentSlide].tags.map((tag, index) => (
                    <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                  <h5 className="font-bold text-red-800 mb-3">Challenge:</h5>
                  <p className="text-gray-700 leading-relaxed">
                    {clientJourneys[currentSlide].challenge}
                  </p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
                  <h5 className="font-bold text-green-800 mb-3">Outcome:</h5>
                  <p className="text-gray-700 leading-relaxed">
                    {clientJourneys[currentSlide].outcome}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 pb-6">
              {clientJourneys.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-amber-600 to-gray-900 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
          <p className="text-xl mb-6">
            Every brain can be taught, especially if matched with the right learning partner.
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};
// Contact Page Component

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('https://alphagroup-website.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
        });
        setFormData({ name: '', email: '', phone: '', message: '', serviceType: '' });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your mental health journey? Get in touch with our team today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">0726089109</p>
                  <p className="text-sm text-gray-500">Available 24/7 for crisis support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">alphagroupkedirector@gmail.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">Bukani Road<br />Nairobi West<br />Off Uhuru Highway</p>
                  <p className="text-sm text-gray-500">In-person and online sessions available</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
              <div className="text-sm text-gray-600">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            {/* Status Messages */}
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service of Interest
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="Individual Therapy">Individual Therapy</option>
                  <option value="Couples Therapy">Couples Therapy</option>
                  <option value="Group Therapy">Group Therapy</option>
                  <option value="Family Therapy">Family Therapy</option>
                  <option value="Amaze-ing Mom Program">Amaze-ing Mom Program</option>
                  <option value="LIP Program">Learning Intervention Program (LIP)</option>
                  <option value="Event Management">Event Management & MC Services</option>
                  <option value="General Consultation">General Consultation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              Your information is confidential and protected by professional standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
   // Footer Component with Integrated Social Media
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 mr-2 flex items-center justify-center">
                <img
                  src="\logo-alpha-consulting-ke.jpg"
                  alt="Alpha Coaching KE Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-white font-bold text-sm">AC</span>
                </div>
              </div>
              <span className="text-lg font-bold">Alpha Coaching KE</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional therapy services connecting you with licensed mental health professionals.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Individual Therapy</li>
              <li>Couples Therapy</li>
              <li>Group Therapy</li>
              <li>Family Therapy</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Social Media Accounts</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.tiktok.com/@posttraumacoachke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  TikTok: @posttraumacoachke
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@PosttraumacoachKE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  YouTube: @PosttraumacoachKE
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mwanicoleconsult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  Instagram: @mwanicoleconsult
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/alphagroupke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  FaceBook: @PosttraumacoachKE
                </a>
              </li>
              <li>
                <a
                  href="t.me/knowellkids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  Telegram:@knowellkids
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/AlphaGroupKenya/status/1938157204349100149https://x.com/BellaBorsaKenya/status/1938195032823263433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  X :@AlphaGroupKenya
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com/channel/0029Va84vul7IUYQowlo2p2l"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  WhatsApp Channel: How To Learn
                </a>
              </li>
              </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Crisis Hotline: 0726089109</li>
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Alpha Coaching KE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  
  );
};

export default App;
