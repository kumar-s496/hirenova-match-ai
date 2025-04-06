
import { JobSummary } from "@/components/results/JobSummary";
import { Candidate } from "@/components/results/CandidateCard";

// Mock job data
export const getMockJobData = (): JobSummary => {
  return {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA (Remote)",
    jobType: "Full-time",
    summary: "We are looking for an experienced Frontend Developer to join our growing team. The ideal candidate will have strong experience with React, TypeScript, and modern frontend development practices.",
    requiredSkills: [
      { name: "React", importance: "critical" },
      { name: "TypeScript", importance: "critical" },
      { name: "CSS/SCSS", importance: "critical" },
      { name: "RESTful APIs", importance: "preferred" },
      { name: "GraphQL", importance: "preferred" },
      { name: "Responsive Design", importance: "critical" },
      { name: "Unit Testing", importance: "preferred" },
      { name: "CI/CD", importance: "bonus" },
      { name: "Next.js", importance: "bonus" },
    ],
    responsibilities: [
      "Develop and maintain responsive web applications using React and TypeScript",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Work with backend developers to integrate frontend with APIs",
      "Participate in code reviews and provide constructive feedback",
    ],
    qualifications: [
      "5+ years of experience in frontend development",
      "3+ years of experience with React",
      "Strong proficiency in TypeScript",
      "Experience with modern frontend build tools and workflows",
      "Bachelor's degree in Computer Science or equivalent experience",
    ],
  };
};

// Mock candidate data
export const getMockCandidates = (): Candidate[] => {
  return [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "415-555-1234",
      skills: [
        { name: "React", match: true },
        { name: "TypeScript", match: true },
        { name: "GraphQL", match: true },
        { name: "Next.js", match: true },
        { name: "CSS/SCSS", match: true },
        { name: "Unit Testing", match: true },
        { name: "Redux", match: false },
      ],
      experience: "7 years of frontend development with 5 years of React experience. Led a team of 5 developers at TechCorp.",
      matchScore: 92,
    },
    {
      id: "2",
      name: "Jamie Smith",
      email: "jamie.smith@example.com",
      phone: "415-555-5678",
      skills: [
        { name: "React", match: true },
        { name: "JavaScript", match: false },
        { name: "CSS/SCSS", match: true },
        { name: "RESTful APIs", match: true },
        { name: "Responsive Design", match: true },
        { name: "Angular", match: false },
      ],
      experience: "4 years of frontend development with React and Angular. Worked on e-commerce platforms.",
      matchScore: 78,
    },
    {
      id: "3",
      name: "Morgan Williams",
      email: "morgan.williams@example.com",
      phone: "415-555-9012",
      skills: [
        { name: "React", match: true },
        { name: "TypeScript", match: true },
        { name: "CSS/SCSS", match: true },
        { name: "RESTful APIs", match: true },
        { name: "Vue.js", match: false },
        { name: "Webpack", match: false },
      ],
      experience: "3 years of frontend development. Created responsive web applications for finance sector.",
      matchScore: 67,
    },
    {
      id: "4",
      name: "Taylor Reynolds",
      email: "taylor.reynolds@example.com",
      phone: "415-555-3456",
      skills: [
        { name: "React", match: true },
        { name: "TypeScript", match: true },
        { name: "GraphQL", match: true },
        { name: "CSS/SCSS", match: true },
        { name: "CI/CD", match: true },
        { name: "React Native", match: false },
      ],
      experience: "6 years of frontend development. Specialized in building scalable React applications.",
      matchScore: 85,
    },
    {
      id: "5",
      name: "Jordan Lee",
      email: "jordan.lee@example.com",
      phone: "415-555-7890",
      skills: [
        { name: "JavaScript", match: false },
        { name: "CSS/SCSS", match: true },
        { name: "jQuery", match: false },
        { name: "Bootstrap", match: false },
        { name: "Responsive Design", match: true },
      ],
      experience: "4 years of web development with focus on responsive design and UI/UX implementation.",
      matchScore: 51,
    },
  ];
};

// Simulate file processing delay
export const processFiles = async (files: File[]): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};
