import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, Users, MessageSquareText, Vote, MapPin, Globe } from 'lucide-react';
import ElectionProcess from './components/ElectionProcess';
import CandidateExplorer from './components/CandidateCards';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<'process' | 'explore'>('process');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white font-bold text-xs ring-4 ring-navy/5">
              M
            </div>
            <h1 className="text-xl font-bold font-serif tracking-tight gradient-text">Matdaan</h1>
          </div>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('process')}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'process' ? 'text-navy' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Info className="w-4 h-4" />
              <span>Election Process</span>
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'explore' ? 'text-navy' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Users className="w-4 h-4" />
              <span>Candidate Explorer</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-5xl font-bold font-serif tracking-tight text-slate-900 leading-tight">
                  Empowering every <span className="text-saffron italic">Indian</span> voter.
                </h2>
                <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                  Understand our democracy, explore candidates, and make your voice count in the upcoming elections.
                </p>
              </div>

              {activeTab === 'process' ? (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 py-2 px-4 bg-navy/5 rounded-full w-fit">
                    <Vote className="w-4 h-4 text-navy" />
                    <span className="text-xs font-bold uppercase tracking-widest text-navy">Step-by-Step Guide</span>
                  </div>
                  <ElectionProcess />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 py-2 px-4 bg-saffron/10 rounded-full w-fit">
                    <Users className="w-4 h-4 text-saffron" />
                    <span className="text-xs font-bold uppercase tracking-widest text-saffron">Candidate Research</span>
                  </div>
                  <CandidateExplorer />
                </div>
              )}
            </section>

            {/* Stats / Impact Section */}
            <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green/20 blur-[120px] rounded-full -mr-32 -mt-32" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/20 blur-[120px] rounded-full -ml-32 -mb-32" />
               
               <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
                  <div className="space-y-1">
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wider">Estimated Voters</p>
                    <p className="text-4xl font-bold font-serif">900M+</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wider">Polling Stations</p>
                    <p className="text-4xl font-bold font-serif">1M+</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wider">Democracy Index</p>
                    <p className="text-4xl font-bold font-serif">World's Largest</p>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar Assistant */}
          <aside className="sticky top-28 space-y-6">
            <div className="flex items-center gap-2 mb-4 px-2">
              <MessageSquareText className="w-5 h-5 text-navy" />
              <h3 className="font-bold text-slate-800">Ask the Assistant</h3>
            </div>
            <AIAssistant />
            <div className="p-6 bg-linear-to-br from-green/5 to-navy/5 rounded-3xl border border-slate-100 text-center space-y-4">
              <div className="flex justify-center">
                <Globe className="w-10 h-10 text-green" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "Our democracy is founded on the conviction that there are extraordinary possibilities in ordinary people."
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm font-medium">© 2026 Matdaan AI • Transparent Elections for a Brighter Future</p>
      </footer>
    </div>
  );
}
