import { UserProfile, RoadmapYear, CourseChapter, QuizQuestion, CodingProblem, RecommendedProject } from '../types';

export const defaultUserProfile: UserProfile = {
  name: 'Farhan Patel',
  email: 'farhanpatelpatel43@gmail.com',
  college: 'National Institute of Technology',
  degree: 'B.Tech - Artificial Intelligence & Machine Learning (AI/ML)',
  branch: 'Artificial Intelligence & Machine Learning (AI/ML)',
  currentYear: '3rd Year',
  targetCareer: 'Data Scientist',
  skills: ['Python', 'SQL', 'DSA', 'Machine Learning'],
  dailyStudyTime: '2 hours',
  interests: ['Data Science', 'AI/ML'],
  readinessScore: 88,
  streakDays: 7,
  xp: 1550,
};

export const fourYearRoadmap: RoadmapYear[] = [
  {
    year: 1,
    title: 'Foundation',
    progress: 100,
    status: 'completed',
    description: 'Engineering math, programming fundamentals, logic design, and basic algorithmic thinking.',
    semesters: [
      {
        semester: 1,
        title: 'Semester 1 • Foundations of Computing',
        topics: [
          { id: 'c-lang', title: 'C Programming & Logic', status: 'completed', hours: 45, category: 'Core' },
          { id: 'math-1', title: 'Discrete Mathematics & Calculus', status: 'completed', hours: 40, category: 'Math' },
          { id: 'eng-phy', title: 'Engineering Physics & Hardware Lab', status: 'completed', hours: 30, category: 'Hardware' },
        ],
      },
      {
        semester: 2,
        title: 'Semester 2 • Object Oriented Paradigm',
        topics: [
          { id: 'cpp-oop', title: 'C++ & Object Oriented Principles', status: 'completed', hours: 50, category: 'Core' },
          { id: 'lin-alg', title: 'Linear Algebra & Probability', status: 'completed', hours: 40, category: 'Math' },
          { id: 'py-intro', title: 'Python Programming Essentials', status: 'completed', hours: 35, category: 'Programming' },
        ],
      },
    ],
  },
  {
    year: 2,
    title: 'Core CS',
    progress: 80,
    status: 'completed',
    description: 'Data structures, algorithm analysis, computer architecture, databases, and OS fundamentals.',
    semesters: [
      {
        semester: 3,
        title: 'Semester 3 • Data Structures & Computer Systems',
        topics: [
          { id: 'dsa-1', title: 'Data Structures & Algorithms in C++', status: 'completed', hours: 65, category: 'Algorithms' },
          { id: 'coa', title: 'Computer Organization & Architecture', status: 'completed', hours: 40, category: 'Systems' },
          { id: 'dbms', title: 'Database Management Systems & SQL', status: 'completed', hours: 45, category: 'Databases' },
        ],
      },
      {
        semester: 4,
        title: 'Semester 4 • Systems & Software Foundations',
        topics: [
          { id: 'os', title: 'Operating Systems & Concurrency', status: 'completed', hours: 50, category: 'Systems' },
          { id: 'cn', title: 'Computer Networks & Protocols', status: 'completed', hours: 45, category: 'Networks' },
          { id: 'algo-adv', title: 'Advanced Algorithms & Graph Theory', status: 'completed', hours: 55, category: 'Algorithms' },
        ],
      },
    ],
  },
  {
    year: 3,
    title: 'Specialization',
    progress: 45,
    status: 'in-progress',
    description: 'Specialization in Data Science, Machine Learning pipelines, statistical modeling, and real-world projects.',
    semesters: [
      {
        semester: 5,
        title: 'Semester 5 • Specialization (Data Science & AI)',
        topics: [
          { id: 'ml-fund', title: 'Machine Learning Fundamentals', status: 'completed', hours: 60, category: 'AI/ML' },
          { id: 'stats-ds', title: 'Statistics for Data Science', status: 'in-progress', hours: 40, category: 'Math' },
          { id: 'py-vis', title: 'Python Visualization (Matplotlib/Seaborn)', status: 'pending', hours: 25, category: 'Data' },
          { id: 'sql-adv', title: 'SQL for Data Science & Warehousing', status: 'pending', hours: 35, category: 'Data' },
          { id: 'mini-proj', title: 'Mini Project: Predictive Modeling', status: 'pending', hours: 40, category: 'Projects' },
        ],
      },
      {
        semester: 6,
        title: 'Semester 6 • Deep Learning & Cloud Deployment',
        topics: [
          { id: 'dl-nn', title: 'Deep Learning & Neural Networks', status: 'pending', hours: 65, category: 'AI/ML' },
          { id: 'big-data', title: 'Big Data Processing with Spark', status: 'pending', hours: 45, category: 'Data' },
          { id: 'mlops', title: 'MLOps & Model Deployment (Docker, APIs)', status: 'pending', hours: 40, category: 'Systems' },
        ],
      },
    ],
  },
  {
    year: 4,
    title: 'Placement',
    progress: 10,
    status: 'upcoming',
    description: 'Full capstone project, system design interviews, placement aptitude, mock technical interviews.',
    semesters: [
      {
        semester: 7,
        title: 'Semester 7 • Capstone & Placement Prep',
        topics: [
          { id: 'capstone-1', title: 'Major Capstone Project (Industry Guided)', status: 'pending', hours: 90, category: 'Capstone' },
          { id: 'sys-design', title: 'High-Level & Low-Level System Design', status: 'in-progress', hours: 40, category: 'Interviews' },
          { id: 'mock-interviews', title: 'Mock Coding & DS Technical Rounds', status: 'pending', hours: 30, category: 'Interviews' },
        ],
      },
      {
        semester: 8,
        title: 'Semester 8 • Industry Internship & Placement',
        topics: [
          { id: 'internship', title: '6-Month Industry Internship / FTE', status: 'pending', hours: 120, category: 'Placement' },
          { id: 'paper-pub', title: 'Research Paper / Production Deployment', status: 'pending', hours: 40, category: 'Publication' },
        ],
      },
    ],
  },
];

