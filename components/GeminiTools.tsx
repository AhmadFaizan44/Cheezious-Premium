import React, { useState } from 'react';
import { searchWithGemini } from '../services/geminiService';
import { GeminiSearchResponse } from '../types';

const GeminiTools: React.FC = () => {
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<GeminiSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await searchWithGemini(searchQuery);
      setSearchResult(result);
    } catch (err) {
      console.error(err);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="py-20 bg-black/80 backdrop-blur border-t border-brand-yellow/20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl text-center text-brand-yellow font-serif mb-8">AI Culinary Studio</h2>
        
        {/* Search Tab Only */}
        <div className="bg-brand-gray p-6 rounded-xl border border-white/5">
          <p className="text-sm text-gray-400 mb-4">Ask about ingredients, sourcing, or food history using Google Search Grounding.</p>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="E.g., What is the history of Fettuccine Alfredo?"
              className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow text-white"
            />
            <button disabled={isSearching} type="submit" className="bg-brand-yellow text-brand-dark px-6 rounded-lg font-bold">
              {isSearching ? '...' : 'Ask'}
            </button>
          </form>
          {searchResult && (
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{searchResult.text}</p>
              {searchResult.groundingChunks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 uppercase mb-2">Sources</p>
                  <ul className="space-y-1">
                    {searchResult.groundingChunks.map((chunk, i) => (
                      chunk.web?.uri && (
                        <li key={i}>
                          <a href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-brand-yellow text-sm hover:underline truncate block">
                            {chunk.web.title || chunk.web.uri}
                          </a>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default GeminiTools;