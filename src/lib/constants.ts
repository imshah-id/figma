export const MAJOR_MAP: Record<string, string[]> = {
  Bachelors: [
    "Computer Science",
    "Business Administration",
    "Psychology",
    "Economics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Biology",
    "English Literature",
    "Political Science",
    "Architecture",
  ],
  Masters: [
    "Computer Science",
    "Data Science",
    "Artificial Intelligence",
    "MBA",
    "Finance",
    "Public Health",
    "Mechanical Engineering",
    "Civil Engineering",
    "Cybersecurity",
    "Digital Marketing",
  ],
  PhD: [
    "Computer Science",
    "Physics",
    "Mathematics",
    "Biology",
    "History",
    "Philosophy",
    "Economics",
    "Chemistry",
  ],
  MBA: [
    "General Management",
    "Finance",
    "Marketing",
    "Operations",
    "Strategy",
    "Entrepreneurship",
    "Human Resources",
  ],
};

export const STAGES = {
  PROFILE: "PROFILE",
  DISCOVERY: "DISCOVERY",
  SHORTLIST: "SHORTLIST",
  GUIDANCE: "GUIDANCE",
} as const;

export type StageType = keyof typeof STAGES;

export const STAGE_ORDER: StageType[] = [
  "PROFILE",
  "DISCOVERY",
  "SHORTLIST",
  "GUIDANCE",
];

export const STAGE_LABELS: Record<StageType, string> = {
  PROFILE: "Build Profile",
  DISCOVERY: "Discover Universities",
  SHORTLIST: "Shortlist Universities",
  GUIDANCE: "Application Guidance",
};

export const getStageIndex = (stage: string): number => {
  const index = STAGE_ORDER.indexOf(stage as StageType);
  return index === -1 ? 0 : index;
};

export const DEGREE_OPTIONS = ["Bachelors", "Masters", "PhD", "MBA"];