export const mlChapters: CourseChapter[] = [
  { id: 1, title: 'Introduction to ML', completed: true, duration: '18 min', summary: 'Types of learning, ML workflow, train-test splits.' },
  { id: 2, title: 'Supervised Learning', completed: true, duration: '24 min', summary: 'Classification vs regression, cost functions.' },
  { id: 3, title: 'Regression', completed: false, active: true, duration: '32 min', summary: 'Simple and multiple linear regression, OLS, gradient descent.' },
  { id: 4, title: 'Classification', completed: false, duration: '28 min', summary: 'Logistic regression, Decision trees, Support Vector Machines.' },
  { id: 5, title: 'Model Evaluation', completed: false, duration: '20 min', summary: 'RMSE, R2 score, Precision, Recall, ROC-AUC curve.' },
  { id: 6, title: 'Hyperparameter Tuning', completed: false, duration: '22 min', summary: 'GridSearchCV, RandomSearchCV, regularization (L1/L2).' },
  { id: 7, title: 'Projects', completed: false, duration: '45 min', summary: 'End-to-end regression deployment with Streamlit.' },
];

export const dsaQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the worst-case time complexity of searching an element in an unsorted array of size n?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(log n)' },
      { id: 'C', text: 'O(n)' },
      { id: 'D', text: 'O(n²)' },
    ],
    correctOptionId: 'C',
    explanation: 'In an unsorted array, linear search must check each element sequentially, taking O(n) time in the worst case.',
    difficulty: 'Easy',
  },
  {
    id: 2,
    question: 'Which operation on a dynamic array takes amortized O(1) time?',
    options: [
      { id: 'A', text: 'Insertion at the front' },
      { id: 'B', text: 'Insertion at the end (push_back)' },
      { id: 'C', text: 'Search by value' },
      { id: 'D', text: 'Deletion from the middle' },
    ],
    correctOptionId: 'B',
    explanation: 'Appending an element to a dynamic array takes amortized O(1) because doubling resizing happens infrequently.',
    difficulty: 'Medium',
  },
  {
    id: 3,
    question: 'In a 2D array matrix[R][C], what is the memory address calculation formula using row-major order?',
    options: [
      { id: 'A', text: 'Base + (i * C + j) * size' },
      { id: 'B', text: 'Base + (j * R + i) * size' },
      { id: 'C', text: 'Base + (i + j) * size' },
      { id: 'D', text: 'Base + (i * R + j) * size' },
    ],
    correctOptionId: 'A',
    explanation: 'In row-major ordering, each row spans C columns, so element [i][j] is at Base + (i * C + j) * element_size.',
    difficulty: 'Medium',
  },
  {
    id: 4,
    question: 'What is the time complexity of accessing an element in an array by its index?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(n)' },
      { id: 'C', text: 'O(log n)' },
      { id: 'D', text: 'O(n log n)' },
    ],
    correctOptionId: 'A',
    explanation: 'Arrays allocate contiguous memory blocks, allowing direct pointer arithmetic to read any element at index i in constant O(1) time.',
    difficulty: 'Easy',
  },
  {
    id: 5,
    question: 'Given a sorted array of 1,000,000 items, how many maximum comparisons are needed using Binary Search?',
    options: [
      { id: 'A', text: '1,000,000' },
      { id: 'B', text: '500,000' },
      { id: 'C', text: '20' },
      { id: 'D', text: '100' },
    ],
    correctOptionId: 'C',
    explanation: 'log2(1,000,000) ≈ 19.93, which requires at most 20 comparisons.',
    difficulty: 'Easy',
  },
];

