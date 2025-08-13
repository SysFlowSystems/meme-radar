import streamlit as st
import pandas as pd
import requests
import os

API = os.getenv("API_URL", "http://localhost:8088")
MEME = "ibiza-final-boss"

st.set_page_config(page_title="Meme Radar", layout="wide")
st.title("Meme Radar 👀")
st.caption("Counts per hour and spike alerts")

col1, col2 = st.columns([3,1])
with col2:
	api = st.text_input("API URL", value=API, key="api_url")

try:
	ts = requests.get(f"{api}/timeseries/{MEME}", timeout=20).json()
	df = pd.DataFrame(ts)
except Exception as e:
	st.error(f"Could not reach API: {e}")
	df = pd.DataFrame(columns=["ts","count"])

st.subheader("Mentions per hour")
if df.empty:
	st.info("No meme mentions yet. Ingest some posts!")
else:
	df["ts"] = pd.to_datetime(df["ts"])
	df = df.sort_values("ts")
	st.line_chart(df.set_index("ts")["count"])

st.subheader("Spike alerts")
try:
	alerts = requests.get(f"{api}/alerts/{MEME}", timeout=20).json()
except Exception as e:
	alerts = []
	st.error(f"Could not fetch alerts: {e}")

if alerts:
	st.table(alerts)
else:
	st.write("No alerts yet.")


