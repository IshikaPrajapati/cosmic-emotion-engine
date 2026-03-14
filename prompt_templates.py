def generate_prompt(emotion, theme):
    """
    Returns a prompt string for Nova to generate a cosmic poetic reflection
    based on the user's emotion.
    """
    prompt = f"""
    User is feeling {emotion}.
    Theme: {theme}.
    Write a short cosmic poem (2-3 sentences) to help the user relax and feel calm,
    using imagery of stars, galaxies, and space.
    """
    return prompt.strip()