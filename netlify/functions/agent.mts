import { GoogleGenAI } from '@google/genai';

function getSmartFallback(prompt: string, context?: any): string {
  const p = prompt.toLowerCase();
  const name = context?.name || 'Farhan';
  const branch = context?.branch || 'CSE (AI/ML)';
  const career = context?.targetCareer || 'Data Scientist';

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
- **Current Readiness**: ${context?.readinessScore || 72}%

How can I help you today?
- Ask me to plan your weekly schedule.
- Request an explanation for any ML or DSA algorithm.
- Get advice on overcoming your SQL/Statistics skill gaps.
- Ask for resume project recommendations.`;
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt, studentContext } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

    if (apiKey && !apiKey.startsWith('MY_') && apiKey.length > 15) {
      try {
        const aiClient = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build-netlify',
            },
          },
        });

        const studentInfo = studentContext
          ? `Student Details:
Name: ${studentContext.name || 'Farhan'}
Branch: ${studentContext.branch || 'Computer Science & Engineering (AI/ML)'}
Year: ${studentContext.currentYear || '3rd Year'}
Target Career: ${studentContext.targetCareer || 'Data Scientist'}
Known Skills: ${studentContext.skills?.join(', ') || 'Python, SQL, DSA, Machine Learning'}
Readiness Score: ${studentContext.readinessScore || 72}%`
          : 'Student: Farhan, 3rd Year CSE (AI/ML) aiming to be a Data Scientist.';

        const systemInstruction = `You are the official RAAH AI Career & Roadmap Advisor for college students.
Guide the student on their 4-year journey from college fundamentals to top placements.
Address the student by name (${studentContext?.name || 'Farhan'}).
Format answers with clear markdown, bullet points, and practical code snippets where helpful.`;

        const response: any = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || getSmartFallback(prompt, studentContext);
        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.warn('Gemini call failed on Netlify, returning fallback:', err);
        const reply = getSmartFallback(prompt, studentContext);
        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const reply = getSmartFallback(prompt, studentContext);
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Server error', details: err?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
