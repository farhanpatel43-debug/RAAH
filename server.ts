import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback smart response generator for RAAH Career Advisor
function getSmartFallback(prompt: string, context?: any): string {
  const p = prompt.toLowerCase();
  const name = context?.name || 'Farhan';
  const branch = context?.branch || 'CSE (AI/ML)';
  const career = context?.targetCareer || 'Data Scientist';
  const currentSkills = context?.skills?.join(', ') || 'Python, SQL, Machine Learning';

  if (p.includes('gap') || p.includes('skill') || p.includes('readiness')) {
    return `Hello ${name}! As an engineering student in ${branch} targeting **${career}**, here is your priority skill gap analysis:

1. **SQL & Data Warehousing (25% gap remaining)**: Master window functions (\`RANK()\`, \`DENSE_RANK()\`, \`LEAD()\`, \`LAG()\`), indexing strategies, and CTEs.
2. **Mathematical Statistics (20% gap)**: Deepen hypothesis testing (p-values, t-tests, ANOVA) and Bayes theorem.
3. **Machine Learning Pipeline (15% gap)**: Move from basic model fitting to cross-validation, regularization (L1/L2), and feature scaling.

**Immediate Next Step**: Spend 30 minutes daily completing the SQL for Data Science track in your RAAH roadmap!`;
  }

  if (p.includes('project') || p.includes('resume') || p.includes('portfolio')) {
    return `Great question, ${name}! For a standout **${career}** portfolio, avoid generic toy projects (like Iris or Titanic). Instead, build:

1. **Customer Churn Prediction API**
   - **Stack**: Python, XGBoost, FastAPI, Docker
   - **Key Highlight**: Handled class imbalance using SMOTE and provided model explainability via SHAP values.
2. **Financial Fraud Detection Stream**
   - **Stack**: PyTorch/TensorFlow, Autoencoders, Streamlit
   - **Key Highlight**: Unsupervised anomaly detection with 99.2% precision on skewed transaction data.

Check out the **Projects tab** in RAAH to get step-by-step implementation roadmaps and starter repositories!`;
  }

  if (p.includes('regression') || p.includes('explain') || p.includes('linear')) {
    return `Here is a clear breakdown of **Linear Regression vs Logistic Regression** for your ML journey:

### 1. Linear Regression (Continuous Target)
- **Goal**: Predict a continuous value (e.g. house price, exam score).
- **Formula**: $y = w_1 x_1 + w_2 x_2 + ... + b$
- **Loss Function**: Mean Squared Error (MSE).

\`\`\`python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
\`\`\`

### 2. Logistic Regression (Binary Classification)
- **Goal**: Predict probability of class membership (0 or 1).
- **Formula**: Pass linear combination through Sigmoid $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.
- **Loss Function**: Binary Cross-Entropy (Log Loss).

You can practice coding both in RAAH's **Learning > Chapter 3 & 4**!`;
  }

  if (p.includes('schedule') || p.includes('time') || p.includes('hours') || p.includes('plan')) {
    return `Here is your customized **2-Hour Daily Study Plan** for ${name} (${branch}, 3rd Year):

- **40 mins | Hands-on Coding / DSA**: Solve 1 Medium LeetCode problem (focus on Arrays, Two Pointers, or Trees).
- **50 mins | Core Specialization**: Work through RAAH's Machine Learning chapters (regression algorithms, math derivations).
- **30 mins | Real-world Project**: Commit incremental code to your Customer Churn or Fraud Detection repository.

Consistency is key! Keeping your 6-day streak alive will compound into 150+ hours of targeted placement prep by next semester.`;
  }

  return `Hello ${name}! I am your **RAAH AI Career & Roadmap Advisor**. 

Here is what I know about you:
- **Student**: ${name}
- **Branch**: ${branch}
- **Current Year**: 3rd Year (Semester 5)
- **Target Goal**: ${career}
- **Current Readiness**: 72%

How can I help you today?
- Ask me to plan your weekly schedule.
- Request an explanation for any ML or DSA algorithm.
- Get advice on overcoming your SQL/Statistics skill gaps.
- Ask for resume project recommendations.`;
}

// AI Agent endpoint
app.post('/api/ai/agent', async (req, res) => {
  try {
    const { prompt, studentContext, conversationHistory } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const isValidKey = Boolean(apiKey && !apiKey.startsWith('MY_') && apiKey.length > 15);

    if (aiClient && isValidKey) {
      try {
        const studentInfo = studentContext
          ? `Student Details:
Name: ${studentContext.name || 'Farhan'}
Branch: ${studentContext.branch || 'Computer Science & Engineering (AI/ML)'}
Year: ${studentContext.currentYear || '3rd Year'}
Target Career: ${studentContext.targetCareer || 'Data Scientist'}
Known Skills: ${studentContext.skills?.join(', ') || 'Python, SQL, DSA, Machine Learning'}
Daily Study Time: ${studentContext.dailyStudyTime || '2 hours'}
Readiness Score: ${studentContext.readinessScore || 72}%
Streak: ${studentContext.streakDays || 6} Days`
          : 'Student: Farhan, 3rd Year CSE (AI/ML) aiming to be a Data Scientist.';

        const systemInstruction = `You are the official RAAH AI Career & Roadmap Advisor for college students (especially Computer Science and AI/ML students).
Your goal is to guide students on their 4-year journey from college fundamentals to top-tier placements.
The current student you are advising is:
${studentInfo}

Guidelines:
- Address the student by their name (${studentContext?.name || 'Farhan'}).
- Be motivating, highly practical, technically precise, and encouraging.
- When explaining code or concepts, provide concise clean Python or C++ code snippets with explanations.
- Recommend actionable steps aligned with their target career (${studentContext?.targetCareer || 'Data Scientist'}).
- Format responses nicely with markdown, bullet points, and code blocks.`;

        // Wrap call with a 6-second timeout to ensure the UI never hangs
        const generatePromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API call timed out')), 6000)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        const reply = response.text || getSmartFallback(prompt, studentContext);
        return res.json({ reply });
      } catch (genAiError) {
        console.warn('Gemini API call failed or timed out, using smart advisor fallback:', genAiError);
        const reply = getSmartFallback(prompt, studentContext);
        return res.json({ reply });
      }
    } else {
      const reply = getSmartFallback(prompt, studentContext);
      return res.json({ reply });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to process request', details: error.message });
  }
});

// Setup Vite in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`RAAH server running on http://0.0.0.0:${port}`);
  });
}

startServer();
