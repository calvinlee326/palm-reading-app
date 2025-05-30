# ✋ Palm Analysis App 🌟

**Palm Analysis App** is an AI-powered palm reading web application that provides entertaining and insightful personality, love, and fortune analysis by interpreting palm lines. Built with FastAPI + Next.js, and powered by OpenAI's `gpt-4.1` multimodal model, this app is mobile-first and easy to deploy.

🌐 **Live Demo**: [palm-reading-app-iota.vercel.app](https://palm-reading-app-iota.vercel.app)

---

## 🧠 Features

### ✅ Core Functionality (MVP v1)

1. **📸 Palm Image Upload & Analysis**  
   - Upload or take a photo of your palm using your phone  
   - Detect the three major palm lines: life line, head line, and heart line  
   - Send image to OpenAI GPT-4o model for analysis (in development)

2. **✍️ Fun Palm Reading Report (Text-Based)**  
   - Input descriptions of palm lines manually  
   - AI generates a personalized report including:
     - 💡 Personality  
     - 💰 Fortune  
     - ❤️ Love life  
     - 💼 Career  
     - 💪 Health  
   - Supports Traditional Chinese / Simplified Chinese / English  
   - Emojis and a playful astrology-style tone included  

3. **🔮 Daily Horoscope Generator(Building...)**  
   - Input your birthdate to receive a fun, humorous daily message  
   - Built for casual, friendly vibes

---

## 🔧 Tech Stack

| Area        | Technology             |
|-------------|------------------------|
| Frontend    | Next.js 15 (App Router), Tailwind CSS |
| Backend     | FastAPI + Python 3.12  |
| AI API      | OpenAI GPT-4.1          |
| Env/Secrets | dotenv (.env)          |
| Hosting     | Local (dev), Vercel/Render (optional) |
| Auth (planned) | Google OAuth (TBD)  |

---

## 🏗️ System Architecture

```
[ User Phone/PC ]
       ↓
   vercel.app    ← Frontend (Next.js)
       ↓ API Request
    fly.io       ← Backend (FastAPI)
       ↓
  GPT-4o API    ← OpenAI Vision API
```

The system follows a modern cloud-native architecture:
- Frontend is hosted on Vercel for optimal global performance
- Backend runs on fly.io for reliable API processing
- Seamless integration with OpenAI's GPT-4o Vision API
- Mobile-first responsive design for both phone and PC users
