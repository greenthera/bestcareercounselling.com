export interface Faq {
  question: string
  answer: string
}

export interface FaqCategory {
  title: string
  faqs: Faq[]
}

export const homeFaqs: Faq[] = [
  {
    question: 'I have no idea what career I want to choose. Can someone actually help me figure it out?',
    answer:
      'Yes. You do not need to come to us with everything figured out. We first understand what is confusing you, where you are right now and what you are looking for. The assessment helps us understand your personality, interests, motivators, learning style, skills and abilities. We then discuss what these findings mean for you and what career directions you can explore.',
  },
  {
    question: "I have too many career options in my mind and can't decide. What should I do?",
    answer:
      'You do not need another long list of careers. We help you understand which of the options you are considering actually suit you and why. This makes it easier to narrow things down and take a decision with more confidence.',
  },
  {
    question: "I already know what career I want, but I'm not sure if I am making the right decision. Can counselling help?",
    answer:
      'Yes. You can come to us even when you already have a career in mind. We can help you understand whether the choice fits your interests, personality and abilities, and also look at whether there are other options worth considering.',
  },
  {
    question: "What if I don't even know what I am good at?",
    answer:
      'That is something we can work on. The assessment looks at your skills, abilities, interests and personality, which can help bring out strengths and areas that you may not have noticed about yourself.',
  },
  {
    question: "I know what I like, but I don't know if I can make a career out of it. Can you help?",
    answer:
      'Yes. Liking something is one part of the decision. We also look at your abilities, personality, interests and other factors to understand whether that direction could be a good fit for you.',
  },
  {
    question: 'What if I feel like I have chosen the wrong course or career?',
    answer:
      'We first try to understand what is making you feel that way. From there, we can look at your current situation, your profile and the options available to you before deciding whether you should continue, change direction or explore something else.',
  },
  {
    question: 'Can career counselling help me discover careers I have never thought about?',
    answer:
      'Yes. You may be aware of only a few common career options. The assessment and counselling can help you explore other career paths that connect with your interests, personality and abilities.',
  },
  {
    question: 'Will career counselling actually help me understand myself better?',
    answer:
      'That is an important part of the process. The assessment looks at different aspects of you, and during counselling we discuss what those findings mean. Many students come to us looking for career clarity and end up understanding their strengths, interests and areas they need to work on much better.',
  },
]

export const successStoriesFaqs: Faq[] = [
  {
    question: 'My parents want me to choose one career, but I want something completely different. What should I do?',
    answer:
      "This happens with many students. We do not want the discussion to become about who is right or wrong. We look at the student's profile and the different career options and help the family understand why a particular direction may or may not be suitable.",
  },
  {
    question: 'Can parents also understand what their child is actually good at?',
    answer:
      "Yes. Parents are part of many students' career decisions. The assessment and counselling can give them a better understanding of their child's strengths, interests, abilities and possible career directions.",
  },
  {
    question: 'Should parents decide what career their child should choose?',
    answer:
      "Parents have an important role, but the decision also needs to consider the student's interests, abilities and aspirations. Our role is to help bring more clarity to the conversation so the student and family can make a better informed decision.",
  },
  {
    question: "My child is capable, but I don't know where that potential can be used. Can counselling help?",
    answer:
      "Yes. We look at more than just marks. The assessment gives us a broader picture of the student's interests, personality, skills and abilities, which can help us explore where those strengths may fit.",
  },
]

export const whoWeAreFaqs: Faq[] = [
  {
    question: 'What exactly happens during a career counselling session?',
    answer:
      'We first understand where you are and what you are struggling with. The assessment then gives us a better picture of your personality, interests, motivators, learning style, skills and abilities. We discuss the findings with you and use them to explore suitable career directions and what you can do next.',
  },
  {
    question: 'What exactly will I get after taking counselling from Best Career Counselling?',
    answer:
      'The aim is not just to give you a report. You should leave with a better understanding of yourself, more clarity about your career options and a clearer idea of what you should do next.',
  },
  {
    question: 'Will I get one fixed career recommendation or will I have different options?',
    answer:
      'It depends on your profile. The assessment can point towards different career paths with different levels of suitability. We discuss these options with you rather than expecting one career to be right for everyone.',
  },
  {
    question: 'Can parents be part of the counselling process?',
    answer:
      "Yes. Parents can be involved in the process, especially when the career decision is being discussed as a family. We make sure the student's interests, abilities and aspirations are also properly understood.",
  },
  {
    question: 'Can I take counselling even if I have already shortlisted my career, course or colleges?',
    answer:
      'Yes. You do not have to start from zero. If you already have a career, course or college shortlist, we can help you review your thinking, clear your doubts and make a more confident decision.',
  },
  {
    question: 'Do you guarantee admission or guarantee that I will be successful in a particular career?',
    answer:
      'No. We do not believe in making promises about something that depends on many factors. What we can do is help you understand your options, make an informed decision and support you through the relevant counselling or admission process.',
  },
]

