# Alignly

AI-powered resume optimization tool that helps job seekers align their resumes with specific job descriptions using GPT.

## 🚀 Features

- **Resume Analysis**: Upload your resume and target job description
- **AI Optimization**: GPT-powered resume rewriting for better job alignment
- **Section Extraction**: Automatic identification of resume sections
- **Improvement Suggestions**: Actionable feedback for resume enhancement
- **Clean UI**: Modern, responsive interface built with Vue 3 + Tailwind CSS

## 🏗️ Architecture

**Monorepo Structure:**

```
/alignly
├── /client           ← Vue 3 + Vite + Tailwind (frontend)
├── /Alignly.Api      ← ASP.NET Core Web API (backend)
└── Alignly.sln       ← Visual Studio solution
```

**Backend (C# .NET 8):**

- ASP.NET Core Web API
- OpenAI GPT integration
- Mock service fallback for testing
- CORS enabled for frontend integration

**Frontend (Vue 3):**

- TypeScript + Composition API
- Tailwind CSS for styling
- Vite for development and building
- API proxy for seamless backend communication

## 🛠️ Setup

### Prerequisites

- .NET 8 SDK
- Node.js (18+)
- Optional: OpenAI API key for real AI features

### Backend Setup

```bash
cd Alignly/Alignly.Api
dotnet restore
dotnet run
```

Backend runs on: `http://localhost:5134`

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🔧 Configuration

### OpenAI API Key (Optional)

Add your OpenAI API key to:

- `appsettings.Development.json`: `"OpenAI": { "ApiKey": "your-key-here" }`
- Or set environment variable: `OPENAI_API_KEY=your-key-here`

Without an API key, the app uses mock responses for testing.

## 🎯 Usage

1. Start both backend and frontend servers
2. Open `http://localhost:5173`
3. Paste your resume in the first textarea
4. Paste the target job description in the second textarea
5. Click "Generate Optimized Resume"
6. Review the AI-optimized resume, extracted sections, and suggestions

## 🚀 Deployment

Ready for deployment to platforms like:

- **Frontend**: Vercel, Netlify
- **Backend**: Azure App Service, AWS, Railway

## 📝 MVP Status

✅ Working frontend-backend integration  
✅ Resume optimization flow  
✅ Error handling and loading states  
✅ Mock service for testing  
✅ Production-ready structure

Ready for real-world testing and deployment!
