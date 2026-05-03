export interface Candidate {
  id: string;
  name: string;
  party: string;
  constituency: string;
  education: string;
  achievements: string[];
  socialWork: string;
  image?: string;
}

export interface Interaction {
  role: 'user' | 'assistant';
  content: string;
}
