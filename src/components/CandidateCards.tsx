import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, GraduationCap, Trophy, Heart, MapPin, Building2, User2, Loader2 } from 'lucide-react';
import { getCandidateInfo } from '../lib/gemini';
import { Candidate } from '../types';

export default function CandidateExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setError('');
    
    try {
      const data = await getCandidateInfo(searchTerm);
      if (data && data.name) {
        setCandidate({
          id: Math.random().toString(),
          ...data
        });
      } else {
        setError("Could not find detailed information for this candidate. Try a better known name.");
      }
    } catch (err) {
      setError("An error occurred while fetching information.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-navy transition-colors" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Search for a candidate (e.g., Narendra Modi, Rahul Gandhi...)"
          className="w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-2xl card-shadow focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy transition-all"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="absolute right-2 top-2 bottom-2 px-6 bg-navy text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium px-2">{error}</p>
      )}

      <AnimatePresence mode="wait">
        {candidate ? (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl card-shadow overflow-hidden border border-slate-100"
          >
            <div className="bg-linear-to-br from-navy to-slate-800 p-8 text-white relative overflow-hidden">
               {/* Decorative background elements */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <User2 className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full w-fit backdrop-blur-sm">
                   <Building2 className="w-4 h-4 text-saffron" />
                   <span className="text-xs uppercase tracking-widest font-bold">{candidate.party}</span>
                </div>
                <div>
                  <h2 className="text-4xl font-bold font-serif mb-1">{candidate.name}</h2>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.constituency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 grid md:grid-template-columns-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-navy">
                  <GraduationCap className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Education</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl">{candidate.education}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-saffron">
                  <Trophy className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Achievements</h3>
                </div>
                <ul className="space-y-2">
                  {candidate.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700 bg-saffron/5 p-3 rounded-xl">
                      <span className="text-saffron font-bold text-xs mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-green">
                  <Heart className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Social Work</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm bg-green/5 p-4 rounded-2xl">{candidate.socialWork}</p>
              </div>
            </div>
          </motion.div>
        ) : !isSearching && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
            <User2 className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-medium">Enter a candidate name to explore their profile</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
