# Matdaan: Python Streamlit Deployment

This folder contains the Python version of the Matdaan app, ready for deployment on **Streamlit Cloud**.

## Files
- `app.py`: The main application logic.
- `requirements.txt`: Python dependencies.
- `.env.example`: Template for environment variables.

## Local Setup
1. Install Python 3.9+
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file with your `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
4. Run the app:
   ```bash
   streamlit run app.py
   ```

## Deployment to Streamlit Cloud
1. Push these files to a GitHub repository.
2. Link the repository to [Streamlit Cloud](https://share.streamlit.io/).
3. Add `GEMINI_API_KEY` to the **Secrets** section in the Streamlit Cloud dashboard.
