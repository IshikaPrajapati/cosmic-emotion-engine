import requests

# Replace with your actual Nova endpoint & API key
NOVA_API_URL = "https://api.nova.aws.fake-endpoint/generate"
NOVA_API_KEY = "YOUR_NOVA_API_KEY"

def get_nova_poem(prompt):
    """
    Send prompt to Amazon Nova API and get generated text.
    """
    headers = {
        "Authorization": f"Bearer {NOVA_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": prompt,
        "max_tokens": 100
    }
    try:
        response = requests.post(NOVA_API_URL, headers=headers, json=payload)
        data = response.json()
        return data.get("text", "The stars whisper silently...")
    except Exception as e:
        print("Error calling Nova API:", e)
        return "The stars whisper silently..."