import streamlit as st
import google.generativeai as genai
import os
import json
import time
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY", "")
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Page Configuration
st.set_page_config(
    page_title="Matdaan: Indian Election AI Assistant",
    page_icon="🇮🇳",
    layout="wide"
)

# Custom Styling
st.markdown("""
    <style>
    .main {
        background-color: #f8fafc;
    }
    .stButton>button {
        width: 100%;
        border-radius: 12px;
        height: 3em;
        background-color: #000080;
        color: white;
    }
    .stTextInput>div>div>input {
        border-radius: 12px;
    }
    .candidate-card {
        background-color: white;
        padding: 2rem;
        border-radius: 24px;
        box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid #f1f5f9;
        margin-bottom: 2rem;
    }
    .saffron-text { color: #FF9933; }
    .navy-text { color: #000080; }
    .green-text { color: #138808; }
    .timer-card {
        background: linear-gradient(135deg, #000080 0%, #000050 100%);
        color: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        margin-bottom: 20px;
    }
    </style>
    """, unsafe_allow_html=True)

# Helper Functions
def get_gemini_response(prompt, history=[], system_instruction=""):
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=system_instruction
    )
    # Convert history to Gemini format
    chat_history = []
    for msg in history:
        role = "user" if msg["role"] == "user" else "model"
        chat_history.append({"role": role, "parts": [msg["content"]]})
    
    chat = model.start_chat(history=chat_history)
    response = chat.send_message(prompt)
    return response.text

def get_candidate_details(name):
    prompt = f"""
    Provide detailed information for the Indian election candidate: {name}.
    If the person is not a known political candidate, provide information about their potential or public standing if applicable, or state if they are not found.
    Include:
    - Education (Highest qualification and institution)
    - Key Achievements (List at least 3 notable things)
    - Social Work/Contributions (What they have done for society)
    - Political Party (Current affiliation)
    - Constituency (Area they represent or contest from)
    
    Return ONLY the response in JSON format:
    {{
        "name": "...",
        "education": "...",
        "achievements": ["...", "..."],
        "socialWork": "...",
        "party": "...",
        "constituency": "..."
    }}
    """
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        return json.loads(response.text)
    except Exception as e:
        st.error(f"Error parsing candidate data: {str(e)}")
        return None

# App Layout
col_title, col_clock = st.columns([3, 1])
with col_title:
    st.title("🇮🇳 Matdaan: Indian Election AI")
    st.markdown("### Empowering Voters through AI-Powered Information")

# Live Clock and Countdown Logic
election_date = datetime(2026, 5, 20, 8, 0, 0)
now = datetime.now()
time_diff = election_date - now

with col_clock:
    st.markdown(f"""
        <div class="timer-card">
            <h4 style="margin:0;">🕒 Live Clock</h4>
            <h2 style="margin:5px 0;">{now.strftime('%H:%M:%S')}</h2>
            <hr style="border-color: rgba(255,255,255,0.2)">
            <p style="margin:0; font-size: 0.8em; opacity: 0.8;">Next Election Countdown</p>
            <h3 style="margin:5px 0;">{time_diff.days}d {time_diff.seconds // 3600}h {(time_diff.seconds // 60) % 60}m</h3>
        </div>
    """, unsafe_allow_html=True)

tabs = st.tabs(["📋 Election Process", "🔍 Candidate Explorer", "📍 Booth Locator", "🤖 AI Assistant"])

# Tab 1: Election Process
with tabs[0]:
    st.header("Understanding the Election Process")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.subheader("1. Voter Registration")
        st.info("""
        - Check eligibility (18+ years).
        - Visit NVSP.in or Voter Helpline App.
        - Submit Form 6 for new registration.
        - Field verification by BLO.
        - Receive your Voter ID (EPIC).
        """)
        
    with col2:
        st.subheader("2. Voting Day")
        st.warning("""
        - Find your polling station.
        - Verification of ID and Finger Inking.
        - EVM (Electronic Voting Machine).
        - VVPAT confirmation slip.
        - Verify your vote was recorded correctly.
        """)
        
    with col3:
        st.subheader("3. Result Tallying")
        st.success("""
        - Secure strongroom storage.
        - Transparent counting with agents.
        - Round-wise tallying.
        - VVPAT slip matching (random).
        - Formal declaration by ECI.
        """)

