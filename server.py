import os
import json
from flask import Flask, request, jsonify
from nova_api import get_nova_poem
from prompt_templates import generate_prompt

# --- Setup paths in a portable way ---
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../ai")
EMOTION_FILE = os.path.join(BASE_DIR, "emotion_mapping.json")
FREQUENCY_FILE = os.path.join(BASE_DIR, "frequency_map.json")

# --- Load JSON mapping files safely ---
try:
    with open(EMOTION_FILE, "r") as f:
        emotion_map = json.load(f)
except Exception as e:
    print(f"Error loading emotion mapping: {e}")
    emotion_map = {}

try:
    with open(FREQUENCY_FILE, "r") as f:
        frequency_map = json.load(f)
except Exception as e:
    print(f"Error loading frequency mapping: {e}")
    frequency_map = {}

# --- Flask app ---
app = Flask(__name__)

@app.route("/")
def home():
    return "Cosmic Emotion Engine Backend Running"

@app.route("/emotion", methods=["POST"])
def emotion_handler():
    data = request.json
    emotion = data.get("emotion", "neutral").lower()

    # --- Get theme and frequency from JSON maps ---
    theme = emotion_map.get(emotion, "A calm cosmic energy")
    freq = frequency_map.get(emotion, 432)

    # --- Generate poetic message via Nova (placeholder) ---
    prompt = generate_prompt(emotion, theme)
    poem = get_nova_poem(prompt)

    return jsonify({
        "emotion": emotion,
        "theme": theme,
        "frequency": freq,
        "poem": poem
    })

if __name__ == "__main__":
    # Run on localhost port 5000
    app.run(debug=True)