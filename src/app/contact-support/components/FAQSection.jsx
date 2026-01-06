'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
          <Icon name="QuestionMarkCircleIcon" size={24} variant="solid" className="text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-muted-foreground">
            Encuentra respuestas rápidas a consultas comunes
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-all duration-fast"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 bg-background hover:bg-muted transition-colors duration-fast text-left"
              aria-expanded={openIndex === index}
            >
              <span className="font-heading font-semibold text-foreground pr-4">
                {faq?.question}
              </span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                variant="solid"
                className={`flex-shrink-0 text-muted-foreground transition-transform duration-fast ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {openIndex === index && (
              <div className="p-4 bg-card border-t border-border">
                <p className="text-muted-foreground leading-relaxed">
                  {faq?.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

FAQSection.propTypes = {
  faqs: PropTypes?.arrayOf(
    PropTypes?.shape({
      question: PropTypes?.string?.isRequired,
      answer: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};