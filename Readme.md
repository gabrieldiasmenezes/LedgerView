<div align="center">

<!-- BANNER / LOGO -->
<img src="https://img.shields.io/badge/Financial%20Analytics-Dashboard-0a66c2?style=for-the-badge&logo=databricks&logoColor=white" alt="Financial Analytics Dashboard" height="45"/>

<br/><br/>

# 📊 Financial Analytics Dashboard

### _Enterprise-Grade Data Pipeline · Business Intelligence · KPI Engine_

<br/>

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![Pandas](https://img.shields.io/badge/Pandas-Data%20Processing-150458?style=flat-square&logo=pandas&logoColor=white)](https://pandas.pydata.org)
[![Status](https://img.shields.io/badge/Status-In%20Development-f59e0b?style=flat-square&logo=statuspage&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

<br/>

> **A production-inspired financial analytics pipeline that transforms raw transactional data into  
> structured, dashboard-ready business intelligence — simulating real corporate analytics environments.**

<br/>

---

</div>

## 🔍 Overview

The **Financial Analytics Dashboard** is a data engineering and analytics project designed to replicate the internal data workflows found in real corporate environments.

It ingests simulated transactional sales data, applies a multi-layered transformation pipeline, calculates strategic business KPIs, and outputs structured datasets ready for consumption by dashboard frontends or REST APIs.

This project is built to demonstrate how raw business data flows from a relational database all the way to actionable insights — mirroring tools such as **Power BI**, **Tableau**, and **Looker**.

---

## 🚀 Project Objectives

| Objective | Description |
|---|---|
| 📐 **Financial Data Modeling** | Design a star-schema relational structure for analytical workloads |
| 🗄️ **SQL Dataset Generation** | Populate the database with realistic transactional business data |
| 🐍 **Python Data Extraction** | Load and query data programmatically from SQLite |
| 🧹 **Data Cleaning & Transformation** | Normalize, validate, and prepare data for analysis |
| 📊 **KPI Calculation Engine** | Compute strategic business indicators with growth tracking |
| 📁 **Chart-Ready Data Generation** | Produce structured datasets for frontend visualizations |
| 🔌 **API-Ready Architecture** | Prepare output for Backend API integration (FastAPI) |

---

## 🧠 Business Metrics & KPIs

The analytics engine calculates the following **core financial and operational KPIs**:

<br/>

| KPI | Description |
|---|---|
| 💰 **Total Revenue** | Aggregated income across all transactions |
| 📈 **Net Profit** | Revenue minus total operational costs |
| 🎯 **Profit Margin (%)** | Ratio of net profit to total revenue |
| 🎫 **Average Ticket Size** | Mean revenue value per transaction |
| 📅 **Monthly Revenue Growth** | Month-over-month revenue variation (%) |

> All KPIs include **growth tracking** to enable period-over-period comparisons.

---

## 📈 Analytical Components

The pipeline generates datasets for **9 analytical visualizations**, designed to feed interactive dashboard charts.

<br/>

### 1️⃣ Monthly Profit Evolution
> **Chart type:** Line Chart  
> Tracks profit trends across calendar months — useful for identifying revenue seasonality, cost fluctuations, and profitability patterns.

---

### 2️⃣ Revenue by Region
> **Chart type:** Bar Chart  
> Compares total revenue across geographic regions — identifies the strongest markets and regional business performance.

---

### 3️⃣ Revenue Share by Business Unit
> **Chart type:** Donut / Pie Chart  
> Shows the percentage contribution of each business unit — reveals product line performance and operational structure.

---

### 4️⃣ Top 5 Clients by Revenue
> **Chart type:** Horizontal Bar Chart  
> Ranks the top-performing clients by generated revenue — highlights key business partners and revenue concentration risk.

---

### 5️⃣ Monthly Revenue vs. Cost
> **Chart type:** Combo Chart  
> Side-by-side comparison of monthly revenue and operational costs — provides insight into cost structure and operational efficiency.

---

### 6️⃣ Yearly Revenue Comparison
> **Chart type:** Grouped Bar Chart  
> Current year vs. previous year revenue by month — reveals business growth trends and seasonal performance patterns.

---

### 7️⃣ Cash Flow Analysis
> **Chart type:** Area / Bar Chart  
> Displays monthly revenue, costs, and net balance — visualizes the company's cash flow dynamics and financial health.

---

### 8️⃣ Expense Distribution by Category
> **Chart type:** Pie / Treemap  
> Breaks down operational expenses across categories:

| Category | Icon |
|---|---|
| Personnel | 👥 |
| Marketing | 📣 |
| Technology | 💻 |
| Operational | ⚙️ |
| Administrative | 🗂️ |
| Other | 📦 |

---

### 9️⃣ Product Performance Table
> **Chart type:** Data Table  
> Detailed breakdown per product including: Revenue · Cost · Units Sold · Profit Margin · Performance Trend

---

## 🗄️ Database Design

The project uses a **star-schema inspired** relational database structure — the standard design pattern for analytical data warehouses.

<br/>

### Fact Table

```
┌─────────────────────────────────────────────┐
│                    SALES                    │
├─────────────────────────────────────────────┤
│  sale_date  │  year  │  month  │  region    │
│  client     │  business_unit   │  product   │
│  revenue    │  cost                         │
└─────────────────────────────────────────────┘
```

### Dimension Tables

| Table | Description |
|---|---|
| `regions` | Geographic sales regions |
| `clients` | Client companies |
| `business_units` | Business divisions |
| `products` | Products sold |
| `cost_categories` | Operational cost categories |
| `targets` | Business performance goals and KPI targets |

---

## ⚙️ Data Processing Architecture

The pipeline follows a **layered transformation architecture**, ensuring clean separation of concerns between data layers:

```
┌──────────────────────┐
│      DATABASE        │  ← SQLite (star schema)
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│     DATA LOADER      │  ← fetch_sales_data()
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│    DATA CLEANING     │  ← clean_sales_data()
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  METRICS CALCULATION │  ← get_sales_metrics()
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ CHART DATA GENERATOR │  ← get_monthly_evolution(), etc.
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│     API LAYER        │  ← FastAPI  [⬜ Planned]
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  DASHBOARD FRONTEND  │  ← Next.js + Recharts  [⬜ Planned]
└──────────────────────┘
```

---

## 📂 Project Structure

```
financial-analytics-dashboard/
│
├── 📁 database/
│   └── schema.sql              ← Relational schema definition
│
├── 📁 services/
│   │
│   ├── 📁 data/
│   │   └── data_loader.py      ← Data extraction from SQLite
│   │
│   ├── sales_metrics.py        ← Core KPI calculations
│   ├── chart_metrics.py        ← Chart dataset generation
│   ├── goals_metrics.py        ← Business goal tracking
│   └── product_performance.py  ← Product-level analytics
│
├── 📁 utils/
│   └── clean_data.py           ← Data cleaning & normalization
│
├── test.py                     ← Pipeline validation script
└── README.md
```

---

## 🛠️ Technologies Used

### Core Stack

| Technology | Role | Version |
|---|---|---|
| ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white) | Primary language for data processing | 3.10+ |
| ![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) | Relational database engine | 3.x |
| ![Pandas](https://img.shields.io/badge/-Pandas-150458?style=flat-square&logo=pandas&logoColor=white) | Data transformation and aggregation | 2.x |

### Planned Technologies

| Technology | Role |
|---|---|
| ![FastAPI](https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) | Backend REST API layer |
| ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) | Frontend dashboard framework |
| ![Chart.js](https://img.shields.io/badge/-Recharts-FF6384?style=flat-square&logo=chartdotjs&logoColor=white) | Interactive data visualizations |

---

## 🔄 Data Flow Example

End-to-end pipeline execution from raw data to structured output:

```python
# 1️⃣ — Fetch raw transactional data from the database
data = fetch_sales_data()

# 2️⃣ — Clean and normalize the dataset
data = clean_sales_data(data)

# 3️⃣ — Calculate core business KPIs
kpis = get_sales_metrics(data, year=2024)

# 4️⃣ — Generate chart-ready datasets
monthly     = get_monthly_evolution(data, year=2024)
by_region   = get_revenue_by_region(data, year=2024)
by_unit     = get_business_unit_share(data, year=2024)
top_clients = get_top_clients(data, year=2024)
cash_flow   = get_cash_flow(data, year=2024)

# 5️⃣ — Deliver structured JSON to the frontend / API
```

---

## 📤 Example KPI Output

```json
{
  "revenue": {
    "value": 3000000,
    "growth": 12.5
  },
  "profit": {
    "value": 900000,
    "growth": 9.2
  },
  "margin": {
    "value": 30.0,
    "growth": 2.1
  },
  "average_ticket": {
    "value": 12500,
    "growth": 4.3
  }
}
```

---

## 🧪 Running the Tests

The project includes a validation script to test the entire analytics pipeline end-to-end.

```bash
python test.py
```

**Expected output includes:**

- ✅ Core KPIs (Revenue, Profit, Margin, Ticket)
- ✅ Chart datasets (Monthly, Regional, Business Unit, etc.)
- ✅ Product performance table
- ✅ Expense distribution by category

---

## 🔮 Roadmap & Future Improvements

### Phase 2 — Backend API

> Integration with **FastAPI** to expose analytics as RESTful endpoints.

```
GET  /kpis/{year}
GET  /charts/revenue-region/{year}
GET  /charts/monthly/{year}
GET  /charts/cash-flow/{year}
GET  /products/{year}
GET  /goals/{year}
```

### Phase 3 — Interactive Dashboard Frontend

> A modern, fully interactive dashboard built with **Next.js**, **React**, and **Recharts**.

Planned features:
- 📊 KPI cards with trend indicators
- 🎛️ Year and region filters
- 📉 Multiple chart types (line, bar, donut, combo)
- 📋 Product performance data table
- 📱 Responsive layout

---

## 📋 Project Status

| Stage | Status |
|---|---|
| ✔️ Database design & schema | **Completed** |
| ✔️ Data processing pipeline | **Completed** |
| ✔️ KPI calculation engine | **Completed** |
| ✔️ Chart data generation | **Completed** |
| ⬜ Backend API (FastAPI) | Planned |
| ⬜ Interactive Frontend (Next.js) | Planned |

---

## 👨‍💻 Author

<div align="center">

**Dias**  
_Data Analytics & Systems Development Student_

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github&logoColor=white)](https://github.com)

</div>

---

<div align="center">

_Built with precision and passion for data-driven decision making._  
⭐ **If this project was useful to you, consider giving it a star!**

</div>
