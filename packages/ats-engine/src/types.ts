export interface ATSCheckResult {
  id: string;
  name: string;
  weight: number;
  score: number;
  passed: boolean;
  summary: string;
  details: string[];
}

export interface ATSReport {
  overallScore: number;
  passed: boolean;
  checks: ATSCheckResult[];
  extractedMetrics: {
    emails: string[];
    links: string[];
    quantifiedTokens: string[];
    detectedSections: string[];
  };
  rawTextStream: string;
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
}

export interface StructuredResume {
  name: string;
  title: string;
  location: string;
  contact: {
    email: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  skills: {
    backend: string;
    frontend: string;
    infra: string;
    architecture: string;
  };
  experience: Array<{
    role: string;
    period: string;
    company: string;
    location: string;
    points: string[];
  }>;
  projects: Array<{
    name: string;
    role: string;
    stack: string;
    url?: string;
    points: string[];
  }>;
  education: Array<{
    institution: string;
    period: string;
    degree: string;
    location: string;
  }>;
}
