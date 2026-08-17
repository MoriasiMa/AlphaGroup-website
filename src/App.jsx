import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from './config/api';
import { Menu, X, Phone, Mail, MapPin, Star, Users, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Mini slideshow component
function MiniSlideshow({ images, autoPlayInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images, autoPlayInterval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-yellow-500">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-yellow-500 w-6' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Video Component
const VideoPlayer = ({ src, poster, title, autoPlay = false, controls = true }) => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-gray-900">
      <video
        className="w-full h-auto"
        controls={controls}
        autoPlay={autoPlay}
        muted={autoPlay}
        poster={poster}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {title && (
        <div className="bg-gray-800 text-white px-4 py-2">
          <p className="text-sm font-medium">{title}</p>
        </div>
      )}
    </div>
  );
};

//Main SLide Show
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
              className="w-full h-full object-contain bg-yellow-500"
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
  return (
    <Router>
      <AppContent />
    </Router>
  );
};


const AppContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  const getCurrentPage = () => {
  const path = location.pathname;
  if (path === '/' || path === '/home') return 'home';
  if (path === '/about') return 'about';
  if (path === '/educational-consultancy') return 'educational-consultancy';
  if (path === '/elevation-coaching') return 'elevation-coaching';
  if (path === '/programs') return 'programs';
  if (path === '/testimonials') return 'testimonials';
  if (path === '/blog') return 'blog';
  if (path === '/resources') return 'resources';
  if (path === '/contact') return 'contact';
  return 'home';
};

  const setCurrentPage = (page) => {
  navigate(`/${page === 'home' ? '' : page}`);
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={getCurrentPage()} 
        setCurrentPage={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>
        <Routes>
        <Route path="/" element={<HomePage setCurrentPage={setCurrentPage} />} />
        <Route path="/home" element={<HomePage setCurrentPage={setCurrentPage} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage setCurrentPage={setCurrentPage} />} />
        <Route path="/educational-consultancy" element={<EducationalConsultancyPage setCurrentPage={setCurrentPage} />} />
        <Route path="/elevation-coaching" element={<ElevationCoachingPage setCurrentPage={setCurrentPage} />} />
        <Route path="/programs" element={<ProgramsPage setCurrentPage={setCurrentPage} />} />
        <Route path="/testimonials" element={<TestimonialsPage setCurrentPage={setCurrentPage} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const Header = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact / Book' },
  ];

  const servicesDropdownItems = [
    { id: 'educational-consultancy', label: 'Educational Consultancy' },
    { id: 'elevation-coaching', label: 'Elevation Coaching' },
    { id: 'services', label: 'Programs' },
  ];

  const isServicesActive = servicesDropdownItems.some((item) => item.id === currentPage);

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              <img
                src="\logo-alpha-consulting-ke.jpg"
                alt="Alpha Coaching KE Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 bg-yellow-600 rounded-lg items-center justify-center" style={{ display: 'none' }}>
                <span className="text-white font-bold text-xl">AG</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alpha Group KE</h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Transforming Lives Through Psychology, <br /> Education & Personal Growth in Africa and beyond
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-md ${
                  currentPage === item.id
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-700 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ${
                  isServicesActive
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-700 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {servicesDropdownItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        currentPage === item.id
                          ? 'text-yellow-500 bg-yellow-50 font-semibold'
                          : 'text-gray-700 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'text-yellow-500 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-500 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Services Group */}
            <div className="mt-1 border-t border-gray-100 pt-1">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Services
              </p>
              {servicesDropdownItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'text-yellow-500 bg-yellow-50'
                      : 'text-gray-700 hover:text-yellow-500 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
// Home Page Component


const HomePage = ({ setCurrentPage }) => {
  // State for modal
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Slideshow images — now includes the images that used to be in the
  // second gallery (slideImages2), merged in at the end.
  const slideImages = [
    {
      src: "/h1.jpeg",
      alt: "Alpha Consulting KE Logo",
      caption: "Programs Available"
    },
    {
      src: "/h2.jpeg",
      alt: "personal trauma couching",
      caption: "Programs Available"
    },
    {
      src: "/h3.jpeg",
      alt: "relationship trauma couching",
      caption: "Programs Available"
    },
    {
      src: "/h4.jpeg",
      alt: "relationship trauma couching",
      caption: "Programs Available"
    },
    {
      src: "/h5.jpeg",
      alt: "Psalm 139",
      caption: "Programs Available"
    },
    {
      src: "/h6.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h7.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h9.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h10.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h11.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h12.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h13.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/h14.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    // --- merged in from the former second gallery (slideImages2) ---
    {
      src: "/WhatsApp Image 2026-03-08 at 10.46.48 AM.jpeg",
      alt: "Alpha Consulting KE Logo",
      caption: "Programs Available"
    },
    {
      src: "/WhatsApp Image 2026-03-08 at 10.47.22 AM.jpeg",
      alt: "personal trauma couching",
      caption: "Programs Available"
    },
    {
      src: "/WhatsApp Image 2026-03-08 at 10.47.23 AM (1).jpeg",
      alt: "relationship trauma couching",
      caption: "Programs Available"
    },
    {
      src: "/WhatsApp Image 2026-03-08 at 10.47.23 AM (2).jpeg",
      alt: "relationship trauma couching",
      caption: "Programs Available"
    },
    {
      src: "/WhatsApp Image 2026-03-08 at 10.47.23 AM (3).jpeg",
      alt: "Psalm 139",
      caption: "Programs Available"
    },
    {
      src: "/WhatsApp Image 2026-03-08 at 10.47.23 AM.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
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
    setSelectedQuestion(null); // Close the modal
    setCurrentPage('contact'); // Navigate to contact page
  };

  return (
    <>

      {/* Mission Statement Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>

            {/* Mission Statement */}
            <div className="max-w-4xl mx-auto mb-10">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Mission Statement</h3>
              <img
                src="/missionpic.jpg"
                alt="Our Mission"
                className="w-full max-w-md mx-auto rounded-lg shadow-md mb-6"
              />
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Our mission is to support schools, educators, parents, and learners through high-quality educational consultancy services that promote inclusive education, effective teaching strategies, learning interventions, and student well-being. We partner with institutions to improve learning outcomes through practical, research-based solutions.
              </p>
            </div>

            {/* Vision Statement */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Vision Statement</h3>
              <img
                src="/visionpic.jpg"
                alt="Our Vision"
                className="w-full max-w-md mx-auto rounded-lg shadow-md mb-6"
              />
              <p className="text-lg text-gray-600 leading-relaxed">
                Our vision is to be a trusted educational consultancy in Kenya and across Africa, recognized for advancing inclusive, learner-centered, and future-ready education that supports diverse learning needs and empowers educators and students to succeed.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-yellow-500 font-semibold text-xl">
                Transformation begins when you say 'YES!' to intentionally engage to meet the best version of your future self.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Slideshow */}
      <section className="bg-gradient-to-r from-yellow-500 to-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Image Slideshow */}
          <div className="mb-8">
            <ImageSlideshow images={slideImages} autoPlay={true} autoPlayInterval={6000} />
          </div>

          <div className="text-center">

          </div>
        </div>
      </section>

      {/* Self-Assessment Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Clarity Journey Here</h2>
            <p className="text-gray-600 text-lg">Click on any question to explore it further</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {questionsData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 cursor-pointer hover:shadow-lg hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => handleQuestionClick(index)}
              >
                <p className="text-gray-700 font-medium">{item.question}</p>
                <div className="mt-3 text-yellow-500 text-sm font-semibold">
                  Click to explore →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different (formerly "What's NEW?!") */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-10">

              {/* What Makes Us Different */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-500 mb-4">What Makes Us Different</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Personalized academic coaching tailored to each student</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Integrated counseling and coaching approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Deep understanding of neurodiverse learning needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Proven ability to improve academic outcomes and clarity for families</span>
                  </li>
                </ul>
              </div>

              {/* Real Outcomes */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-500 mb-4">Real Outcomes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Students improve grades and exam confidence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Parents gain clarity on their child's learning needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Families move from stress and confusion to structured progress</span>
                  </li>
                </ul>
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
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-yellow-500 font-semibold mb-3">
                  Ready to take the next step?
                </p>
                <p className="text-yellow-500 text-sm">
                  We're here to support you on your transformation journey. Let's discuss how we can help you move forward.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleContactRedirect}
                  className="flex-1 bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
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

  const eventImages = [
    {
      src: "/ntv appearance.jpg",
      alt: "Nation Media Appearance",
      caption: "Nation Media Appearance"
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
      src: "/events MC 2026.png",
      alt: "Event MC",
      caption: "Event MC"
    },
    {
      src: "/Elevation Coaching to Empower  Growth.png",
      alt: "Elevation Coaching to Empower Growth",
      caption: "Elevation Coaching to Empower  Growth"
    },
    {
      src: "/Diplomats support flier.jpg",
      alt: "Diplomats support flier",
      caption: "Diplomats support flier"
    },
    {
      src: "/child minding poster.jpg",
      alt: "child minding poster",
      caption: "child minding poster"
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
          <h2 className="text-2xl text-yellow-500 font-semibold mb-4">
            The Gold Standard Of Human Elevation
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
                She is a registered{' '}
                <a href="https://www.eaipc.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700">
                  Coach
                </a>{' '}
                and{' '}
                <a href="https://www.usiu.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700">
                  Counseling Pyschologist
                </a>.
              </p>
              <p>
                Moriah is an alumnus of{' '}
                <a href="https://strathmore.edu/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700">
                  Strathmore University
                </a>, where she took an Accelerated Business Course that transformed her business.
              </p>
              <p>
                Based in Nairobi,she is an elevation coach consultant and counsellor. She has the joy of working with children with learning disabilities and those 
                with learning gaps due to the negative effects of various life experiences. She has done Pro bono Coaching 
                for{''}<a href="https://moringaschool.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700"> Moringa School </a>with excellent results for the students.
              </p>
              <p>
                She is a certified 'White belt' of Lean Six Sigma. She benefits from the{''}<a href="https://cherieblairfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700">  Cherie Blair Foundation</a> and has 
                received valuable mentorship from{''}<a href="https://share.google/U03bbofjjnDASkk5T" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700"> Cheryl Pullins</a>  and {''}<a href="https://share.google/gkVC20znda4PYymme" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-700">Naomi McLaughlan</a>.
              </p>
            </div>
          </div>
        </div>
        {/* Events MC Section */}
        <div className="mb-16">
          <ImageSlideshow images={eventImages} autoPlay={true} autoPlayInterval={5000} />
        </div>


        {/* Media Features Section */}
        <div className="bg-yellow-50 p-8 rounded-lg mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Media Features & Recognition</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">TV & Media Appearances</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.youtube.com/watch?v=MdTnJTvnXpY&feature=youtu.be" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-500 hover:text-yellow-700">
                    Ebru TV - Importance of an Image Consultant
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=eUz60PEX0no&t=66s" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-500 hover:text-yellow-700">
                    Ebru TV - Widows in Kenya and beyond
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/watch/live/?ref=search&v=2212548072103552" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-500 hover:text-yellow-700">
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
                     className="text-yellow-500 hover:text-yellow-700">
                    Parents Africa Magazine - Helping widows rebuild their lives
                  </a>
                </li>
                <li>
                  <a href="https://m.facebook.com/RisingStarKenya/" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-500 hover:text-yellow-700">
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Training for Lasting Transformation Moriah's Method</h3>
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
const ServicesPage = ({ setCurrentPage }) => {
  // Service program images
 
  const programImages = [
    {
      src: "/transform lives in hours.jpg",
      alt: "LIP Program Benefits",
      caption: "Learning Intervention Program - Transforming lives in hours"
    }
  ];
  // Images for each service division
  const bellaBorsaImages = [
    { src: "/bella-borsa-logo-2.jpg", alt: "Bella Borsa Logo" },
    { src: "/bella1.jpeg", alt: "Bella Borsa Logo" },
    { src: "/bella2.jpeg", alt: "Bella Borsa Logo" },
    { src: "/bella3.jpeg", alt: "Bella Borsa Logo" },
  ];

  const alphaCoachingImages = [
    { src: "/annual-writing-workshop-pic.jpg", alt: "Alpha Coaching Workshop" },
    { src: "/child education.jpg", alt: "Child Education" }
  ];

  const mwanicoleImages = [
    { src: "/mwanicole1.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole2.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole3.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole4.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole5.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole6.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole7.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole8.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole9.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole10.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole11.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole12.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole13.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole14.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole15.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole16.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole17.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole18.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole19.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole20.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole22.jpeg", alt: "Writing Workshop" },
    { src: "/mwanicole23.jpeg", alt: "Writing Workshop" },
  ];

  const knowellImages = [
    { src: "/knowell1.jpeg", alt: "Writing Workshop" },
    { src: "/knowell2.jpeg", alt: "Writing Workshop" },
    { src: "/knowell3.jpeg", alt: "Writing Workshop" },
    { src: "/knowell4.jpeg", alt: "Writing Workshop" },
    { src: "/knowell5.jpeg", alt: "Writing Workshop" },
    { src: "/knowell6.jpeg", alt: "Writing Workshop" },
    { src: "/knowell7.jpeg", alt: "Writing Workshop" },
    { src: "/knowell8.jpeg", alt: "Writing Workshop" },
    { src: "/knowell9.jpeg", alt: "Writing Workshop" }
  ];


  const handleContactRedirect = () => {
  setCurrentPage('contact');
  };
  
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Programs</h1>
          <h2 className="text-2xl text-yellow-500 font-semibold mb-4">
            Transform Your Life, Transform Your Community
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Alpha Group, we believe every person has the power to transform not only their own life, but their entire community. Whether you're seeking clarity in your purpose, healing from life's challenges, or support for your child's growth, we're here to guide you with compassion and expertise. We don't just treat symptoms- we get to the root issue. We help you discover your strengths, unlock your potential, and create lasting positive change that ripples through every relationship and opportunity in your life.
          </p>
        </div>
     {/* Service Divisions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Programs Divisions</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Bella Borsa Consultants */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MiniSlideshow images={bellaBorsaImages} />
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Bella Borsa Consultants</h4>
                <p className="text-gray-600 mb-4">
                  Individuals and teams seeking authentic transitions 
                  <span className="font-semibold text-yellow-500"> #intentional living</span>
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Services:</strong></p>
                  <ul className="text-left space-y-1">
                    <li>• Success Mindset Development</li>
                    <li>• Intentional Living Coaching</li>
                    <li>• Personal Image Consulting</li>
                    <li>• Leadership Transitions</li>
                    <li>• Business coaching for leaders</li>
                    <li>• Leadership coaching</li>
                    <li>• Executive coaching</li>
                    <li>• Performance coaching</li>
                    <li>
                      <a
                        href="https://youtube.com/@bellaborsaconsultants?si=6dWzjtvVIsGnuEHK"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-yellow-400 transition-colors duration-200"
                      >
                        <b>Youtube Link: @bellaborsaconsultants</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Alpha Coaching Ke */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MiniSlideshow images={alphaCoachingImages} />
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Alpha Coaching Ke</h4>
                <p className="text-gray-600 mb-4">
                  A holistic approach
                  <span className="font-semibold text-yellow-500"> #AlphaCoachingKe</span>
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Services:</strong></p>
                  <ul className="text-left space-y-1">
                    <li>• Mindset transformation and confidence building</li>
                    <li>• Growth strategy for personal and professional elevation</li>
                    <li>• Breaking limiting beliefs and self-sabotage patterns</li>
                    <li>• Trauma-informed empowerment and inner child healing</li>
                    <li>• Professional coaching services</li>
                    <li>• Personal development coach</li>
                    <li>• Emotional intelligence coaching</li>
                    <li>• Life coaching services</li>
                    <li>• Career growth coaching</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mwanicole Consultants */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MiniSlideshow images={mwanicoleImages} />
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Mwanicole Consultants</h4>
                <p className="text-gray-600 mb-4">
                  Helping children and adults create a "how to learn" map.
                  <span className="font-semibold text-yellow-500"> #howtolearn</span>
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Services:</strong></p>
                  <ul className="text-left space-y-1">
                    <li>• Learning Intervention Program (LIP)</li>
                    <li>• Special Needs Education Consultancy</li>
                    <li>• Parent Support For Learning Challenges</li>
                    <li>• School Psychologist Services</li>
                    <li>• Teacher Training And Development</li>
                    <li>• Educational Consultancy Services</li>
                    <li>• Learning Gap Assessment</li>
                    <li>• Inclusive Education Support</li>
                    <li>• Trauma-Informed Learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fourth service card */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MiniSlideshow images={knowellImages} />
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Knowell Book Busters</h4>
                <p className="text-gray-600 mb-4">
                  Restoring "the joy of learning" to children's academics.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Services:</strong></p>
                  <ul className="text-left space-y-1">
                    <li>• Educational Inervention Programs</li>
                    <li>• Parent Support For Learning Challenges</li>
                    <li>• Student Learning Evaluation</li>
                    <li>• Academic Performance Improvement</li>
                    <li>• Learning Difficulties Assessment</li>
                    <li>• Kids Book Club</li>
                    <li>• Writing Workshops</li>
                    <li>• Reading Intervention</li>
                    <li>• Academic Support</li>
                    <li>• Annual Spelling Bee</li>
                    
                    <li>
                      <a
                        href="https://youtube.com/@knowellbookbusters6516?si=L1-9HA3Q8kD7w7dt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-yellow-400 transition-colors duration-200"
                      >
                        <b>Youtube Link: @knowellbookbusters</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* New Services from Website */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Additional Programs</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-yellow-500 mb-3">Trauma Recovery Coaching</h4>
              <p className="text-gray-600 mb-4">
                Specialized support for post-trauma recovery and healing, helping individuals break cycles 
                and move towards their best future self.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Individual trauma therapy</li>
                <li>• Relationship healing</li>
                <li>• Childhood trauma recovery</li>
                <li>• Family coaching</li>
                <li>• Crisis management for leaders</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-yellow-500 mb-3">Parenting Support</h4>
              <p className="text-gray-600 mb-4">
                Intentional parenting guidance to help fill learning gaps and support holistic 
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
              <h4 className="text-xl font-bold text-yellow-500 mb-3">Online Healing Webinars</h4>
              <p className="text-gray-600 mb-4">
                Monthly "Healing Table" webinars covering various trauma healing topics 
                for childhood trauma,women's empowerment and recovery.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Unwinding trauma cords</li>
                <li>• Understanding trauma patterns</li>
                <li>• Mother wound healing</li>
                <li>• Monthly group sessions</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-yellow-500 mb-3">Events MC Services</h4>
              <p className="text-gray-600 mb-4">
                Moriah has a 'midas touch' for kids' events:
            
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• New-born</li>
                <li>• Graduation</li>
                <li>• Pediatric care hospitalization</li>
                <li>• Infant maternal death</li>
                <li>• Birthdays</li>
                <li>• Baptism</li>
                <li>• Baby dedication</li>
  
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
            <div className="bg-yellow-500 p-6 rounded-lg text-center">
              <h4 className="font-bold text-gray-900 mb-2">Bella Borsa</h4>
              <p className="text-sm text-gray-600 mb-4">Success Mindset and Intentional Living</p>
              <a 
                href="https://www.alphagroupke.co.ke/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block px-4 py-2 text-sm"
              >
                Introduction Form
              </a>
            </div>
            
            <div className="bg-yellow-500 p-6 rounded-lg text-center">
              <h4 className="font-bold text-gray-900 mb-2">Mwanicole Consultants</h4>
              <p className="text-sm text-gray-600 mb-4">Educational Consultancy and Learning Journeys</p>
              <a 
                href="https://www.alphagroupke.co.ke/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block px-4 py-2 text-sm"
              >
                Introduction Form
              </a>
            </div>
            
            <div className="bg-yellow-500 p-6 rounded-lg text-center">
              <h4 className="font-bold text-gray-900 mb-2">Knowell Book Busters</h4>
              <p className="text-sm text-gray-600 mb-4">Kids Book Club & Annual Spelling Bee</p>
              <a 
                href="https://www.alphagroupke.co.ke/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block px-4 py-2 text-sm"
              >
                Introduction Form
              </a>
            </div>
          </div>
        </div>
        
        
       

        {/* Transformation Services Overview */}
<div className="grid md:grid-cols-2 gap-12 items-center mb-16">
  <div>
    <h3 className="text-3xl font-bold text-gray-900 mb-6">Unlock Your Full Potential</h3>
    <div className="space-y-4 text-gray-600">
      <p>
        Whether you're a student facing learning challenges or an adult ready to break through 
        barriers that have held you back for years, we specialize in identifying and addressing 
        the root causes that keep you from thriving.
      </p>
      <p>
        Our signature <span className="font-semibold text-gray-800">Learning Intervention Program (LIP)</span> doesn't 
        just teach coping strategies—it rewires how your brain processes information, restoring your 
        natural ability to learn with confidence and joy.
      </p>
      <p>
        The <span className="font-semibold text-gray-800">Masterpiece Program</span> takes high achievers even 
        further, helping you discover and step into your ultimate potential, creating success that 
        feels authentic and sustainable.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <p className="text-lg font-semibold text-gray-900">
          Ready to experience what's possible when nothing holds you back?
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Join hundreds of clients who've discovered their breakthrough with Alpha Group KE.
        </p>
      </div>
    </div>
  </div>
  <div>
    <ImageSlideshow images={programImages} autoPlay={false} />
  </div>
</div>

 {/* Main Service Promise */}
       <div className="bg-yellow-50 p-8 rounded-lg mb-16">
       <div className="text-center">
       <h3 className="text-3xl font-bold text-yellow-500 mb-4">
       Breakthrough Results That Last: Where Healing Meets Transformation
       </h3>
       <blockquote className="text-lg italic text-gray-700 mb-6">
      "Transformation is the end result of intentionality,every minute,hour,day,week!"
      <footer className="text-sm text-gray-600 mt-2">— Moriah, Founder & Lead Therapist</footer>
      </blockquote>
      <p className="text-xl font-semibold text-yellow-500 mb-4">
      Experience profound shifts that create lasting change for you and your family.
      </p>
      <button onClick={handleContactRedirect}
          className="bg-black text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            READY TO ELEVATE? CLICK HERE
          </button>
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

const EducationalConsultancyPage = ({ setCurrentPage }) => {
  const [activeSegment, setActiveSegment] = useState('academic');

  const segments = [
    { id: 'academic', label: 'A. Academic Coaching', icon: '🎓' },
    { id: 'neurodiverse', label: 'B. Neurodiverse Support', icon: '🧠' },
    { id: 'consultancy', label: 'C. Educational Consultancy', icon: '🗺️' },
  ];

  const segmentContent = {
    academic: {
      title: 'Academic Coaching (Exams)',
      subtitle: 'A-Level · KCSE · Cambridge',
      description:
        'We support students preparing for final exams with structured strategies, time management skills, and personalized coaching that improves performance and builds confidence.',
      services: [
        'KCSE exam preparation and strategy',
        'A-Level structured coaching',
        'Cambridge curriculum support',
        'Time management and study skills',
        'Confidence building for high-stakes exams',
        'Personalized performance tracking',
      ],
      image: '/Candidate preparation-All systems.jpg',
      imageAlt: 'Candidate preparation - All systems',
      cta: 'Start Exam Coaching',
    },
    neurodiverse: {
      title: 'Neurodiverse Parent Support',
      subtitle: 'GDD · ADHD · Learning Differences',
      description:
        'We work with parents of children with learning differences, including Global Developmental Delay (GDD), providing clarity, structure, and practical tools to support both learning and behaviour.',
      services: [
        'Global Developmental Delay (GDD) support',
        'ADHD coaching for children and parents',
        'Learning differences assessment and strategy',
        'Behavioural support frameworks',
        'Parent coaching and empowerment',
        'School-home communication bridges',
      ],
      image: '/neurodiverse flier -leaks- march 2026.jpg',
      imageAlt: 'Neurodiverse learning support',
      cta: 'Get Neurodiverse Support',
    },
    consultancy: {
      title: 'Educational Consultancy',
      subtitle: 'School Placement · Learning Pathways · Strategy',
      description:
        'We help parents make informed decisions about schools, learning pathways, and academic direction — ensuring each child is placed in an environment where they can truly thrive.',
      services: [
        'School placement guidance in Nairobi and Kenya',
        'Learning pathway mapping',
        'Academic strategy for mainstream learners',
        'Inclusive education planning',
        'Transition support (primary to secondary)',
        'Progress reviews and outcome tracking',
      ],
      image: '/Inclusive Learning Workshop Promotion.png',
      imageAlt: 'Inclusive Learning Workshop',
      cta: 'Book a Consultation',
    },
  };

  const active = segmentContent[activeSegment];

  const outcomes = [
    { label: 'Students improve grades and exam confidence' },
    { label: 'Parents gain clarity on their child\'s learning needs' },
    { label: 'Families move from stress and confusion to structured progress' },
    { label: 'Children develop self-belief alongside academic skills' },
  ];

  const differentiators = [
    {
      title: 'Personalized Approach',
      desc: 'Every coaching plan is tailored to the individual student\'s needs, not a one-size-fits-all curriculum.',
    },
    {
      title: 'Integrated Counseling',
      desc: 'We combine academic coaching with counseling psychology for whole-child development.',
    },
    {
      title: 'Neurodiverse Expertise',
      desc: 'Deep understanding of how different brains learn, applied practically in every session.',
    },
    {
      title: 'Proven Outcomes',
      desc: 'Real results: students move from struggling to thriving, with documented academic improvements.',
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-3">
            Education Division
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Educational Consultancy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Transforming Lives Through Psychology, Education & Personal Growth in Africa and beyond
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 max-w-3xl mx-auto rounded-r-lg text-left">
            <p className="text-gray-700 font-medium">
              "We support learning, behaviour, and development through structured programs."
            </p>
            <p className="text-sm text-gray-500 mt-1">
              A bridge between education and life development — especially for neurodiverse and mainstream learners.
            </p>
          </div>
        </div>

        {/* Segment Tabs */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            {segments.map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeSegment === seg.id
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-yellow-400 hover:text-yellow-500'
                }`}
              >
                <span className="mr-2">{seg.icon}</span>
                {seg.label}
              </button>
            ))}
          </div>

          {/* Segment Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-xl shadow-md p-8">
            <div>
              <p className="text-sm font-semibold text-yellow-500 uppercase tracking-wider mb-2">
                {active.subtitle}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{active.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{active.description}</p>
              <ul className="space-y-2 mb-8">
                {active.services.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setCurrentPage('contact')}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                {active.cta}
              </button>
            </div>
            <div className="rounded-lg overflow-hidden bg-yellow-50">
              <img
                src={active.image}
                alt={active.imageAlt}
                className="w-full h-80 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            What Makes Us Different
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500"
              >
                <h3 className="font-bold text-gray-900 mb-2">{d.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Outcomes */}
        <div className="bg-gray-900 text-white rounded-xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Real Outcomes</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">
            From A… to B' — results our families have lived
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {outcomes.map((o, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white/10 rounded-lg p-4"
              >
                <span className="text-yellow-400 font-bold text-lg mt-0.5">✓</span>
                <p className="text-gray-200 text-sm leading-relaxed">{o.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional program images */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Our Programs in Action
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/LIP flier-march 2026.jpg', label: 'Learning Intervention Program' },
              { src: '/Inclusive programs poster.jpg', label: 'Inclusive Programs' },
              { src: '/Professional Coaching for teachers.png', label: 'Professional Coaching for Teachers' },
              { src: '/Kids book club.jpg', label: 'Kids Book Club' },
              { src: '/Spelling Bee Logo.jpg', label: 'Annual Spelling Bee' },
              { src: '/adult book club poster.jpg', label: 'Adult Book Club' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-yellow-50 flex items-center justify-center">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 text-center">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-yellow-500 rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Clarity for Your Child's Academic and Life Success
          </h2>
          <p className="text-yellow-900 mb-6 max-w-2xl mx-auto">
            If your child is struggling academically, preparing for KCSE or A-Level exams, or
            facing learning challenges such as GDD or other neurodiverse needs — you are not alone,
            and you do not have to navigate it alone.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-bold hover:bg-yellow-50 transition-colors"
          >
            Book a Free Discovery Call
          </button>
        </div>

      </div>
    </div>
  );
};

const ElevationCoachingPage = ({ setCurrentPage }) => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-3">Life Success Division</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Elevation Coaching Framework</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        "We help children and parents build emotional strength, structure, and confidence for everyday life."
      </p>
      <p className="text-gray-500 mb-8">Full content coming soon. Contact us to learn more.</p>
      <button
        onClick={() => setCurrentPage('contact')}
        className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
      >
        Get in Touch
      </button>
    </div>
  </div>
);

const ProgramsPage = ({ setCurrentPage }) => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-3">What We Offer</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Programs</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        From the Learning Intervention Program to the Amaze-ing Mom Program — full program details coming soon.
      </p>
      <button
        onClick={() => setCurrentPage('contact')}
        className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
      >
        Ask About a Program
      </button>
    </div>
  </div>
);

const blogPosts = [
  {
    id: 'school-audits',
    title: 'How School Performance Audits Can Transform Educational Institutions',
    excerpt: 'A structured evaluation of academic performance, teaching quality, leadership effectiveness and operational systems can reveal exactly where your institution is leaking potential.',
    tag: 'School Leadership',
    content: [
      {
        heading: 'What is a School Performance Audit?',
        blocks: [
          { type: 'text', text: 'It is a structured evaluation of both the tangible and intangible aspects of a learning institution. This includes:' },
          { type: 'list', items: ['Academic performance', 'Teaching quality', 'Leadership effectiveness', 'Operational systems'] },
          { type: 'text', text: 'Many schools operate without fully understanding where their performance gaps lie.' },
        ],
      },
      {
        heading: 'Why Audits Are Essential',
        blocks: [
          { type: 'text', text: 'Without an audit:' },
          { type: 'list', items: ['Problems remain unidentified', 'Growth is limited', 'Decision-making lacks data'] },
          { type: 'text', text: 'With an audit:' },
          { type: 'list', items: ['Clear insights emerge', 'Strategic improvements are possible', 'Institutions can scale effectively'] },
        ],
      },
      {
        heading: 'What an Audit Reveals',
        blocks: [
          { type: 'list', items: ['Gaps in learner experience and teaching strategies', 'Leadership misalignment', 'Inefficiencies in systems', 'Opportunities for growth'] },
        ],
      },
      {
        heading: 'Driving Institutional Excellence',
        blocks: [
          { type: 'text', text: 'Schools that invest in audits:' },
          { type: 'list', items: ['Improve performance outcomes', 'Strengthen internal systems', 'Build credibility and trust'] },
        ],
      },
      {
        heading: 'Elevate Your Institution',
        blocks: [
          { type: 'text', text: 'At Mwanicole Consultants, we provide in-depth audits that lead to actionable, measurable improvements. Book an institutional consultation today and take your school to the next level.' },
        ],
      },
    ],
  },
  {
    id: 'exam-prep',
    title: 'Exam Preparation Strategies That Actually Work',
    excerpt: 'True performance improvement comes from strategy, not stress. Students who perform well are not necessarily those who study more, but those who study smarter.',
    tag: 'Academic Coaching',
    content: [
      {
        heading: 'Why Many Students Struggle',
        blocks: [
          { type: 'text', text: 'Common issues include:' },
          { type: 'list', items: ['Lack of structured study plans', 'Poor time management', 'Limited understanding of exam techniques', 'High anxiety and low confidence'] },
          { type: 'text', text: 'These factors significantly impact performance.' },
        ],
      },
      {
        heading: 'Effective Exam Preparation Strategies',
        blocks: [
          { type: 'text', text: 'To improve results, students need:' },
          { type: 'list', items: ['Structured revision schedules', 'Active learning techniques (not passive reading)', 'Understanding the learner\u2019s learning style', 'Strong exam technique (analysis, structure, clarity)'] },
        ],
      },
      {
        heading: 'The Role of Schools and Parents',
        blocks: [
          { type: 'text', text: 'Support systems matter. Students perform better when:' },
          { type: 'list', items: ['Schools provide differentiated learning frameworks', 'Parents create supportive environments', 'Teachers focus on both content and exam skills'] },
        ],
      },
      {
        heading: 'Beyond Exams: Building Confidence',
        blocks: [
          { type: 'text', text: 'Preparation should not only focus on grades, but also:' },
          { type: 'list', items: ['Confidence', 'Resilience', 'Critical thinking'] },
          { type: 'text', text: 'These skills have long-term impact.' },
        ],
      },
      {
        heading: 'Professional Support Makes the Difference',
        blocks: [
          { type: 'text', text: 'At Mwanicole Consultants, we support students, parents, and schools with structured exam preparation strategies that improve both performance, confidence and holistic success. Book a session today and help your students achieve their full potential.' },
        ],
      },
    ],
  },
  {
    id: 'inclusive-edu',
    title: 'Inclusive Education in Kenya: Moving from Policy to Practice',
    excerpt: 'Inclusive education is no longer just a policy requirement — it is a necessity for schools that aim to provide equitable, high-quality learning for every student.',
    tag: 'Inclusive Education',
    content: [
      {
        heading: 'What is Inclusive Education Really About?',
        blocks: [
          { type: 'text', text: 'Inclusive education goes beyond placing learners in the same classroom. It involves creating systems, teaching strategies, and environments that support diverse learning needs. This includes:' },
          { type: 'list', items: ['Learners with developmental delays', 'Neurodiverse students', 'Different learning styles and abilities'] },
        ],
      },
      {
        heading: 'Why Schools Struggle with Implementation',
        blocks: [
          { type: 'text', text: 'Despite good intentions, schools often face:' },
          { type: 'list', items: ['Limited teacher training in inclusive practices', 'Overcrowded classrooms', 'Lack of individualized learning strategies', 'Minimal institutional support structures'] },
          { type: 'text', text: 'These gaps lead to frustration for both educators and learners.' },
        ],
      },
      {
        heading: 'Practical Strategies for Schools',
        blocks: [
          { type: 'text', text: 'To implement inclusive education effectively, schools need:' },
          { type: 'list', items: ['Teacher training in differentiated instruction', 'Structured intervention programs', 'Classroom support systems', 'Ongoing monitoring and evaluation'] },
        ],
      },
      {
        heading: 'The Role of Leadership',
        blocks: [
          { type: 'text', text: 'School leadership plays a critical role in driving inclusivity by:' },
          { type: 'list', items: ['Setting clear policies', 'Investing in training', 'Creating a culture of support'] },
        ],
      },
      {
        heading: 'Partnering for Sustainable Impact',
        blocks: [
          { type: 'text', text: 'Inclusive education requires more than intention—it requires expertise and structured systems. At Mwanicole Consultants, we support schools in designing and implementing inclusive education frameworks that are practical, sustainable, and results-driven. Book a consultation today to build an inclusive, high-performing learning environment.' },
        ],
      },
    ],
  },
  {
    id: 'learning-assessments',
    title: 'Why Educational Assessments Are Critical for Student Success',
    excerpt: 'Many learning challenges go unnoticed — not because they are absent, but because they are not properly identified. Assessments provide clarity.',
    tag: 'Learning Assessments',
    content: [
      {
        heading: 'What Are Educational Assessments?',
        blocks: [
          { type: 'text', text: 'Assessments are structured evaluations used to understand a student\u2019s:' },
          { type: 'list', items: ['Academic level', 'Cognitive abilities', 'Behavioral patterns', 'Learning challenges'] },
        ],
      },
      {
        heading: 'Why Assessments Matter',
        blocks: [
          { type: 'text', text: 'Without proper assessment:' },
          { type: 'list', items: ['Learning gaps remain hidden', 'Incorrect strategies are applied', 'Students become frustrated and disengaged'] },
          { type: 'text', text: 'With assessment:' },
          { type: 'list', items: ['Interventions become targeted', 'Progress becomes measurable', 'Support becomes effective'] },
        ],
      },
      {
        heading: 'Types of Assessments',
        blocks: [
          { type: 'list', items: ['Academic assessments', 'Behavioral and emotional assessments', 'Developmental evaluations'] },
          { type: 'text', text: 'Each assessment plays a critical role in understanding the whole child.' },
        ],
      },
      {
        heading: 'The Power of Early Intervention',
        blocks: [
          { type: 'text', text: 'Early identification leads to:' },
          { type: 'list', items: ['Faster improvement', 'Reduced long-term challenges', 'Increased confidence and performance'] },
        ],
      },
      {
        heading: 'Take the First Step Toward Clarity',
        blocks: [
          { type: 'text', text: 'At Mwanicole Consultants, we guide parents and schools through the assessment process and provide actionable recommendations. Book an assessment consultation today and unlock your child\u2019s potential.' },
        ],
      },
    ],
  },
  {
    id: 'neurodiversity-guide',
    title: 'Understanding Neurodiversity: A Guide for Parents and Schools',
    excerpt: 'Neurodiversity is not a challenge to be fixed — it is a reality to be understood, supported, and nurtured.',
    tag: 'Neurodiversity',
    content: [
      {
        heading: 'What is Neurodiversity?',
        blocks: [
          { type: 'text', text: 'Neurodiversity recognizes that every brain functions differently. Some children process information, emotions, and experiences in unique ways, and this requires intentional support. Across Kenya, more parents and schools are encountering children with diverse learning profiles, including developmental delays, ADHD, autism, GDD, and other cognitive differences.' },
        ],
      },
      {
        heading: 'The Hidden Struggles',
        blocks: [
          { type: 'text', text: 'Parents and schools often face:' },
          { type: 'list', items: ['Misunderstood behavior', 'Emotional outbursts linked to anxiety or fear', 'Learning gaps that traditional methods cannot address', 'Frustration from both educators and caregivers'] },
          { type: 'text', text: 'Without the right support, these challenges can escalate.' },
        ],
      },
      {
        heading: 'The Importance of Early Assessment',
        blocks: [
          { type: 'text', text: 'One of the most critical steps is proper assessment. Understanding a neurodiverse child\u2019s needs allows for:' },
          { type: 'list', items: ['Targeted interventions', 'Appropriate learning strategies', 'Better emotional support', 'Clear guidance for both parents and teachers'] },
        ],
      },
      {
        heading: 'Supporting Neurodiverse Learners Effectively',
        blocks: [
          { type: 'text', text: 'Support for these learners requires the following:' },
          { type: 'list', items: ['Individualized learning approaches', 'Structured routines and safe environments', 'Collaboration between parents, teachers, and specialists', 'Ongoing coaching and guidance'] },
        ],
      },
      {
        heading: 'You Don\u2019t Have to Navigate This Alone',
        blocks: [
          { type: 'text', text: 'At Mwanicole Consultants, we work with families and schools to provide assessment guidance, intervention strategies, and ongoing support tailored to each child\u2019s needs. Reach out today for professional guidance and support your child\u2019s growth with confidence.' },
        ],
      },
    ],
  },
  {
    id: 'parenting-today',
    title: 'Parenting in Today\u2019s Education System: Supporting Your Child\u2019s Learning Journey',
    excerpt: 'Parenting today goes far beyond ensuring children attend school and complete homework. It requires active involvement in academic, social and emotional development.',
    tag: 'Parenting',
    content: [
      {
        heading: 'The Changing Role of Parents',
        blocks: [
          { type: 'text', text: 'Today\u2019s parents must navigate:' },
          { type: 'list', items: ['Academic pressure', 'Emotional well-being', 'Digital and social distractions', 'Diverse learning needs'] },
          { type: 'text', text: 'This can feel overwhelming without the right guidance.' },
        ],
      },
      {
        heading: 'Supporting Neurotypical and Neurodiverse Children',
        blocks: [
          { type: 'text', text: 'Every child learns differently. While some thrive in traditional systems, others require tailored support. Parents should focus on:' },
          { type: 'list', items: ['Understanding their child\u2019s learning style', 'Creating structured routines', 'Providing holistic support', 'Seeking professional guidance when needed'] },
        ],
      },
      {
        heading: 'Common Parenting Challenges',
        blocks: [
          { type: 'text', text: 'Many parents face:' },
          { type: 'list', items: ['Frustration with inconsistent performance', 'Difficulty managing behavior', 'Uncertainty about when to seek help', 'Balancing support without pressure'] },
        ],
      },
      {
        heading: 'When to Seek Professional Support',
        blocks: [
          { type: 'text', text: 'If your child is:' },
          { type: 'list', items: ['Struggling academically despite effort', 'Showing behavioral or emotional challenges', 'Falling behind peers'] },
          { type: 'text', text: 'It may be time to consider assessment and intervention.' },
        ],
      },
      {
        heading: 'You Are Not Alone in This Journey',
        blocks: [
          { type: 'text', text: 'At Mwanicole Consultants, we work with parents to provide clarity, strategies, and ongoing support tailored to each child\u2019s needs. Reach out today for expert guidance and support your child with confidence.' },
        ],
      },
    ],
  },
  {
    id: 'holistic-education',
    title: 'Holistic Education: Preparing Learners for Life, Not Just Exams',
    excerpt: 'Academic success alone is no longer enough. Today\u2019s world requires learners who are emotionally intelligent, adaptable, and capable of critical thinking.',
    tag: 'Holistic Education',
    content: [
      {
        heading: 'What is Holistic Education?',
        blocks: [
          { type: 'text', text: 'Holistic education focuses on developing the whole child:' },
          { type: 'list', items: ['Academic ability', 'Emotional intelligence', 'Social skills', 'Life competencies'] },
        ],
      },
      {
        heading: 'Why It Matters',
        blocks: [
          { type: 'text', text: 'Students who receive holistic education are:' },
          { type: 'list', items: ['More confident', 'Better problem-solvers', 'More resilient', 'Prepared for real-world challenges'] },
        ],
      },
      {
        heading: 'The Role of Schools and Parents',
        blocks: [
          { type: 'text', text: 'Holistic development requires collaboration:' },
          { type: 'list', items: ['Schools must integrate relevant life skills into learning', 'Parents must support emotional and mental growth at home'] },
        ],
      },
      {
        heading: 'Common Gaps in the Current System',
        blocks: [
          { type: 'text', text: 'Many institutions focus heavily on exams, neglecting:' },
          { type: 'list', items: ['Emotional and mental well-being', 'Social development', 'Critical thinking skills'] },
        ],
      },
      {
        heading: 'Building Future-Ready Learners',
        blocks: [
          { type: 'text', text: 'To truly prepare learners, education must evolve. At Mwanicole Consultants, we support schools and families in integrating holistic development strategies that create balanced, high-performing individuals. Partner with us to build learners who thrive beyond the classroom.' },
        ],
      },
    ],
  },
  {
    id: 'educational-consultancy',
    title: 'Why Educational Consultancy is Essential for Schools Today',
    excerpt: 'Schools in Kenya face increasing pressure to deliver not just academic results, but well-rounded, future-ready learners.',
    tag: 'Educational Consultancy',
    content: [
      {
        heading: 'A Landscape Under Pressure',
        blocks: [
          { type: 'text', text: 'In today\u2019s rapidly evolving education landscape, schools in Kenya are facing increasing pressure to deliver not just academic results, but well-rounded, future-ready learners. However, many institutions struggle with outdated teaching strategies, misaligned leadership, and limited support systems for diverse learners. This is where educational consultancy becomes not just valuable, but essential — providing schools with expert guidance to identify gaps, improve teaching practices, and implement sustainable systems that enhance both student performance and teacher effectiveness.' },
        ],
      },
      {
        heading: 'The Growing Challenges in Schools',
        blocks: [
          { type: 'text', text: 'Many schools today face:' },
          { type: 'list', items: ['Inconsistent academic performance', 'Limited strategies for inclusive education', 'Teacher burnout and low morale', 'Lack of structured intervention systems', 'Minimal alignment between leadership and classroom delivery'] },
          { type: 'text', text: 'Without addressing these challenges, schools risk stagnation.' },
        ],
      },
      {
        heading: 'How Educational Consultancy Transforms Schools',
        blocks: [
          { type: 'text', text: 'A professional educational consultancy offers:' },
          { type: 'list', items: ['Institutional audits to identify performance gaps', 'Teacher training in effective and inclusive methodologies', 'Leadership coaching for school administrators', 'Tailored learning interventions for students', 'Systems that support long-term improvement'] },
          { type: 'text', text: 'The goal is not just short-term fixes, but sustainable transformation.' },
        ],
      },
      {
        heading: 'Why This Matters for Your School',
        blocks: [
          { type: 'text', text: 'Schools that invest in consultancy services experience:' },
          { type: 'list', items: ['Improved student outcomes', 'Stronger teaching practices', 'Better alignment across departments', 'Increased parent trust and satisfaction'] },
        ],
      },
      {
        heading: 'Partnering for Impact',
        blocks: [
          { type: 'text', text: 'At Mwanicole Consultants (Div III of Alpha Group KE), we partner with schools to design practical, research-based solutions that address real challenges in the classroom and beyond. If your institution is ready to elevate performance, strengthen teaching, and create meaningful impact, now is the time to act. Book a consultation today and take the first step toward transformation.' },
        ],
      },
    ],
  },
];

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  // Block right-click, text selection and copy inside the reading modal
  // so content can be read but not easily lifted out as a file/text dump.
  const guardProps = {
    onCopy: (e) => e.preventDefault(),
    onContextMenu: (e) => e.preventDefault(),
    style: { userSelect: 'none', WebkitUserSelect: 'none' },
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-3">
            Insights & Updates
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Articles, tips, and strategies on learning, inclusive education, parenting, and
            institutional growth — from the Mwanicole Consultants team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-lg shadow-md border-t-4 border-yellow-500 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <span className="inline-block text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full mb-4 self-start">
                {post.tag}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>
              <span className="text-yellow-500 text-sm font-semibold mt-auto">
                Read article →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Modal — read-only, no download/print/copy */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div>
                <span className="inline-block text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full mb-3">
                  {selectedPost.tag}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 pr-8 leading-snug">
                  {selectedPost.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Close article"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content - read only */}
            <div className="p-6 space-y-6" {...guardProps}>
              {selectedPost.content.map((section, i) => (
  <div key={i}>
    <h3 className="text-lg font-bold text-yellow-500 mb-2">
      {section.heading}
    </h3>
    <div className="space-y-2">
      {section.blocks.map((block, j) =>
        block.type === 'list' ? (
          <ul key={j} className="space-y-2 mb-3">
            {block.items.map((item, k) => (
              <li key={k} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={j} className="text-gray-700 leading-relaxed">{block.text}</p>
        )
      )}
    </div>
  </div>
))}
            

              <div className="bg-yellow-50 p-4 rounded-lg mt-8">
                <p className="text-gray-700 text-sm">
                  Want to talk through how this applies to your school or family? Reach out
                  to our team via the Contact page and we'll help you take the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResourcesPage = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-3">Tools & Guides</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Downloadable guides, webinar recordings, and support materials. Coming soon.
      </p>
    </div>
  </div>
);

// Testimonials Page Component
const TestimonialsPage = ({ setCurrentPage }) => {
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
  
  const handleContactRedirect = () => {
  setCurrentPage('contact');
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Testimonials</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Here is feedback from our various clients
          </p>
        </div>

        {/* Moriah's Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-yellow-500 mb-6">Moriah's Story</h2>
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
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
              <p className="font-semibold text-yellow-500">
                "Are these your grades?" she asked. "Yes, they are... Am I failing?" was my response. "Not at all, in fact, you qualify for the Vice Chancellor's grant! Your GPA is a consistent 3.6," she answered.
              </p>
            </div>
            <p>
              I had been on the Dean's list since I joined campus and had no idea at all! That is where I realised that I wanted to teach others <span className="font-semibold text-yellow-500">#howtolearn</span>.
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
                  className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
                >
                  <ChevronLeft size={24} className="text-yellow-500" />
                </button>
                
                <h3 className="text-2xl font-bold text-yellow-500 text-center flex-1">
                  {clientJourneys[currentSlide].title}
                </h3>
                
                <button 
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
                >
                  <ChevronRight size={24} className="text-yellow-500" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {clientJourneys[currentSlide].name}
                </h4>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {clientJourneys[currentSlide].tags.map((tag, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
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
                    index === currentSlide ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-yellow-500  text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to rewrite the story of your child's learning journey?</h3>
          <p className="text-xl mb-6">
            Every brain can be taught, especially if matched with the right learning partner.
          </p>
          <button onClick={handleContactRedirect}
          className="bg-white text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};


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
      console.log('Sending to:', API_ENDPOINTS.CONTACT);
      console.log('Form data:', formData);
      
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);

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

  
  // Slideshow images - you can add more images here
  const slideImages = [
    {
      src: "/CSR1.jpeg",
      alt: "Alpha Consulting KE Logo",
      caption: "Welcome to Alpha Consulting KE - Your transformation journey begins here"
    },
    {
      src: "/CSR2.jpeg",
      alt: "personal trauma couching",
      caption: "Join our monthly trauma healing sessions - Every woman is invited to the healing table"
    },
    {
      src: "/CSR3.jpeg",
      alt: "relationship trauma couching",
      caption: "Join our monthly trauma healing sessions - Every woman is invited to the healing table"
    },
    {
      src: "/CSR4.jpeg",
      alt: "relationship trauma couching",
      caption: "Join and connect with other passionate, like-minded individuals"
    },
    {
      src: "/CSR5.jpeg",
      alt: "Psalm 139",
      caption: "You are fearfully and wonderfully made - Psalm 139"
    },
    {
      src: "/CSR6.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/CSR7.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    },
    {
      src: "/CSR8.jpeg",
      alt: "Check services page",
      caption: "Programs Available"
    }
  ];

  // Video Data
  const videoData = {
    src: "/Speech.mp4",
    poster: "/strathmore address.jpg",
    title: "I enjoy meaningful conversations🥳🥳. Class Rep speech on Graduation Day."
  };

  return (

    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to Elevate through your ladder of positive intent? Get in touch with our team today.
          </p>
        </div>
        
        

        <div className="max-w-3xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-yellow-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a 
                    href="mailto:alphagroupkeinfo@gmail.com" 
                    className="text-gray-600 hover:text-yellow-500 transition-colors"
                  >
                    alphagroupkeinfo@gmail.com
                  </a>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-yellow-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Phone Contacts</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Educational Consultancy & Fun Learning Experiences</p>
                      <p className="text-sm text-gray-600 mb-1">Knowell Book Busters/Consultants</p>
                      <a 
                        href="https://wa.me/254729575224" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-yellow-600 transition-colors"
                      >
                        +254-729575224
                      </a>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Coaching & Personal Branding</p>
                      <p className="text-sm text-gray-600 mb-1">Alpha Coaching KE</p>
                      <div className="space-y-1">
                        <a 
                          href="https://wa.me/254731308119" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-yellow-500 hover:text-yellow-600 transition-colors block"
                        >
                          +254-731308119
                        </a>
                        <a 
                          href="https://wa.me/254726089109" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-yellow-500 hover:text-yellow-600 transition-colors block"
                        >
                          +254-726089109
                        </a>
                        {/* Video */}
                          <div className="mt-4">
                            <VideoPlayer 
                            src={videoData.src}
                            poster={videoData.poster}
                            title={videoData.title}
                            autoPlay={false}
                            controls={true}
                           />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Bella Borsa Consultants</p>
                      <a 
                        href="https://wa.me/254710484899" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-yellow-600 transition-colors"
                      >
                        +254-710484899
                      </a>
                      
                      {/* Image Slideshow */}
                      <div className="mb-8">
                      <ImageSlideshow images={slideImages} autoPlay={true} autoPlayInterval={6000} />
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-yellow-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">Bukani Road<br />Nairobi West<br />Off Uhuru Highway</p>
                  <p className="text-sm text-gray-500">In-person and online sessions available</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
              <div className="text-sm text-gray-600">
                <p>Monday - Saturday: 4:30 AM - 10:00 PM</p>
                <p>Sunday: Exclusive Rate Applies </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Connect With Us</h3>
              
              <div className="space-y-6">
                {/* Bella Borsa Consultants */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Bella Borsa Consultants</h4>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/share/1AnPZr75qF/" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Facebook</a>
                    <a href="https://youtube.com/@bellaborsaconsultants?si=otueLsBJo0gtPZ7X" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">YouTube</a>
                  </div>
                </div>
                
                {/* Mwanicole Consultants */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Mwanicole Consultants</h4>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/share/17ehmZdDdB/" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Facebook</a>
                    <a href="https://www.instagram.com/mwanicoleconsult?utm_source=qr&igsh=MWFtbTV2M2ZqZG5peA==" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Instagram</a>
                    <a href="https://www.tiktok.com/@learningcoachmoriah?_r=1&_t=ZM-92Icz2yBi3w" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">TikTok</a>
                    <a href="https://share.google/D15Q7V3Wl4OQccrQf" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Google</a>
                  </div>
                </div>
                
                {/* Alpha Coaching KE */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Alpha Coaching KE</h4>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/share/1Zr2Cb34mh/" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Facebook</a>
                    <a href="https://youtube.com/@elevationcoachke?si=1-BXLSDClbX1hNbv" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">YouTube</a>
                    <a href="https://www.instagram.com/alphacoachingke?utm_source=qr&igsh=M3o0YTA0MzhrNjNq" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Instagram</a>
                    <a href="https://share.google/1TF3vwcLviyxneAmj" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-yellow-500 hover:text-yellow-600">Google</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form*/}
          {/*
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-400'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              Your information is confidential and protected by professional standards.
            </p>
          </div>
          */}
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
                <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-white font-bold text-sm">AC</span>
                </div>
              </div>
              <span className="text-lg font-bold">Alpha Coaching KE</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional therapy with certified coaches and proffessional counseling Psychologists
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
                  href="https://www.facebook.com/share/1AnPZr75qF/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Facebook: Bella Borsa Consultants
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@bellaborsaconsultants?si=otueLsBJo0gtPZ7X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  YouTube: Bella Borsa Consultants
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/17ehmZdDdB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Facebook: Mwanicole Consultants
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mwanicoleconsult?utm_source=qr&igsh=MWFtbTV2M2ZqZG5peA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Instagram: Mwanicole Consultants
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@learningcoachmoriah?_r=1&_t=ZM-92Icz2yBi3w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  TikTok: Mwanicole Consultants
                </a>
              </li>
              <li>
                <a
                  href="https://share.google/D15Q7V3Wl4OQccrQf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Google: Mwanicole Consultants
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1Zr2Cb34mh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Facebook: Alpha Coaching KE
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/alphacoachingke?utm_source=qr&igsh=M3o0YTA0MzhrNjNq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Instagram: Alpha Coaching KE
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@elevationcoachke?si=1-BXLSDClbX1hNbv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Youtube: Alpha Coaching KE
                </a>
              </li>
              <li>
                <a
                  href="https://share.google/1TF3vwcLviyxneAmj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  Google: Alpha Coaching KE
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com/channel/0029Va84vul7IUYQowlo2p2l"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  WhatsApp Channel: How To Learn
                </a>
              </li>
              </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Crisis Hotline: +254726089109</li>
              <li>Crisis Hotline: +254710484899</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Alpha Group KE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  
  );
};

export default App;
