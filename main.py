from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FHIR_URL = "https://hapi.fhir.org/baseR4/Patient"

def flatten(resource):
    result = {}
    for k, v in resource.items():
        if isinstance(v, dict):
            for sub_k, sub_v in v.items():
                result[f"{k}.{sub_k}"] = sub_v
        else:
            result[k] = v
    return result

def fetch_data_all_pages(url=FHIR_URL, max_pages=3):
    entries = []
    current_url = url
    pages_fetched = 0
    
    while current_url and pages_fetched < max_pages:
        try:
            response = requests.get(current_url)
            data = response.json()
            entries.extend(data.get("entry", []))
            
            next_link = next((link.get("url") for link in data.get("link", []) if link.get("relation") == "next"), None)
            current_url = next_link
            pages_fetched += 1
        except Exception as e:
            print(f"Error fetching data at page {pages_fetched + 1}: {e}")
            break
            
    return entries

@app.get("/patients")
def get_patients():
    entries = fetch_data_all_pages()
    
    result = []
    for entry in entries:
        resource = entry.get("resource", {})
        flat_resource = flatten(resource)
        
        name_list = resource.get("name", [])
        given_name = "Unknown"
        if name_list:
            given_list = name_list[0].get("given", [])
            if given_list:
                 given_name = given_list[0]

        result.append({
            "id": resource.get("id"),
            "name": given_name,
            "gender": resource.get("gender") or "Unknown",
            "flattened": flat_resource
        })

    return result
