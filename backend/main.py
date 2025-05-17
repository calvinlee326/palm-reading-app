from fastapi import FastAPI, UploadFile, File, Request # type: ignore
from pydantic import BaseModel # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from openai import OpenAI # type: ignore
from dotenv import load_dotenv # type: ignore
import os, base64

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

@app.post("/api/analyzePalmImage")
async def analyze_palm_image(request: Request):
    body = await request.json()
    image_base64 = body.get("image_base64")
    
    if not image_base64:
        return {'error': 'Missing image_base64'}
    
    prompt = """
You are a professional palmistry fortune teller. Look at the uploaded palm image and analyze the three major palm lines: life line, heart line, and head line. Then generate a detailed reading in the following five sections with emojis:

1. 💡 Personality  
2. 💰 Wealth  
3. ❤️ Love  
4. 💼 Career  
5. 💪 Health

Keep the tone professional like a fortune teller.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_base64}}
                ]}
            ],
            temperature=0.8,
        )
        return {"result": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}