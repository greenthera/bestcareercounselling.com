export interface ParentAssessmentQuestion {
  id: number
  question: string
  options: string[]
}

export interface ParentAssessmentSection {
  section: string
  questions: ParentAssessmentQuestion[]
}

export const parentAssessmentSections: ParentAssessmentSection[] = [
  {
    section: 'Understanding Your Child',
    questions: [
      {
        id: 1,
        question: "How well do you understand your child's natural strengths and interests?",
        options: [
          'I understand them very well',
          'I have a general idea',
          'I am still trying to understand them',
          'I am not really sure',
        ],
      },
      {
        id: 2,
        question:
          'When your child performs well in a particular subject, how confident are you that you understand WHY they perform well?',
        options: ['Very confident', 'Fairly confident', 'I am not always sure', 'I mainly look at their marks'],
      },
      {
        id: 3,
        question: "How confident are you that your child's current subjects or stream suit their abilities and interests?",
        options: [
          'Very confident',
          'Fairly confident',
          'I am not completely sure',
          'I am concerned they may not be the right fit',
        ],
      },
    ],
  },
  {
    section: 'Career Exploration',
    questions: [
      {
        id: 4,
        question: 'How familiar are you with career options beyond the commonly chosen professions?',
        options: [
          'Very familiar',
          'I know quite a few options',
          'I know some, but probably not enough',
          'I mostly know the traditional career options',
        ],
      },
      {
        id: 5,
        question:
          'If your child says, "I want to become ______," how confident are you in evaluating whether that career is actually suitable for them?',
        options: [
          'Very confident',
          'I can make a basic judgement',
          'I would need more information',
          'I would not know how to evaluate it',
        ],
      },
      {
        id: 6,
        question:
          "How confident are you about understanding the education and qualification pathways connected to your child's possible career choices?",
        options: ['Very confident', 'Fairly confident', 'I know some of them', 'I find the pathways confusing'],
      },
    ],
  },
  {
    section: 'Career Decision-Making',
    questions: [
      {
        id: 7,
        question: "What influences your family's career-related decisions the most?",
        options: [
          "My child's interests and abilities",
          'Academic performance and marks',
          'Job opportunities and income potential',
          'Family or social expectations',
          'A combination of these',
        ],
      },
      {
        id: 8,
        question: 'How easy is it for you and your child to compare different career options objectively?',
        options: ['Very easy', 'Usually manageable', 'Often difficult', 'We feel confused when comparing options'],
      },
      {
        id: 9,
        question: 'How often does your child change their mind about their future career?',
        options: [
          'Rarely',
          'Occasionally',
          'Quite often',
          'They have very little clarity about what they want',
        ],
      },
    ],
  },
  {
    section: 'Parent–Child Alignment',
    questions: [
      {
        id: 10,
        question: 'How closely do you and your child agree about their future direction?',
        options: ['We are completely aligned', 'We are mostly aligned', 'We have some differences', 'We often disagree'],
      },
      {
        id: 11,
        question:
          "Have you ever worried that your child's career decision may be influenced by marks, friends, trends or other people's expectations rather than genuine suitability?",
        options: ['Not really', 'Sometimes', 'Quite often', 'Yes, this is a major concern'],
      },
    ],
  },
  {
    section: 'Career Planning',
    questions: [
      {
        id: 12,
        question: "How clear is your child's academic and career roadmap for the next few years?",
        options: [
          'Very clear',
          'We have a general direction',
          'We have some ideas, but no clear plan',
          "We don't have a roadmap yet",
        ],
      },
    ],
  },
]

export const parentAssessmentClassOptions = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']

export const parentAssessmentHelpOptions = [
  'Stream Selection',
  'Career Clarity',
  'Career Options',
  'College / Admission Guidance',
  'Career Change',
  'Other',
]

export const parentAssessmentSnapshot = [
  {
    title: 'Understanding Your Child',
    tag: 'Some clarity needed',
    description: "You may understand some of your child's strengths and interests, but there could be more to discover.",
  },
  {
    title: 'Career Exploration',
    tag: 'More exploration may be helpful',
    description: "There may be career possibilities and pathways that you haven't fully considered yet.",
  },
  {
    title: 'Career Decision-Making',
    tag: 'Needs careful evaluation',
    description:
      'Making a career decision becomes more difficult when several factors—marks, interests, expectations and future opportunities—are considered at the same time.',
  },
  {
    title: 'Career Planning',
    tag: 'More structure may be needed',
    description: 'Having a direction is helpful, but a clear academic and career roadmap can make future decisions easier.',
  },
]

export const parentAssessmentHelpsUnderstand = [
  {
    title: 'Career Personality',
    description: 'How your child naturally approaches situations, information and decisions.',
  },
  {
    title: 'Career Interests',
    description: 'The types of activities and career areas your child may naturally be drawn towards.',
  },
  {
    title: 'Skills & Abilities',
    description: 'The abilities that may support different academic and career directions.',
  },
  {
    title: 'Career Motivators',
    description: 'What your child may value in their future work—such as creativity, independence, learning or structure.',
  },
  {
    title: 'Career Clusters',
    description: "Broader areas of careers that may be worth exploring based on your child's overall profile.",
  },
  {
    title: 'Career Direction',
    description: 'How these different factors can be considered together while exploring suitable possibilities.',
  },
]

export const parentAssessmentWhyItMatters = [
  'Wrong career direction',
  'Time wastage',
  'Unnecessary educational expenses',
  'Career dissatisfaction',
]

export const parentAssessmentCompleteChecklist = [
  'Career Personality',
  'Career Interests',
  'Skills & Abilities',
  'Career Motivators',
  'Learning Style',
  'Career Clusters',
  'Career Paths',
  'Areas Needing Improvement',
  'Career Planning & Direction',
]
