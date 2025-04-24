import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Scroll, Sparkles, Book, LogIn } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/20">
              <Wand2 className="text-white" size={26} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Wizard
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link
              to="/chat"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
            >
              Enter Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="text-center relative">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Enchant Your Documents
          </h1>
          <p className="text-xl text-purple-100/80 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Transform your documents into magical knowledge with our advanced AI wizardry.
            Upload your scrolls and receive enlightened responses.
          </p>
          <Link
            to="/chat"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 inline-flex items-center space-x-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
          >
            <Sparkles size={20} />
            <span>Begin Your Journey</span>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/50 to-indigo-900/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm border border-purple-500/20 dark:border-gray-600 shadow-xl">
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
              <Scroll className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-purple-100">Mystical Upload</h3>
            <p className="text-purple-200/70">
              Cast your documents into our realm with a simple drag and drop enchantment.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/50 to-indigo-900/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm border border-purple-500/20 dark:border-gray-600 shadow-xl">
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-purple-100">Arcane Analysis</h3>
            <p className="text-purple-200/70">
              Our magical AI deciphers your documents with the precision of ancient wisdom.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/50 to-indigo-900/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm border border-purple-500/20 dark:border-gray-600 shadow-xl">
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
              <Book className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-purple-100">Instant Illumination</h3>
            <p className="text-purple-200/70">
              Receive enlightened answers channeled directly from your document essence.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;