import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch, FiHome, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './faq.css';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'monitoring', name: 'Energy Monitoring' },
    { id: 'payments', name: 'Payments & Billing' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'admin', name: 'Electricity Board' },
    { id: 'security', name: 'Security' }
  ];

  const faqItems = [
    {
      category: 'monitoring',
      mainQuestion: "How does real-time energy monitoring work?",
      answer: "Our smart meters collect data every 15 minutes and transmit it securely to our servers. You can view real-time consumption through our mobile app or web dashboard.",
      subQuestions: [
        "How frequently is the energy usage data updated?",
        "Can I view historical energy consumption data?",
        "Is there a mobile alert system for unusual usage patterns?"
      ]
    },
    // Add other FAQ items with categories and answers...

    {
        category: 'payments',
        mainQuestion: "How can I make a payment?",
        answer: "You can make a payment through our mobile app  using various payment methods such as credit/debit cards, net banking, or UPI.",
        subQuestions: [
          "What payment methods are accepted?",
          "Is there a convenience fee for online payments?",
          "Can I set up automatic payments?",
          "How do I view my payment history?",
          "What should I do if my payment fails?"
        ]
      },

      {
        category: 'analytics',
        mainQuestion: "How can I use analytics to reduce my energy consumption?",
        answer: "Our analytics tools provide insights into your energy usage patterns, allowing you to identify areas where you can reduce consumption and save on energy costs.",
        subQuestions: [
          "What are some common energy-saving tips?",
          "Can I set goals for reducing energy consumption?",
          "How can I track my progress in reducing energy usage?"
        ]
      },

      {
        category: 'admin',
        mainQuestion: "How can I report a power outage?",
        answer: "You can report a power outage through our mobile app or web dashboard. Additionally, you can contact our customer support for immediate assistance.",
        subQuestions: [
          "What information do I need to provide when reporting a power outage?",
          "How long does it take to resolve a power outage?",
          "Can I track the status of my power outage report?"
        ]
      },

      {
        category: 'security',
        mainQuestion: "How is my data protected?",
        answer: "We use industry-standard encryption and security protocols to protect your data. All data is transmitted securely and stored in compliance with data protection regulations.",
        subQuestions: [
          "What encryption methods are used?",
          "How often are security audits conducted?",
          "Is my data shared with third parties?"
        ]
      },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.mainQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subQuestions.some(q => q.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  const handleHomeClick = (e) => {
    e.preventDefault();
    document.querySelector('.faq-container').classList.add('fade-out');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="faq-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <a href="/" onClick={handleHomeClick}><FiHome /> Home</a> &gt; FAQ
      </nav>

      <h1 id='faq'>Frequently Asked Questions</h1>

      {/* Search and Filters */}
      <div className="faq-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={selectedCategory === category.id ? 'active' : ''}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      {filteredItems.map((item, index) => (
        <div key={index} className="faq-item">
          <div 
            className="main-question" 
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <span className="chevron">
              {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </span>
            {item.mainQuestion}
          </div>
          
          {expandedIndex === index && (
            <div className="answer-content">
              <p className="main-answer">{item.answer}</p>
              {item.subQuestions.map((subQ, subIndex) => (
                <div key={subIndex} className="sub-question">
                  <strong>{subQ}</strong>
                  <p>Detailed answer for {subQ.toLowerCase()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Still need help?</h2>
        <p>
          Contact our support team via in-website chat or email us at 
          <a href="mailto:metroniq@smartmeter.com">metroniq@smartmeter.com</a>.
        </p>
      </div>
    </div>
  );
};

export default FAQ;