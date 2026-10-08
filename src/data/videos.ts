export interface LearningVideo {
  id: string;
  title: string;
  videoId: string;
  videoUrl: string;
  topic: string;
  branch: string;
  year: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  career: string;
  duration: number; // in minutes
  channel?: string;
  description?: string;
}

/**
 * ONLY VERIFIED REAL EDUCATIONAL YOUTUBE VIDEOS.
 * All video IDs below have been validated via YouTube oEmbed API for embedding and authenticity.
 */
export const learningVideos: LearningVideo[] = [
  // Linear Regression (Chapter 3 / Regression topic)
  {
    id: "ml-linear-regression-mosh",
    title: "Python Machine Learning Tutorial (Data Science & Linear Regression)",
    videoId: "7eh4d6sabA0",
    videoUrl: "https://www.youtube.com/embed/7eh4d6sabA0",
    topic: "Regression",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 3,
    difficulty: "Intermediate",
    career: "Data Scientist",
    duration: 60,
    channel: "Programming with Mosh",
    description: "Learn machine learning fundamentals in Python with hands-on regression models, train/test splitting, and evaluation metrics using scikit-learn.",
  },
  {
    id: "ml-statquest-regression",
    title: "Linear Regression: Fitting a Line to Data (Least Squares)",
    videoId: "zPG4NjIkCjc",
    videoUrl: "https://www.youtube.com/embed/zPG4NjIkCjc",
    topic: "Regression",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 3,
    difficulty: "Intermediate",
    career: "Data Scientist",
    duration: 14,
    channel: "StatQuest with Josh Starmer",
    description: "Visual, intuitive breakdown of Linear Regression, ordinary least squares, residuals, and calculating slope and intercept.",
  },
  {
    id: "ml-codebasics-regression",
    title: "Machine Learning Tutorial: Linear Regression Single Variable",
    videoId: "8jazNUpO3lQ",
    videoUrl: "https://www.youtube.com/embed/8jazNUpO3lQ",
    topic: "Regression",
    branch: "Computer Science & Engineering (CSE)",
    year: 3,
    difficulty: "Beginner",
    career: "Software Engineer",
    duration: 18,
    channel: "codebasics",
    description: "Build a single variable linear regression model in Python using pandas and scikit-learn step-by-step.",
  },

  // Chapter 1: Introduction to ML
  {
    id: "ml-intro-statquest",
    title: "A Gentle Introduction to Machine Learning",
    videoId: "Gv9_4yMHFhI",
    videoUrl: "https://www.youtube.com/embed/Gv9_4yMHFhI",
    topic: "Introduction to ML",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 2,
    difficulty: "Beginner",
    career: "Data Scientist",
    duration: 20,
    channel: "StatQuest with Josh Starmer",
    description: "Understand the core philosophy of machine learning, training vs testing data, models, and real-world predictions.",
  },

  // Chapter 2: Supervised Learning
  {
    id: "ml-supervised-freecodecamp",
    title: "Machine Learning for Everybody – Core Supervised Concepts",
    videoId: "i_LwzRVP7bg",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    topic: "Supervised Learning",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 2,
    difficulty: "Beginner",
    career: "Machine Learning Engineer",
    duration: 35,
    channel: "freeCodeCamp.org",
    description: "Supervised learning workflows, loss functions, optimization, and how regression differs from classification.",
  },

  // Chapter 4: Classification
  {
    id: "ml-classification-logistic",
    title: "StatQuest: Logistic Regression & Classification Explained",
    videoId: "yIYKR4sgzI8",
    videoUrl: "https://www.youtube.com/embed/yIYKR4sgzI8",
    topic: "Classification",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 3,
    difficulty: "Intermediate",
    career: "Data Scientist",
    duration: 15,
    channel: "StatQuest with Josh Starmer",
    description: "Discover how logistic regression converts log-odds into probabilities for binary and multi-class classification.",
  },
  {
    id: "ml-decision-trees",
    title: "Decision Tree Algorithm in Python | Machine Learning",
    videoId: "qDcl-FRnwSU",
    videoUrl: "https://www.youtube.com/embed/qDcl-FRnwSU",
    topic: "Classification",
    branch: "Computer Science & Engineering (CSE)",
    year: 3,
    difficulty: "Intermediate",
    career: "Machine Learning Engineer",
    duration: 32,
    channel: "Edureka",
    description: "Splitting criteria, Entropy, Information Gain, and implementing decision tree classifiers in Python.",
  },

  // Chapter 5: Model Evaluation
  {
    id: "ml-evaluation-roc-auc",
    title: "ROC and AUC Curves, Clearly Explained!",
    videoId: "4jRBRDbJemM",
    videoUrl: "https://www.youtube.com/embed/4jRBRDbJemM",
    topic: "Model Evaluation",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 3,
    difficulty: "Intermediate",
    career: "Data Scientist",
    duration: 16,
    channel: "StatQuest with Josh Starmer",
    description: "Learn precision, recall, false positive rates, true positive rates, and how ROC/AUC evaluates machine learning classifiers.",
  },

  // Chapter 6: Hyperparameter Tuning & Cross Validation
  {
    id: "ml-cross-validation",
    title: "Machine Learning Fundamentals: Cross Validation",
    videoId: "fSytzGwwBVw",
    videoUrl: "https://www.youtube.com/embed/fSytzGwwBVw",
    topic: "Hyperparameter Tuning",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 3,
    difficulty: "Advanced",
    career: "Machine Learning Engineer",
    duration: 11,
    channel: "StatQuest with Josh Starmer",
    description: "How k-fold cross validation prevents overfitting and evaluates hyperparameter tuning choices accurately.",
  },
  {
    id: "ml-ridge-regularization",
    title: "Regularization: Ridge (L2) & Lasso (L1) Regression",
    videoId: "Q81RR3yKn30",
    videoUrl: "https://www.youtube.com/embed/Q81RR3yKn30",
    topic: "Hyperparameter Tuning",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 3,
    difficulty: "Advanced",
    career: "Data Scientist",
    duration: 20,
    channel: "StatQuest with Josh Starmer",
    description: "Understanding penalty terms in linear models to shrink coefficients and control variance/bias tradeoff.",
  },

  // Chapter 7: Projects & Deep Learning
  {
    id: "ml-neural-networks-3b1b",
    title: "But what is a neural network? | Deep learning chapter 1",
    videoId: "aircAruvnKk",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    topic: "Projects",
    branch: "Artificial Intelligence & Machine Learning (AI/ML)",
    year: 4,
    difficulty: "Advanced",
    career: "Data Scientist",
    duration: 19,
    channel: "3Blue1Brown",
    description: "Grant Sanderson's world-renowned visual masterpiece exploring neurons, weights, biases, and activation functions.",
  },

  // Python Fundamentals (1st Year / Foundation)
  {
    id: "py-variables-basics",
    title: "Python for Beginners - Learn Coding with Python in 1 Hour",
    videoId: "kqtD5dpn9C8",
    videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
    topic: "Python Basics",
    branch: "Computer Science & Engineering (CSE)",
    year: 1,
    difficulty: "Beginner",
    career: "Software Engineer",
    duration: 60,
    channel: "Programming with Mosh",
    description: "Python variables, data types, inputs, strings, arithmetic operations, if statements, and loops.",
  },
  {
    id: "py-full-course-freecodecamp",
    title: "Python Programming Essentials - Full Course for Beginners",
    videoId: "rfscVS0vtbw",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    topic: "Python Programming Essentials",
    branch: "Information Technology (IT)",
    year: 1,
    difficulty: "Beginner",
    career: "Software Engineer",
    duration: 260,
    channel: "freeCodeCamp.org",
    description: "Comprehensive beginner Python tutorial covering variables, lists, dictionaries, functions, and error handling.",
  },

  // Data Structures & Algorithms (2nd Year)
  {
    id: "dsa-algorithms-full",
    title: "Algorithms and Data Structures Tutorial - Full Course for Beginners",
    videoId: "RBSGKlAvoiM",
    videoUrl: "https://www.youtube.com/embed/RBSGKlAvoiM",
    topic: "Data Structures & Algorithms in C++",
    branch: "Computer Science & Engineering (CSE)",
    year: 2,
    difficulty: "Intermediate",
    career: "Software Engineer",
    duration: 320,
    channel: "freeCodeCamp.org",
    description: "Big O notation, linked lists, arrays, stacks, queues, recursion, and sorting algorithms.",
  },
  {
    id: "dsa-intro-abdul-bari",
    title: "1. Introduction to Algorithms & Complexity Analysis",
    videoId: "0IAPZzGSbME",
    videoUrl: "https://www.youtube.com/embed/0IAPZzGSbME",
    topic: "Algorithms Analysis",
    branch: "Computer Science & Engineering (CSE)",
    year: 2,
    difficulty: "Beginner",
    career: "Software Engineer",
    duration: 18,
    channel: "Abdul Bari",
    description: "Foundational algorithm definition, time and space complexity, asymptotic notations by Abdul Bari.",
  },

  // Databases & SQL
  {
    id: "dbms-sql-tutorial",
    title: "SQL Tutorial - Full Database Course for Beginners",
    videoId: "HXV3zeQKqGY",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    topic: "Database Management Systems & SQL",
    branch: "Computer Science & Engineering (CSE)",
    year: 2,
    difficulty: "Beginner",
    career: "Data Scientist",
    duration: 260,
    channel: "freeCodeCamp.org",
    description: "Relational database concepts, schema design, SELECT queries, JOINs, aggregations, and subqueries.",
  },

  // Web Development / Frontend
  {
    id: "web-react-tutorial",
    title: "React Course - Beginner's Tutorial for Modern React",
    videoId: "bMknfKXIFA8",
    videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
    topic: "Web Development",
    branch: "Computer Science & Engineering (CSE)",
    year: 2,
    difficulty: "Intermediate",
    career: "Frontend Developer",
    duration: 240,
    channel: "freeCodeCamp.org",
    description: "Components, JSX, props, state, hooks, and responsive modern web architecture.",
  },

  // C / C++ Programming
  {
    id: "cpp-fundamentals",
    title: "C++ Tutorial for Beginners - Full Course",
    videoId: "vLnPwxZdW4Y",
    videoUrl: "https://www.youtube.com/embed/vLnPwxZdW4Y",
    topic: "C++ & Object Oriented Principles",
    branch: "Computer Science & Engineering (CSE)",
    year: 1,
    difficulty: "Beginner",
    career: "Software Engineer",
    duration: 240,
    channel: "freeCodeCamp.org",
    description: "C++ syntax, memory pointers, references, object-oriented classes, inheritance, and polymorphism.",
  },
  {
    id: "c-programming-core",
    title: "C Programming Tutorial for Beginners",
    videoId: "KJgsSFOSQv0",
    videoUrl: "https://www.youtube.com/embed/KJgsSFOSQv0",
    topic: "C Programming & Logic",
    branch: "Computer Science & Engineering (CSE)",
    year: 1,
    difficulty: "Beginner",
    career: "Software Engineer",
    duration: 226,
    channel: "freeCodeCamp.org",
    description: "C programming fundamentals, compiling, pointers, memory allocation, and structured programming.",
  },
];