export const codingProblems: CodingProblem[] = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    acceptance: '82%',
    solvedCount: '12.4k',
    status: 'Solved',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input would have exactly one solution.',
    starterCode: `def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    solutionCode: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', output: '[0, 1]' },
    ],
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Medium',
    category: 'Stack',
    acceptance: '67%',
    solvedCount: '8.7k',
    status: 'Todo',
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type and in correct order.",
    starterCode: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    solutionCode: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return len(stack) == 0`,
    testCases: [
      { input: 's = "()"', output: 'True' },
      { input: 's = "()[]{}"', output: 'True' },
      { input: 's = "(]"', output: 'False' },
    ],
  },
  {
    id: 3,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Medium',
    category: 'Linked List',
    acceptance: '74%',
    solvedCount: '9.1k',
    status: 'Todo',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list and return its head.',
    starterCode: `def merge_two_lists(list1, list2):
    # Dummy head approach
    dummy = ListNode(0)
    current = dummy
    while list1 and list2:
        if list1.val < list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    current.next = list1 or list2
    return dummy.next`,
    solutionCode: `def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1; l1 = l1.next
        else:
            tail.next = l2; l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`,
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
  },
  {
    id: 4,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    acceptance: '81%',
    solvedCount: '15.3k',
    status: 'Solved',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the maximum profit you can achieve.',
    starterCode: `def max_profit(prices):
    min_price = float('inf')
    max_p = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_p:
            max_p = p - min_price
    return max_p`,
    solutionCode: `def max_profit(prices):
    min_p, max_p = float('inf'), 0
    for p in prices:
        min_p = min(min_p, p)
        max_p = max(max_p, p - min_p)
    return max_p`,
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
  },
  {
    id: 5,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees',
    acceptance: '65%',
    solvedCount: '6.4k',
    status: 'Attempted',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level).',
    starterCode: `from collections import deque
def level_order(root):
    if not root: return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
    solutionCode: ``,
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
    ],
  },
];

export const recommendedProjects: RecommendedProject[] = [
  {
    id: 1,
    title: 'Student Performance Prediction',
    badge: 'Beginner',
    category: 'Data Science',
    description: 'Predict student academic exam performance using demographic and study habit factors.',
    stepsCount: 7,
    difficulty: 'Easy',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    duration: '2 Weeks',
    overview: 'An end-to-end regression machine learning pipeline that ingests high school demographic data, parental background, and study hours to accurately predict final math and reading exam scores.',
    keyFeatures: [
      'Exploratory Data Analysis (EDA) on 1,000+ student records',
      'Correlation heatmaps & feature engineering',
      'Linear Regression vs Random Forest comparison',
      'Streamlit web UI for live score prediction',
    ],
    steps: [
      'Data collection & cleaning (Kaggle dataset)',
      'Exploratory data analysis & feature encoding',
      'Train-test split & data normalization',
      'Model training with Scikit-learn',
      'Hyperparameter tuning using GridSearchCV',
      'Evaluation with RMSE & R2 Metrics',
      'Packaging as a portfolio GitHub repository',
    ],
  },
  {
    id: 2,
    title: 'Customer Churn Prediction',
    badge: 'Intermediate',
    category: 'AI/ML',
    description: 'Predict customer churn in a telecom company using classification and ensemble models.',
    stepsCount: 9,
    difficulty: 'Medium',
    techStack: ['Python', 'XGBoost', 'Scikit-learn', 'FastAPI'],
    duration: '3 Weeks',
    overview: 'Identify high-risk customers likely to cancel their subscriptions in a subscription SaaS or telecom enterprise. Build a production-ready predictive API using XGBoost and SHAP explainability.',
    keyFeatures: [
      'Handling class imbalance using SMOTE oversampling',
      'SHAP value feature importance analysis',
      'XGBoost ensemble classifier tuning',
      'REST API backend built with FastAPI and Docker',
    ],
    steps: [
      'Customer profile schema definition & ETL',
      'Handling class imbalance with SMOTE',
      'Feature selection using mutual information',
      'Training Logistic Regression baseline',
      'Training XGBoost and LightGBM models',
      'ROC-AUC and Precision-Recall curve evaluation',
      'Model explainability via SHAP values',
      'Building a REST API endpoint in FastAPI',
      'Docker containerization & documentation',
    ],
  },
  {
    id: 3,
    title: 'Financial Fraud Detection',
    badge: 'Advanced',
    category: 'AI/ML',
    description: 'Detect fraudulent credit card transactions using deep learning and anomaly detection.',
    stepsCount: 12,
    difficulty: 'Hard',
    techStack: ['TensorFlow', 'Deep Learning', 'PyTorch', 'Kafka'],
    duration: '5 Weeks',
    overview: 'High-throughput anomaly detection architecture for financial transaction streams with 99.8% precision, utilizing autoencoders and deep sequential neural networks.',
    keyFeatures: [
      'Unsupervised anomaly detection with Autoencoders',
      'Real-time streaming simulation with simulated events',
      'Low latency inference under 15ms',
      'Interactive executive fraud dashboard',
    ],
    steps: [
      'Data preparation on 280,000+ transaction vectors',
      'Dimensionality reduction via PCA analysis',
      'Baseline Isolation Forest & Local Outlier Factor',
      'Building deep Autoencoder neural network in TensorFlow',
      'Reconstruction error threshold calibration',
      'Hyperparameter tuning & cross-validation',
      'Simulated real-time streaming pipeline',
      'Model latency optimization with ONNX',
      'Interactive monitoring dashboard in React',
      'Cloud deployment architecture on Google Cloud / AWS',
      'Security compliance & data masking validation',
      'Comprehensive research paper & portfolio showcase',
    ],
  },
  {
    id: 4,
    title: 'Cloud-Native E-Commerce Microservices',
    badge: 'Intermediate',
    category: 'Cloud',
    description: 'Scalable distributed backend with Kubernetes, Docker, and Redis caching.',
    stepsCount: 10,
    difficulty: 'Medium',
    techStack: ['Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    duration: '4 Weeks',
    overview: 'Design and deploy modern distributed microservices featuring auth, catalog, cart, and payment gateway with zero-downtime rolling deployments.',
    keyFeatures: [
      'Event-driven architecture with message queues',
      'Distributed rate limiting & Redis caching',
      'Kubernetes ingress & auto-scaling pods',
    ],
    steps: [
      'Microservice domain boundaries definition',
      'PostgreSQL relational schema modeling',
      'JWT Auth & role-based access control',
      'Redis caching layer implementation',
      'Docker containerization',
      'Kubernetes deployment manifests & Helm charts',
      'CI/CD pipeline with GitHub Actions',
      'Monitoring with Prometheus & Grafana',
    ],
  },
  {
    id: 5,
    title: 'Vulnerability Scanner & Network Audit Tool',
    badge: 'Advanced',
    category: 'Cyber Security',
    description: 'Automated port scanner, SSL cert auditor, and CVE vulnerability mapper in Python.',
    stepsCount: 8,
    difficulty: 'Hard',
    techStack: ['Python', 'Socket', 'Nmap Lib', 'CVE Database'],
    duration: '3 Weeks',
    overview: 'A security reconnaissance engine that audits web application endpoints, open ports, and maps discovered service banners to known NIST CVE vulnerabilities.',
    keyFeatures: [
      'Multi-threaded TCP/UDP port scanner',
      'SSL/TLS cipher suite security audit',
      'Automated PDF compliance report generation',
    ],
    steps: [
      'Network sockets & multi-threading architecture',
      'Service banner grabbing logic',
      'NIST CVE database API synchronization',
      'Vulnerability scoring engine (CVSS v3)',
      'Interactive CLI and Web dashboard',
      'Automated compliance report generator',
    ],
  },
];
