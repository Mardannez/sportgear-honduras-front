'use client';

import PropTypes from 'prop-types';
import ContactHero from './ContactHero';
import WhatsAppSection from './WhatsAppSection';
import ContactForm from './ContactForm';
import BusinessInfo from './BusinessInfo';
import FAQSection from './FAQSection';
import OrderLookup from './OrderLookup';
import SocialMedia from './SocialMedia';
import MapSection from './MapSection';

export default function ContactSupportInteractive({ 
  phoneNumber, 
  businessHours, 
  categories, 
  contactInfo, 
  faqs, 
  socialLinks 
}) {
  return (
    <div className="min-h-screen bg-background">
      <ContactHero />

      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          <WhatsAppSection 
            phoneNumber={phoneNumber} 
            businessHours={businessHours} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactForm categories={categories} />
            <div className="space-y-8">
              <BusinessInfo contactInfo={contactInfo} />
              <OrderLookup />
            </div>
          </div>

          <FAQSection faqs={faqs} />

          <SocialMedia socialLinks={socialLinks} />

          <MapSection />
        </div>
      </div>
    </div>
  );
}

ContactSupportInteractive.propTypes = {
  phoneNumber: PropTypes?.string?.isRequired,
  businessHours: PropTypes?.string?.isRequired,
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      value: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  contactInfo: PropTypes?.shape({
    address: PropTypes?.string?.isRequired,
    phones: PropTypes?.arrayOf(
      PropTypes?.shape({
        label: PropTypes?.string?.isRequired,
        number: PropTypes?.string?.isRequired,
        display: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    emails: PropTypes?.arrayOf(
      PropTypes?.shape({
        label: PropTypes?.string?.isRequired,
        address: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    schedule: PropTypes?.arrayOf(
      PropTypes?.shape({
        days: PropTypes?.string?.isRequired,
        hours: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
  faqs: PropTypes?.arrayOf(
    PropTypes?.shape({
      question: PropTypes?.string?.isRequired,
      answer: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  socialLinks: PropTypes?.arrayOf(
    PropTypes?.shape({
      platform: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired,
      url: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};