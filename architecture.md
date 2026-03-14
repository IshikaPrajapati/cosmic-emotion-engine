# Cosmic Emotion Engine Architecture

## Frontend
- HTML, CSS, JS
- Camera or manual emotion input
- Galaxy animation (canvas)
- Relaxation sound (Web Audio API)

## Backend
- Python Flask server
- /emotion endpoint receives emotion input
- Looks up emotion theme & frequency
- Calls Nova API to generate poetic reflection

## AI
- emotion_mapping.json → maps emotions to cosmic themes
- frequency_map.json → maps emotions to sound frequencies
- Nova API generates cosmic poetic messages

## Flow
1. User clicks "Start Camera" or enters emotion manually
2. Frontend sends emotion to `/emotion` endpoint
3. Backend returns:
   - Theme text
   - Frequency for sound
   - Poetic message from Nova
4. Frontend updates:
   - Galaxy animation color
   - Plays sound
   - Displays Nova poem