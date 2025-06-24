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
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
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
              className="w-full h-full object-cover"
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
      case 'packages': return <PackagesPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
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
    { id: 'packages', label: 'Packages' },
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
                alt="Alpha Consultancy KE Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't exist - show initials
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback logo with gold background */}
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-xl">AC</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alpha Consultancy KE</h1>
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
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-700 hover:text-yellow-600'
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
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
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
const HomePage = () => {
  // Add this at the top of your App.jsx file, after the other imports
  // import { ChevronLeft, ChevronRight } from 'lucide-react';
  
  // Slideshow images - you can add more images here
  const slideImages = [
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2025/01/logo-alpha-consulting-ke.jpg",
      alt: "Alpha Consulting KE Logo",
      caption: "Welcome to Alpha Consulting KE - Your transformation journey begins here"
    },
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2025/04/amazeing-mom-program-flier-healing-table.jpg",
      alt: "Amaze-ing Mom Program",
      caption: "Join our monthly trauma healing sessions - Every woman is invited to the healing table"
    },
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2025/03/1000598910.jpg",
      alt: "Psalm 139",
      caption: "You are fearfully and wonderfully made - Psalm 139"
    }
  ];

  return (
    <>
      {/* Hero Section with Slideshow */}
      <section className="bg-gradient-to-r from-yellow-600 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo and Main Heading */}
          <div className="text-center mb-12">
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Alpha Consulting KE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Our logo is a symbol of the reality of how life happens to us. We are visible to the world and ready to live to our fullest potential.
            </p>
          </div>

          {/* Image Slideshow */}
          <div className="mb-8">
            <ImageSlideshow images={slideImages} autoPlay={true} autoPlayInterval={6000} />
          </div>

          <div className="text-center">
            <button className="btn-primary text-lg px-8 py-4 scale-in">
              Start Your Transformation Today
            </button>
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
              <p className="text-yellow-600 font-semibold text-xl">
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
            <p className="text-gray-600 text-lg">Take a moment to reflect on these important questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "Are my relationships thriving, or do I self-sabotage?",
              "Is my work negatively affected by cycles that I just can't seem to break?",
              "Do I feel like some childhood experiences are constantly triggered in my life?",
              "As a leader, am I equipped to manage the teams I work with during crisis moments?",
              "As a parent, am I intentionally helping my child fill any learning gaps they might be facing academically?",
              "Do I feel like I am parenting negatively? Do I constantly feel defeated, implosive or explosive about parenting?"
            ].map((question, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
                <p className="text-gray-700 font-medium">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amaze-ing Mom Program */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's NEW?!</h2>
            <h3 className="text-2xl font-semibold text-yellow-600 mb-6">Amaze-ing Mom Program</h3>
            <p className="text-xl text-gray-600 mb-4">Every month in 2025 is trauma healing month.</p>
            <p className="text-lg text-gray-700 mb-8">Every woman is invited to the online webinar dubbed 'healing table' with Coach Moriah.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">February Theme</h4>
              <p className="text-yellow-600 font-semibold">Unwinding the cord of trauma</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">March Theme</h4>
              <p className="text-yellow-600 font-semibold">Understanding trauma and starting from the middle</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">April Theme</h4>
              <p className="text-yellow-600 font-semibold">Mother wound</p>
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

      
    </>
  );
};

