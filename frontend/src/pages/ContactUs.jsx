import React from 'react'
import { motion } from 'framer-motion'

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-sky-100 to-sky-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-black p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Info */}
        <div className="p-10 bg-sky-100 dark:bg-neutral-800 flex flex-col justify-center">
          <motion.h2
            className="text-3xl font-bold mb-4 text-neutral-800 dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            We'd love to hear from you! Fill out the form and we’ll get back as soon as possible.
          </p>
          <ul className="text-neutral-700 dark:text-neutral-300 space-y-2 mt-4 text-sm">
            <li><strong>Email:</strong> contact@nexusai.com</li>
            <li><strong>Phone:</strong> +1 (234) 567-890</li>
            <li><strong>Address:</strong> 123 AI Street, Tech City</li>
          </ul>
        </div>

        {/* Right Side - Form */}
        <form className="p-10 bg-white dark:bg-neutral-900 space-y-5">
          <motion.h3
            className="text-2xl font-semibold text-neutral-800 dark:text-white"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h3>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-neutral-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-neutral-800 dark:text-white"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-neutral-800 dark:text-white"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs;