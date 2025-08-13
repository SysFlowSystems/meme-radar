import json, httpx
data = json.load(open("sample_data/posts.json"))
r = httpx.post("http://localhost:8088/ingest", json=data, timeout=30.0)
print(r.status_code, r.json())


