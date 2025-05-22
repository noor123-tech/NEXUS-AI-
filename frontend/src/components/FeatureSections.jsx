import React from "react";
export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <div className="text-sm font-semibold text-purple-600 uppercase mb-2">
          Powerful Features
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Everything You Need for Content Creation
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Our AI platform offers comprehensive tools for blog writing and sentiment analysis to help you create engaging content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* AI Blog Writing */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-purple-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487c1.291.14 2.318 1.01 2.627 2.258.37 1.55-.148 3.665-.825 5.355-.678 1.69-1.624 3.15-2.37 4.102a48.895 48.895 0 01-3.055 3.304c-.769.737-1.945.748-2.723.01a48.6 48.6 0 01-3.155-3.303c-.76-.95-1.715-2.41-2.403-4.101-.689-1.69-1.218-3.806-.858-5.356a2.707 2.707 0 012.628-2.258c.637 0 1.272.08 1.889.238.595.15 1.205.36 1.792.626.587-.266 1.197-.476 1.792-.626a7.148 7.148 0 011.888-.238z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h.008v.008H15V9z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Blog Writing</h3>
          <p className="text-gray-500 mb-4">Generate high-quality blog posts on any topic with just a few clicks.</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ SEO-optimized content</li>
            <li>✅ Multiple writing styles</li>
            <li>✅ Customizable tone and voice</li>
            <li>✅ Plagiarism-free content</li>
          </ul>
          <a href="#" className="text-purple-600 text-sm mt-4 inline-block">Learn more →</a>
        </div>

        {/* Sentiment Analysis */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-purple-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
          <p className="text-gray-500 mb-4">Analyze the emotional tone of any text to understand audience perception.</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Detailed sentiment scores</li>
            <li>✅ Emotion detection</li>
            <li>✅ Competitor content analysis</li>
            <li>✅ Audience reaction prediction</li>
          </ul>
          <a href="#" className="text-purple-600 text-sm mt-4 inline-block">Learn more →</a>
        </div>

        {/* Content Optimization */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-purple-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1.5M6.364 6.364l-1.06 1.06M3 12h1.5m14.142 0H21M6.364 17.636l-1.06-1.06M12 21v-1.5m5.636-3.864l1.06 1.06M17.636 6.364l1.06-1.06"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Content Optimization</h3>
          <p className="text-gray-500 mb-4">Enhance your existing content with AI-powered suggestions and improvements.</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Readability improvements</li>
            <li>✅ Grammar and style checking</li>
            <li>✅ Keyword optimization</li>
            <li>✅ Content restructuring</li>
          </ul>
          <a href="#" className="text-purple-600 text-sm mt-4 inline-block">Learn more →</a>
        </div>
      </div>
    </section>
  );
}
