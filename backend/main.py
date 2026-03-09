from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from services.data.data_loader import fetch_filters
from services.sales_metrics import get_sales_metrics
from services.goals_metricts import get_goals_progress
from services.product_performace import get_product_performance
import services.chart_metrics as cm
# configs da API
from api.docs import api_metadata, tags_metadata
from api.security import verify_api_key



app = FastAPI(
    title=api_metadata["title"],
    description=api_metadata["description"],
    version=api_metadata["version"],
    contact=api_metadata["contact"],
    openapi_tags=tags_metadata,
    dependencies=[Depends(verify_api_key)]
)

# CORS
origins = [
    "http://localhost:3000",  # frontend Next.js em dev
    "https://seu-site.vercel.app"  # produção
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "API running"}



# -------------------------------
# FILTER
# -------------------------------
@app.get("/filters",tags=["Filters"])
def get_filters():

    return fetch_filters()
# -------------------------------
# METRICS
# -------------------------------
@app.get("/metrics",tags=["Metrics"])
def metrics( year:int,region:str =None):
    return get_sales_metrics(year,region)


# -------------------------------
# CHARTS
# -------------------------------
@app.get("/monthly_evolution",tags=["Charts"])
def monthly_evolution(year:int,region:str =None):
    return cm.get_monthly_evolution(year,region)

@app.get("/revenue_by_region",tags=["Charts"])
def monthly_evolution(year:int):
    return cm.get_revenue_by_region(year)

@app.get("/business_unit",tags=["Charts"])
def business_unit(year:int,region:str =None):
    return cm.get_business_unit_share(year,region)

@app.get("/top_clients",tags=["Charts"])
def top_clients(year:int,region:str =None):
    return cm.get_top_clients(year,region)

@app.get("/revenue_vs_cost",tags=["Charts"])
def revenue_vs_cost(year:int,region:str =None):
    return cm.get_monthly_revenue_vs_cost(year,region)

@app.get("/yearly_revenue",tags=["Charts"])
def yearly_revenue(year:int,region:str =None):
    return cm.get_compare_yearly_revenue(year,region)

@app.get("/cash_flow",tags=["Charts"])
def cash_flow(year:int,region:str =None):
    return cm.get_cash_flow(year,region)

@app.get("/expenses_by_category",tags=["Charts"])
def expenses_by_category(year:int,region:str =None):
    return cm.get_expenses_by_category(year,region)

# -------------------------------
# GOALS
# -------------------------------
@app.get("/goals",tags=["Goals"])
def goals(year:int,region:str =None):
    return get_goals_progress(year,region)

# -------------------------------
# CHARTS
# -------------------------------
@app.get("/product_performance",tags=["Products"])
def product_performance(year:int):
    return get_product_performance(year)