export const whatWeDoFaqCategories: FaqCategory[] = [
  {
    title: 'Career Assessment',
    faqs: [
      {
        question: 'Is career counselling just about taking a test and getting a report?',
        answer:
          'No. The assessment is one part of the process. It gives us information about the student, but the counselling is where we discuss what those findings actually mean and how they relate to possible career choices.',
      },
      {
        question: 'What exactly does your career assessment look at?',
        answer:
          'The assessment looks at areas such as career personality, career interests, career motivators and values, learning style, and skills and abilities. These findings are then used to understand possible career directions.',
      },
      {
        question: "What if my career assessment result doesn't match the career I want?",
        answer:
          'We would not simply tell you to follow the report or ignore it. We would discuss the difference with you and look at the bigger picture before you make a decision.',
      },
      {
        question: 'Can a career test really tell me which career is right for me?',
        answer:
          'A test cannot decide your future for you. It can give you useful information about yourself. We use those insights along with counselling to help you understand which career options may suit you.',
      },
      {
        question: 'Will someone actually explain my career assessment report to me?',
        answer:
          'Yes. We do not want you to receive a report and then sit wondering what it all means. The findings are discussed with you so that you can understand them and see how they relate to your career choices.',
      },
      {
        question: 'What if the assessment shows that I need to improve in some areas?',
        answer:
          'That is useful information, not something to worry about. Knowing where you need to improve gives you a chance to work on it. The process can help you become more aware of your strengths as well as areas that need attention.',
      },
      {
        question: 'Can counselling help with things other than choosing a career?',
        answer:
          "Sometimes the things affecting a student's career decision are not only about career. During counselling, areas such as habits, time management, study approach and self development may also come up when they are relevant to the student.",
      },
      {
        question: 'How do I know the counselling will actually be about me and not the same advice everyone gets?',
        answer:
          'The assessment gives us information about your individual profile, and the counselling is based on your situation and the questions you bring to us. We do not expect the same career answer to work for every student.',
      },
    ],
  },
  {
    title: 'After 10th',
    faqs: [
      {
        question: 'I am confused between Science, Commerce and Arts after 10th. How do I decide?',
        answer:
          'Start with understanding yourself rather than what everyone else is choosing. We look at your interests, abilities, personality and the career directions you may want to explore before helping you make the stream decision.',
      },
      {
        question: 'Should I choose my stream only based on my 10th marks?',
        answer:
          'No. Marks are important, but they are not the whole picture. Your interests, abilities and future career direction also need to be considered.',
      },
      {
        question: "What if I want Science but my marks aren't very high?",
        answer:
          'We would not make the decision just by looking at one percentage. We look at your overall profile and the career direction you are considering and then help you understand whether Science is a suitable option for you.',
      },
      {
        question: 'What career options do I have after Commerce or Arts that I may not know about?',
        answer:
          'There are many options beyond the usual careers students hear about. Counselling can help you explore different career paths and understand which ones may be suitable for you.',
      },
      {
        question: 'How do I know which subjects will actually suit me?',
        answer:
          'It depends on more than what you score well in. Your interests, abilities and the kind of career you want to work towards also matter.',
      },
    ],
  },
  {
    title: 'After 12th and Course Selection',
    faqs: [
      {
        question: "I have finished 12th and I am still confused about what to do next. Can you help?",
        answer:
          'Yes. Before jumping into a course or college, we can help you understand what direction suits you. Once that becomes clearer, we can look at courses and the options available to you.',
      },
      {
        question: "I know what career I want, but I don't know which course will take me there.",
        answer:
          'We can help you connect the two. We look at your career goal first and then work towards understanding the courses and academic paths that can take you in that direction.',
      },
      {
        question: 'I have two or three courses in mind. How do I know which one is better for me?',
        answer:
          'There may not be one course that is best for everyone. We look at which option fits your interests, abilities and career plans better.',
      },
      {
        question: "What if I don't get the course or college I wanted?",
        answer:
          'One admission result does not decide your entire career. We can help you look at the other options available and understand which ones still make sense for your goals.',
      },
      {
        question: 'Can you help me understand which entrance exams I should take?',
        answer:
          'Yes. Once your course and career direction are clear, we can help you understand the entrance exams and admission routes relevant to those choices.',
      },
    ],
  },
  {
    title: 'College and UG Admissions',
    faqs: [
      {
        question: "I know what I want to study, but I have no idea which college is right for me. Can you help?",
        answer:
          'Yes. We can help you shortlist and compare colleges based on your course, academic profile, budget, preferred location and career goals.',
      },
      {
        question: "I have already shortlisted a few colleges but I can't decide between them. Can you help?",
        answer:
          'Yes. You can come to us with your existing shortlist. We can help you look at the options in relation to what you actually want from your course and college.',
      },
      {
        question: 'How do I know if a college is actually worth the fees?',
        answer:
          'There is no single answer for every student. We look at the college in relation to your course, career plans, budget and what you expect from your education before helping you make the decision.',
      },
      {
        question: 'Do you help students find colleges outside Gujarat?',
        answer:
          'Yes. We work with students looking at colleges and universities across India, so you can explore options outside Gujarat as well.',
      },
      {
        question: "What if I don't qualify for my preferred entrance exam?",
        answer:
          'Do not assume that you have no options left. Depending on your course and profile, there may be other colleges or admission routes worth considering. We can help you understand those options.',
      },
      {
        question: 'Can you help me compare different admission offers?',
        answer:
          'Yes. If you have more than one option, we can help you compare them and think through the decision before you make your final choice.',
      },
    ],
  },
  {
    title: 'MBA and PGDM Admissions',
    faqs: [
      {
        question: "I have my MBA/PGDM entrance exam score but don't know which colleges I should apply to. Can you help?",
        answer:
          'Yes. We can look at your entrance score, academic background, budget, preferred location, career goals and specialisation interests and help you narrow down suitable options.',
      },
      {
        question: "My CAT/CMAT/XAT/MAT score isn't very good. Do I still have options?",
        answer:
          'You may still have options. Your entrance score is important, but your overall profile and what you are looking for also matter. We can help you understand what is realistically available to you.',
      },
      {
        question: 'Should I do an MBA or PGDM? Which one is better for me?',
        answer:
          'There is no single answer that works for everyone. We can help you understand the difference and then look at which option fits your career plans and the colleges available to you.',
      },
      {
        question: 'How do I choose the right MBA/PGDM college for me?',
        answer:
          'Do not choose only because a college has a big name or advertises a high package. We can help you look at your options based on your goals, budget, profile, location and what you want from the programme.',
      },
      {
        question: 'Can you help me shortlist MBA/PGDM colleges according to my budget?',
        answer: 'Yes. Your budget is one of the things we consider when helping you shortlist realistic MBA and PGDM options.',
      },
      {
        question: "I haven't taken CAT. Do I still have MBA/PGDM options?",
        answer: 'Yes, depending on your profile and the admission routes available. CAT is not the only possible route to an MBA or PGDM.',
      },
      {
        question: 'How should I compare MBA colleges? Fees, placements, ranking, location or ROI?',
        answer:
          'All of these can matter, but what matters most depends on you. We help you look at the different factors together instead of making your decision on one ranking or one placement number.',
      },
      {
        question: 'Can you help me choose the right MBA specialisation?',
        answer:
          'Yes. We can help you understand the different specialisations and see how they fit with your interests, strengths and career plans.',
      },
    ],
  },
]

export const bookingFaqs: Faq[] = [
  {
    question: 'Is the consultation really free?',
    answer: 'Yes — completely free, with no obligation to continue.',
  },
  {
    question: 'Is the session online or in person?',
    answer:
      'Both. We offer online sessions as well as in-person sessions at our Surat, Navsari, Ankleshwar and Valsad locations.',
  },
  {
    question: 'Should my child join the call?',
    answer:
      "Yes, we recommend both the student and parents join — the assessment is for the student, but the conversation works best with everyone involved.",
  },
  {
    question: 'What should I have ready before the call?',
    answer:
      "Nothing formal — just your child's current class, recent marks if handy, and the questions on your mind. We'll guide the rest.",
  },
  {
    question: 'How soon can I get an appointment?',
    answer: "We keep slots open through the week — WhatsApp or call us and we'll find a time that works for you.",
  },
]
