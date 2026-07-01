export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
  duration: string;
  target: string;
}

export interface Membership {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  priceNum: number;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  certification: string;
}

export interface Testimonial {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
