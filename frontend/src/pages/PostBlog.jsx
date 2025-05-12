import React, { useState } from 'react';
import { motion } from 'framer-motion';

const dummyBlogs = [
  {
    title: "The Future of AI",
    content: "AI is transforming industries with innovations in automation, language models, and computer vision.",
    author: "Jane Doe",
    date: "May 1, 2025",
  },
  {
    title: "NexusAI 2.0 Launch",
    content: "We just released NexusAI 2.0 with new APIs and performance upgrades. Check out what's new!",
    author: "Admin",
    date: "May 5, 2025",
  },
  {
    title: "How To Integrate AI in Your App",
    content: "A quick guide to using NexusAI’s API to supercharge your web apps with AI capabilities.",
    author: "Dev Team",
    date: "May 8, 2025",
  },
];

const PostBlog = () => {
  const [blogs, setBlogs] = useState(dummyBlogs);
  const [form, setForm] = useState({ title: "", content: "", author: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      ...form,
      date: new Date().toLocaleDateString(),
    };
    setBlogs([newBlog, ...blogs]);
    setForm({ title: "", content: "", author: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white dark:from-neutral-900 dark:to-black p-6 md:p-10">
      <motion.h1
        className="text-4xl font-bold text-center text-neutral-800 dark:text-white mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Share Your Thoughts
      </motion.h1>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
          className="w-full px-4 py-3 rounded border dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Your Blog Content..."
          required
          rows={4}
          className="w-full px-4 py-3 rounded border dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        ></textarea>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author Name"
          required
          className="w-full px-4 py-3 rounded border dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded font-semibold transition"
        >
          Post Blog
        </button>
      </form>

      {/* Blog List */}
      <div className="max-w-4xl mx-auto mt-12 space-y-6">
        {blogs.map((blog, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">{blog.title}</h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">{blog.content}</p>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              By <span className="font-medium">{blog.author}</span> on {blog.date}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PostBlog;