# Tab 2: Candidate Explorer
with tabs[1]:
    col_explorer, col_side_timer = st.columns([2, 1])
    
    with col_explorer:
        st.header("Explore Your Candidates")
        st.write("Search for any candidate to understand their background, education, and contributions.")
        
        candidate_name = st.text_input("Enter Candidate Name (e.g., Narendra Modi, Rahul Gandhi)", placeholder="Search...")
        
        if st.button("Research Candidate"):
            if candidate_name:
                with st.spinner(f"Analyzing data for {candidate_name}..."):
                    data = get_candidate_details(candidate_name)
                    
                    if data:
                        st.markdown(f"## {data['name']}")
                        st.markdown(f"**Party:** {data['party']} | **Constituency:** {data['constituency']}")
                        
                        c1, c2, c3 = st.columns(3)
                        with c1:
                            st.markdown("### 🎓 Education")
                            st.write(data['education'])
                            
                        with c2:
                            st.markdown("### 🏆 Achievements")
                            for achievement in data['achievements']:
                                st.write(f"- {achievement}")
                                
                        with c3:
                            st.markdown("### 🤝 Social Work")
                            st.write(data['socialWork'])
                    else:
                        st.error("Could not find detailed information. Please try a more specific name.")

    with col_side_timer:
        st.markdown("### 📅 Election Calendar")
        st.date_input("Important Voting Dates", value=election_date.date())
        st.info(f"**Polling Starts:** {election_date.strftime('%B %d, %Y')}")
        st.info(f"**Time Remaining:** {time_diff.days} days, {time_diff.seconds // 3600} hours")
        st.markdown("---")
        st.markdown("#### 🗳️ Campaign Deadlines")
        st.write("- Registration Closes: April 30, 2026")
        st.write("- Campaigning Ends: May 18, 2026")

# Tab 3: Booth Locator
with tabs[2]:
    st.header("📍 Find Your Voting Booth")
    st.write("Enter your PIN code or use your current location to find the nearest polling station.")
    
    pincode = st.text_input("Enter your 6-digit PIN code", max_chars=6)
    
    if st.button("Locate Booths"):
        if pincode:
            with st.spinner(f"Locating booths in {pincode}..."):
                # Mock location data
                st.success(f"Found 3 polling stations near {pincode}")
                
                booths = [
                    {"name": "Government Primary School", "address": "Block A, Street 12", "distance": "0.5 km"},
                    {"name": "Community Center", "address": "Near Market Square", "distance": "1.2 km"},
                    {"name": "Higher Secondary School", "address": "Main Road Junction", "distance": "2.1 km"}
                ]
                
                for booth in booths:
                    with st.expander(f"🏢 {booth['name']} ({booth['distance']})"):
                        st.write(f"**Address:** {booth['address']}")
                        st.write(f"**Status:** Active")
                        st.button(f"Get Directions to {booth['name']}", key=booth['name'])
        else:
            st.error("Please enter a valid PIN code.")

# Tab 4: AI Assistant
with tabs[3]:
    st.header("Election FAQ Assistant")
    st.write("Ask anything about voting rules, rights, or general election queries.")
    
    if "messages" not in st.session_state:
        st.session_state.messages = []

    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    if prompt := st.chat_input("Ask about elections..."):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        with st.chat_message("assistant"):
            sys_msg = "You are a neutral, friendly Indian Election Assistant. Answer questions about the voting process, candidate information, and voter rights clearly and concisely. Use the context of the conversation history to provide better answers."
            response = get_gemini_response(prompt, st.session_state.messages[:-1], sys_msg)
            st.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})

# Sidebar
with st.sidebar:
    st.image("https://upload.wikimedia.org/wikipedia/commons/8/84/Election_Commission_of_India_Logo.png", width=100)
    
    st.markdown("### 🌐 Region Explorer")
    region = st.selectbox("Select Your State/Region", [
        "Maharashtra", "Uttar Pradesh", "Delhi", "Karnataka", "Tamil Nadu", 
        "West Bengal", "Gujarat", "Rajasthan", "Madhya Pradesh", "Others"
    ])
    st.write(f"Showing data for: **{region}**")
    
    st.markdown("---")
    st.markdown("### Useful Links")
    st.markdown("- [National Voter's Service Portal](https://www.nvsp.in/)")
    st.markdown("- [Election Commission of India](https://eci.gov.in/)")
    st.markdown("- [Know Your Candidate](https://affidavit.eci.gov.in/)")
    st.markdown("---")
    st.caption("Matdaan AI is an educational tool. For official information, always refer to the Election Commission of India website.")
