from fastapi import FastAPI, UploadFile, File, Request, Query # type: ignore
from pydantic import BaseModel # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from openai import OpenAI # type: ignore
from dotenv import load_dotenv # type: ignore
from datetime import datetime
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
        response = client.responses.create(
            model="gpt-4.1",
            input=[
                {
                    "role": "user",
                    "content": [
                        { "type": "input_text", "text": prompt },
                        {
                            "type": "input_image",
                            "image_url": image_base64 if image_base64.startswith('data:image') else f"data:image/jpeg;base64,{image_base64}",
                        },
                    ],
                }
            ],
        )
        return {"result": response.output_text}
    except Exception as e:
        return {"error": str(e)}
    

@app.get("/api/dailyFortune")
async def daily_fortune(birthday: str = Query(..., example="1998-01-10")):
    try:
        today = datetime.now().strftime("%Y-%m-%d")
        key = f"{birthday}-{today}"

        prompt = f"""
You are a fortune teller. Based on the user's birthday ({birthday}) and today's date ({today}), generate one accurate and daily fortune(e.g.: In relationships, it's important to honor your commitments and maintain emotional stability. Don’t let neglect or lack of communication destroy the mutual understanding you once had. Doing some bedside yoga in the morning can help stabilize your emotions for the day and bring a lasting sense of calm and contentment. Financially, things are looking good — being a bit more bold and open in your investments could lead to significant gains.). Be brief, witty, and include an emoji. Use English.
"""

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=60
        )

        return {"fortune": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}    
