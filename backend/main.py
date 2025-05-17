from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PalmData(BaseModel):
    life_line: str
    heart_line: str
    head_line: str
    language: str = "en"

@app.post("/api/analyzePalm")
async def analyze_palm(data: PalmData):
    prompt = f"""
You are a witty palm reader. Based on the following palm lines, please write an interesting palm analysis in {data.language}, divided into the following five aspects:
💡 Personality
💰 Fortune
❤️ Love
💼 Career
💪 Health

Palm features are as follows:
- Life Line: {data.life_line}
- Heart Line: {data.heart_line}
- Head Line: {data.head_line}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o",  
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9,
        )
        return {"result": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
