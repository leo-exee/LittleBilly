from fastapi import FastAPI, HTTPException
import httpx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

auth = httpx.BasicAuth("techtest@gmail.com", "2OZ58K8MYZV56SFA59NG2PQ2HYW4C6280IT")
base_url = "https://techtest.hiboutik.com/api"


@app.get("/customers")
async def get_all_clients():
    url = f"{base_url}/customers"
    async with httpx.AsyncClient(auth=auth) as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)


@app.get("/customer/lastname/{last_name}")
async def get_client_by_name(last_name: str):
    url = f"{base_url}/customers/search"
    params = {"last_name": last_name}
    async with httpx.AsyncClient(auth=auth) as client:
        response = await client.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)


@app.get("/customer/{customers_id}")
async def get_client(customers_id: str):
    url = f"{base_url}/customer/{customers_id}"
    async with httpx.AsyncClient(auth=auth) as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()[0]
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)


@app.get("/sales/{customers_id}/{page}")
async def get_sales(customers_id: int, page: int = 1):
    url = f"{base_url}/customer/{customers_id}/products_solds"
    params = {"customers_id": customers_id}
    async with httpx.AsyncClient(auth=auth) as client:
        response = await client.get(url, params=params)
        if response.status_code == 200:
            json_response = response.json()
            total_entries = len(json_response)
            total_pages = (total_entries + 4) // 5
            start_index = (page - 1) * 5
            end_index = start_index + 5
            paginated_response = json_response[start_index:end_index]
            response_with_pagination = {
                "page": page,
                "total_pages": total_pages,
                "data": paginated_response
            }
            return response_with_pagination
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
