import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Vote, BarChart3, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: "Voter Registration",
    icon: <UserPlus className="w-6 h-6 text-saffron" />,
    description: "The first step to participative democracy.",
    details: [
      "Check eligibility (18+ years, Indian citizen).",
      "Visit NVSP portal or use Voter Helpline App.",
      "Submit Form 6 for new registration.",
      "Field verification by Booth Level Officer (BLO).",
      "Get your Voter ID (EPIC card) delivered."
    ]
  },
  {
    title: "Voting Day",
    icon: <Vote className="w-6 h-6 text-navy" />,
    description: "Your voice, your vote.",
    details: [
      "Locate your polling station.",
      "First officer checks name on electoral roll and ID.",
      "Second officer marks finger with ink and gives chit.",
      "Third officer takes chit and enables EVM.",
      "Press button on EVM; verify with VVPAT slip."
    ]
  },
  {
    title: "Result Tallying",
    icon: <BarChart3 className="w-6 h-6 text-green" />,
    description: "Transparency in counting.",
    details: [
      "EVMs stored in high-security strongrooms.",
      "Counting done in the presence of candidates/agents.",
      "Round-wise counting for each constituency.",
      "A random matching of VVPAT slips with EVM counts.",
      "Official declaration of the winner."
    ]
  }
];

export default function ElectionProcess() {
  return (
    <div className="grid md:grid-template-columns-3 gap-6">
      {steps.map((step, idx) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold font-serif">{step.title}</h3>
          </div>
          <p className="text-slate-600 mb-6 font-medium">{step.description}</p>
          <ul className="space-y-3 mt-auto">
            {step.details.map((detail, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed group">
                <ChevronRight className="w-4 h-4 mt-1 text-slate-300 group-hover:text-navy transition-colors shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
