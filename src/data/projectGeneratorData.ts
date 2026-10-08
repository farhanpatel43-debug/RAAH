import { GeneratedProject } from '../types';

export const sampleGeneratedProjects: GeneratedProject[] = [
  {
    id: 'proj-gen-1',
    title: 'NeuroPulse: Real-Time Multimodal Health Anomaly Detection System',
    codename: 'Project NEUROPULSE',
    category: 'AI/ML & Healthcare',
    yearTarget: '3rd Year Capstone Pre',
    difficulty: 'Advanced',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Redis', 'Docker', 'React'],
    duration: '6-8 Weeks',
    problemStatement:
      'Critical patient monitoring systems generate high-frequency biometric streams with high false alarm rates. Hospitals need an edge-compatible, multi-modal neural architecture capable of fusing ECG, PPG, and SpO2 readings with sub-50ms inference latency.',
    architectureSummary:
      'FastAPI ingestion gateway -> Redis message stream -> PyTorch BiLSTM + Attention inference microservice -> WebSocket push to React dashboard with real-time waveform visualization.',
    phases: [
      {
        phase: 'Phase 1',
        title: 'Data Pipeline & Preprocessing',
        deliverables: [
          'Ingest MIMIC-III and PhysioNet open datasets into parquet formats',
          'Implement Butterworth filter for motion artifact noise removal',
          'Build windowed feature extraction pipeline using NumPy & SciPy',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Model Training & Quantization',
        deliverables: [
          'Train BiLSTM-Attention network achieving 94.8% F1-score',
          'Quantize weights to FP16 using ONNX Runtime for 3.2x faster inference',
          'Implement conformal prediction to generate calibrated uncertainty scores',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Streaming Backend & Containerization',
        deliverables: [
          'Develop async FastAPI endpoints with Redis Pub/Sub stream worker',
          'Containerize ingestion and model services using Docker Compose',
          'Add Prometheus metrics endpoint tracking P99 latency and inference RPS',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Interactive Frontend & Benchmarks',
        deliverables: [
          'Build React dashboard with Canvas-based 60fps ECG streaming oscilloscope',
          'Add emergency alarm trigger notifications and clinician audio alerts',
          'Benchmark end-to-end latency: achieves 38ms average response time',
        ],
      },
    ],
    resumeBulletPoints: [
      'Architected a distributed multimodal health monitoring pipeline using PyTorch, FastAPI, and Redis, streaming 10,000+ biometric signals/sec with sub-40ms P99 latency.',
      'Achieved 94.8% F1-score on PhysioNet dataset by designing a custom BiLSTM-Attention network, reducing false alarms by 38% compared to standard threshold baseline.',
      'Containerized and deployed inference service with ONNX Runtime FP16 quantization, cutting RAM footprint by 55% and enabling deployment on edge hardware.',
    ],
    interviewQuestions: [
      {
        question: 'Why did you choose BiLSTM-Attention over a Transformer for continuous time-series biometrics?',
        answerKey:
          'Transformers have O(N^2) memory complexity with long sequences, while BiLSTMs maintain constant-state recurrent memory which is ideal for streaming 500Hz sensor telemetry on resource-constrained nodes.',
      },
      {
        question: 'How did you handle real-time concurrency without blocking the Python GIL during inference?',
        answerKey:
          'Offloaded inference to a separate background ONNX Runtime worker process communicate over Redis queues while FastAPI runs async event loops for WebSocket clients.',
      },
    ],
  },
  {
    id: 'proj-gen-2',
    title: 'CodeSentinel: Automated Security Vulnerability & AST Leak Detector',
    codename: 'Project SENTINEL',
    category: 'DevOps & Cyber Security',
    yearTarget: '3rd Year Core',
    difficulty: 'Intermediate',
    techStack: ['Python', 'TypeScript', 'Tree-sitter', 'PostgreSQL', 'GitHub Actions'],
    duration: '4-6 Weeks',
    problemStatement:
      'Engineering teams frequently leak cloud credentials, hardcoded JWT secrets, and SQL injection flaws into Git commits. Existing regex scanners yield 40%+ false positives because they lack semantic Abstract Syntax Tree (AST) awareness.',
    architectureSummary:
      'Git pre-commit hook / GitHub Action -> Tree-sitter AST parser -> Security Pattern Engine -> PostgreSQL audit vault -> Interactive web triage dashboard.',
    phases: [
      {
        phase: 'Phase 1',
        title: 'AST Parser & Grammar Setup',
        deliverables: [
          'Integrate Tree-sitter for Python, JavaScript, and Go grammars',
          'Extract identifier tokens, string literals, and sink-source call trees',
          'Construct taint analysis graph for tracking untrusted user inputs',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Detection Rules & Secret Entropy',
        deliverables: [
          'Build Shannon entropy calculator detecting high-randomness API tokens',
          'Formulate 25+ OWASP Top 10 rule patterns (SQLi, SSRF, Path Traversal)',
          'Validate against deliberately vulnerable open-source repositories',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'CI/CD Action & Dashboard',
        deliverables: [
          'Package as a plug-and-play GitHub Action with SARIF report output',
          'Create React dashboard displaying repository vulnerability heatmaps',
          'Store historical scan records with PostgreSQL and Prisma ORM',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Performance & False-Positive Elimination',
        deliverables: [
          'Achieve 98% scan accuracy by filtering test fixtures and dummy keys',
          'Benchmark: scans 100,000 lines of code in under 1.8 seconds',
        ],
      },
    ],
    resumeBulletPoints: [
      'Engineered an AST-powered security scanner with Tree-sitter, parsing 100k+ LOC in <2 seconds and slashing false-positive secret detections by 65%.',
      'Implemented automated taint-analysis and entropy filters covering 25+ OWASP vulnerabilities with direct GitHub Actions SARIF integration.',
      'Designed a full-stack vulnerability management dashboard with React and PostgreSQL, serving real-time risk scores across 15+ microservices.',
    ],
    interviewQuestions: [
      {
        question: 'What is the advantage of AST analysis over regular expressions for static code analysis?',
        answerKey:
          'Regex matches characters blindly without syntax awareness (matching comments or variable names). AST understands the program structure (whether a string is an argument to an exec() function or inside an unused docstring).',
      },
    ],
  },
  {
    id: 'proj-gen-3',
    title: 'CloudMesh: Scalable Serverless Distributed Task Scheduler',
    codename: 'Project CLOUDMESH',
    category: 'Cloud & Distributed Systems',
    yearTarget: '4th Year Major',
    difficulty: 'Advanced',
    techStack: ['Go', 'gRPC', 'Raft Consensus', 'Docker', 'React', 'Prometheus'],
    duration: '8-10 Weeks',
    problemStatement:
      'Modern microservices require high-availability distributed job scheduling capable of surviving worker crashes, network partitions, and spike loads without duplicate execution.',
    architectureSummary:
      'Go control plane running Raft consensus -> gRPC worker heartbeats -> Dynamic task priority queues -> Prometheus metrics exporter.',
    phases: [
      {
        phase: 'Phase 1',
        title: 'Consensus & Leader Election',
        deliverables: [
          'Implement Raft leader election algorithm with randomized election timeouts',
          'Replicated state machine log for cluster state consistency',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'gRPC Worker Communication',
        deliverables: [
          'Define protobuf contracts for TaskRegistration, Heartbeat, and TaskAck',
          'Worker health check monitor with automated re-scheduling upon node failure',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Execution Engine & Dead Letter Queues',
        deliverables: [
          'Exponential backoff retry policy for failed jobs',
          'Dead letter queue with alert notifications',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Chaos Testing & Production Verification',
        deliverables: [
          'Simulate Jepsen-style network partition tests to prove zero split-brain',
          'Benchmark: Handles 5,000 tasks/second across 10 distributed worker nodes',
        ],
      },
    ],
    resumeBulletPoints: [
      'Developed a distributed fault-tolerant task scheduler in Go utilizing Raft consensus, maintaining 99.99% uptime during simulated node partition failures.',
      'Implemented high-throughput gRPC communication processing 5,000 tasks/second across 10 concurrent worker containers.',
      'Integrated dead-letter queues and exponential backoff retry mechanisms, preventing cascading system failures during heavy cluster spikes.',
    ],
    interviewQuestions: [
      {
        question: 'How does Raft handle a split-brain scenario when a network partition separates 5 nodes into 2 and 3?',
        answerKey:
          'Raft requires a strict majority (quorum of 3 out of 5) to commit log entries. The 2-node partition cannot elect a leader or commit entries, preserving consistency.',
      },
    ],
  },
];

export function generateCustomProjectBlueprint(params: {
  branch: string;
  year: string;
  careerGoal: string;
  skills: string[];
  theme?: string;
}): GeneratedProject {
  const { branch, year, careerGoal, skills, theme } = params;
  const primarySkill = skills[0] || 'Python';
  const secondarySkill = skills[1] || 'SQL';
  const id = 'proj-gen-' + Date.now();

  if (careerGoal.toLowerCase().includes('data') || careerGoal.toLowerCase().includes('ml') || branch.includes('AI')) {
    return {
      id,
      title: `${primarySkill}-Powered Predictive Intelligence & Analytics Platform`,
      codename: `PROJECT NEXUS-${branch.slice(0, 3).toUpperCase()}`,
      category: 'Data Science & Machine Learning',
      yearTarget: `${year} Portfolio`,
      difficulty: 'Intermediate',
      techStack: [primarySkill, secondarySkill, 'FastAPI', 'Pandas', 'Scikit-Learn', 'Streamlit / React'],
      duration: '4-6 Weeks',
      problemStatement: `Organizations lack an end-to-end automated platform that processes messy tabular and time-series data, conducts feature drift analysis, and produces explainable model predictions for decision-makers.`,
      architectureSummary: `Data cleaning ingestion -> Automated feature transformation pipeline -> Ensemble model inference (${primarySkill}) -> SHAP explainability layer -> Interactive dashboard.`,
      phases: [
        {
          phase: 'Phase 1',
          title: 'Exploratory Data Analysis & Feature Pipeline',
          deliverables: [
            'Automate missing value imputation and outlier clipping',
            'Generate correlation matrices and mutual information rankings',
            'Build automated unit tests for data schema integrity',
          ],
        },
        {
          phase: 'Phase 2',
          title: 'Model Benchmarking & Explainability',
          deliverables: [
            'Train XGBoost, LightGBM, and Random Forest models with Bayesian hyperparameter tuning',
            'Compute SHAP (SHapley Additive exPlanations) values for global & local interpretability',
            'Achieve >88% validation accuracy with cross-validation',
          ],
        },
        {
          phase: 'Phase 3',
          title: 'Production API & Deployment',
          deliverables: [
            'Wrap prediction pipeline into REST API using FastAPI with Pydantic schemas',
            'Dockerize service for reproducible deployment',
            'Build interactive dashboard displaying prediction confidence intervals',
          ],
        },
        {
          phase: 'Phase 4',
          title: 'Documentation & Recruiter Showcase',
          deliverables: [
            'Write clean README with architecture diagram, installation script, and API docs',
            'Record 2-minute demo video walkthrough highlighting business value',
          ],
        },
      ],
      resumeBulletPoints: [
        `Engineered an end-to-end machine learning analytics system in ${primarySkill} & ${secondarySkill}, automating data ingestion and feature engineering for 50,000+ records.`,
        `Achieved 89.4% ROC-AUC score using gradient boosted ensembles with Bayesian tuning, reducing classification false-positive rate by 28%.`,
        `Integrated SHAP explainability framework and deployed sub-50ms REST endpoints via FastAPI and Docker, improving model transparency for non-technical stakeholders.`,
      ],
      interviewQuestions: [
        {
          question: 'How do you prevent data leakage when doing feature scaling or categorical encoding?',
          answerKey:
            'Always fit scalers and encoders exclusively on the training split inside a Scikit-learn Pipeline, and only transform the test/validation sets.',
        },
        {
          question: 'Why did you use SHAP values instead of standard feature importance?',
          answerKey:
            'Standard tree feature importance (Gini) is biased toward high-cardinality features and does not explain directional impact for individual predictions.',
        },
      ],
    };
  }

  // Default Full-Stack / Software Engineering project
  return {
    id,
    title: `MicroScale: High-Performance Distributed Web Application`,
    codename: `PROJECT ATLAS-${year.slice(0, 1)}`,
    category: 'Full Stack & Cloud Architecture',
    yearTarget: `${year} Showcase`,
    difficulty: 'Intermediate',
    techStack: [primarySkill, 'TypeScript', 'React', 'TailwindCSS', 'PostgreSQL', 'Docker'],
    duration: '4-5 Weeks',
    problemStatement: `Modern web platforms require snappy UI responsiveness, rock-solid authentication, and resilient data persistence capable of handling multi-tenant traffic spikes.`,
    architectureSummary: `React frontend with optimistic UI updates -> Node/Python API gateway with JWT & RBAC -> PostgreSQL relational database with Redis caching.`,
    phases: [
      {
        phase: 'Phase 1',
        title: 'Database Schema & Authentication',
        deliverables: [
          'Design 3NF relational schema in PostgreSQL with indexes on foreign keys',
          'Implement secure JWT token rotation and bcrypt password hashing',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Core REST APIs & CRUD Operations',
        deliverables: [
          'Build paginated search and filter APIs with input sanitization',
          'Implement Redis cache layer to speed up read-heavy queries by 4x',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Responsive Frontend & State Management',
        deliverables: [
          'Build modern responsive UI using React, TailwindCSS, and custom hooks',
          'Add optimistic UI mutations for instant tactile user feedback',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'CI/CD Pipeline & Cloud Deployment',
        deliverables: [
          'Configure GitHub Actions for automated linting and test coverage',
          'Deploy on cloud container host with SSL certificate configuration',
        ],
      },
    ],
    resumeBulletPoints: [
      `Designed and developed a responsive full-stack platform using ${primarySkill}, React, and PostgreSQL, supporting 500+ active user operations.`,
      `Integrated Redis caching for high-traffic endpoints, reducing database query load by 45% and dropping page load latency to under 120ms.`,
      `Automated continuous integration and deployment with GitHub Actions and Docker, ensuring 99.9% uptime and zero-downtime releases.`,
    ],
    interviewQuestions: [
      {
        question: 'How do you protect your API against SQL Injection and XSS attacks?',
        answerKey:
          'Utilize parameterized queries / ORMs for database operations and escape/sanitize all user inputs on both client and server before rendering HTML.',
      },
    ],
  };
}
