import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is NEXUSAI?",
    answer: "NEXUSAI is a powerful AI platform that delivers intelligent solutions for businesses and developers."
  },
  {
    question: "How do I get started?",
    answer: "You can start by signing up on our website and exploring our APIs, SDKs, and documentation."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a 14-day free trial with access to all features—no credit card required."
  },
  {
    question: "Where can I get support?",
    answer: "You can contact our support team via the Contact Us page or join our community on Discord."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-black dark:via-neutral-900 dark:to-neutral-950 px-6 py-16 flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-8">
        <motion.h2
          className="text-4xl font-bold text-center text-neutral-800 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 focus:outline-none flex justify-between items-center"
              >
                <span className="text-lg font-medium text-neutral-800 dark:text-white">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-sky-500"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-neutral-600 dark:text-neutral-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;