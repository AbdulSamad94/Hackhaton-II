from agents import OpenAIChatCompletionsModel, RunConfig, OpenAIResponsesModel
from dotenv import load_dotenv
import os
from openai import AsyncOpenAI

load_dotenv()


# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# if not GEMINI_API_KEY:
#     raise ValueError("GEMINI_API_KEY environment variable is not set.")

# client = AsyncOpenAI(
#     api_key=GEMINI_API_KEY,
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
# )

# model = OpenAIChatCompletionsModel(openai_client=client, model="gemini-2.5-flash")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set.")

client = AsyncOpenAI(
    api_key=OPENAI_API_KEY,
)

model = OpenAIResponsesModel(openai_client=client, model="gpt-4o-mini")

config = RunConfig(model=model, model_provider=client)