// About Page Component
// About Page Component
const AboutPage = () => {
  // Images for slideshow sections
  const moriahImages = [
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2022/10/nicole-eflier-pic-1.jpg",
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
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2025/01/birthday-pic-1.jpg",
      alt: "Birthday Event",
      caption: "Professional MC services for birthday celebrations"
    },
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2025/01/graduation-edit.png",
      alt: "Graduation Event",
      caption: "Graduation ceremonies and milestone celebrations"
    },
    {
      src: "https://alphagroupke.wordpress.com/wp-content/uploads/2025/01/kiddy-birthdays.jpg",
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
          <h2 className="text-2xl text-yellow-600 font-semibold mb-4">
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
                <a href="https://www.eaipc.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700">
                  Counsellor
                </a>{' '}
                and{' '}
                <a href="https://www.usiu.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700">
                  Psychologist
                </a>.
              </p>
              <p>
                Moriah is an alumnus of{' '}
                <a href="https://strathmore.edu/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700">
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

        {/* Our Approach Section */}
        <div className="bg-yellow-50 p-8 rounded-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              At Alpha Group, our services encompass a holistic approach. We focus on life, purpose, and service 
              to the child and adult to impact the community positively. We value excellence and intentional 
              approaches towards the success of our clients.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-2xl font-bold text-yellow-600 mb-2">
              Helping your child Learn.Transform.Repeat ……. in hours!
            </h4>
            <blockquote className="text-lg italic text-gray-700">
              "Education is not the learning of facts, but the training of the mind to think."
              <footer className="text-sm text-gray-600 mt-2">— Albert Einstein</footer>
            </blockquote>
          </div>
        </div>

        {/* Services Overview Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Transformation in Hours</h3>
            <div className="space-y-4 text-gray-600">
              <p className="text-xl font-semibold text-yellow-600">
                Children and adults experience a full transformation in hours!
              </p>
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
            <ImageSlideshow images={servicesImages} autoPlay={false} />
          </div>
        </div>

        {/* Service Divisions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Service Divisions</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-yellow-600 mb-3">Bella Borsa Consultants</h4>
              <p className="text-gray-600">
                An image consultancy that guides individuals and teams seeking successful transitions through 
                <span className="font-semibold text-yellow-600"> #intentional living</span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-yellow-600 mb-3">Mwanicole Consultants</h4>
              <p className="text-gray-600">
                A consulting firm in matters of Education and Psychology. Our clients enjoy 
                <span className="font-semibold text-yellow-600"> #howtolearn</span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-yellow-600 mb-3">Knowell Book Busters</h4>
              <p className="text-gray-600">
                A learner's experience based on their academic or developmental need towards desired outcomes.
              </p>
            </div>
          </div>

          {/* Service Logos Slideshow */}
          <div className="mb-8">
            <ImageSlideshow images={programLogos} autoPlay={true} autoPlayInterval={4000} />
          </div>
        </div>

        {/* Introduction Forms Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h3>
            <p className="text-lg text-gray-600 mb-6">
              Please introduce yourself and let us know exactly what you would like us to offer you. 
              This clarifies your need and helps us to match you with the best facilitator.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
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
            
            <div className="bg-white p-6 rounded-lg text-center">
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
            
            <div className="bg-white p-6 rounded-lg text-center">
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

        {/* Rates Section */}
        <div className="text-center mb-16">
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

        {/* Events MC Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Events MC Services</h3>
            <h4 className="text-xl text-yellow-600 font-semibold mb-2">What's an event without an MC?</h4>
            <p className="text-lg text-gray-600">Your anxiety ends here!</p>
            <p className="text-lg text-gray-700 mt-4">
              Moriah has a 'midas touch' for kids' events (new-born, graduation, pediatric care hospitalization, 
              infant maternal death, birthdays, baptism, baby dedication, and more)
            </p>
          </div>
          
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
                     className="text-yellow-600 hover:text-yellow-700">
                    Ebru TV - Importance of an Image Consultant
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=eUz60PEX0no&t=66s" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-600 hover:text-yellow-700">
                    Ebru TV - Widows in Kenya and beyond
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/watch/live/?ref=search&v=2212548072103552" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-600 hover:text-yellow-700">
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
                     className="text-yellow-600 hover:text-yellow-700">
                    Parents Africa Magazine - Helping widows rebuild their lives
                  </a>
                </li>
                <li>
                  <a href="https://m.facebook.com/RisingStarKenya/" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-yellow-600 hover:text-yellow-700">
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
  const services = [
    {
      title: "Individual Therapy",
      description: "One-on-one sessions with licensed therapists for personalized mental health support.",
      features: ["Depression & Anxiety", "Trauma & PTSD", "Relationship Issues", "Life Transitions"]
    },
    {
      title: "Couples Therapy",
      description: "Professional guidance for couples working through relationship challenges.",
      features: ["Communication Skills", "Conflict Resolution", "Intimacy Issues", "Pre-marital Counseling"]
    },
    {
      title: "Group Therapy",
      description: "Supportive group sessions focusing on shared experiences and challenges.",
      features: ["Support Groups", "Skills Training", "Peer Support", "Specialized Topics"]
    },
    {
      title: "Family Therapy",
      description: "Comprehensive family counseling to improve relationships and communication.",
      features: ["Family Dynamics", "Parenting Support", "Teen Issues", "Blended Families"]
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of mental health services to meet your unique needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <h4 className="font-semibold text-gray-900 mb-3">What we address:</h4>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
            <div key={index} className={`relative bg-white p-8 rounded-lg shadow-md ${pkg.popular ? 'ring-2 ring-yellow-600' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-yellow-600">{pkg.price}</span>
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
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This is where you'll connect to your backend API
      // Example API call:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', message: '', serviceType: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
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
                <Phone className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">0726089109</p>
                  <p className="text-sm text-gray-500">Available 24/7 for crisis support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">alphagroupkedirector@gmail.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Wellness Street<br />Suite 456<br />City, State 12345</p>
                  <p className="text-sm text-gray-500">In-person and online sessions available</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
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
            
            <div className="space-y-6">
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
                  className="form-input"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="individual">Individual Therapy</option>
                  <option value="couples">Couples Therapy</option>
                  <option value="group">Group Therapy</option>
                  <option value="family">Family Therapy</option>
                  <option value="consultation">General Consultation</option>
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
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Your information is confidential and protected by HIPAA regulations.
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
                  alt="Alpha Consultancy KE Logo"
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
              <span className="text-lg font-bold">Alpha Consultancy KE</span>
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
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  TikTok: @posttraumacoachke
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@PosttraumacoachKE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  YouTube: @PosttraumacoachKE
                </a>
              </li>
              </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Crisis Hotline: 0726089109</li>
              <li>FAQ</li>
              <li>Resources</li>
              <li>Insurance</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Alpha Consultancy KE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  
  );
};

export default App;