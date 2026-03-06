import pandas as pd
from services.data.data_loader import fetch_sales_data

def get_monthly_evolution(year:int,region:str=None):
    """
        Generates data for the line chart: Profit Evolution by month.
    """
    try:
        df=fetch_sales_data(year,region)

        if df.empty:
            return [{"month": m, "profit": 0} for m in range(1, 13)]
        df['profit']=df['revenue']-df['cost']

        monthly_data=df.groupby('month')['profit'].sum().reset_index()
        all_months=pd.DataFrame({'month':range(1,13)})

        final_df=pd.merge(all_months,monthly_data,on='month',how='left').fillna(0)

        return final_df.to_dict(orient='records')
    except Exception as e:
        print(f"Error generating monthly evolution data: {e}")
        return [{"month": m, "profit": 0} for m in range(1, 13)]


def get_revenue_by_region(year: int):
    """
    Generates data for the bar chart: Total Revenue by Region.
    Note: Here we generally do not filter by region, as the chart is meant to compare them.
    """
    try:
        df=fetch_sales_data(year)

        if df.empty:
            print("No sales data available for the specified year.")
            return []
        region_data=df.groupby('region')['revenue'].sum().sort_values(ascending=False).reset_index()

        return region_data.to_dict(orient='records')
    except Exception as e:
        print(f"Error generating revenue by region data: {e}")
        return []


def get_business_unit_share(year:int,region:str=None):
    """
        Generates data for the Pie/Donut chart: % share of Revenue by Business Unit.
    """
    try:
        df=fetch_sales_data(year,region)
        if df.empty:
            print("No sales data available for the specified year and region.")
            return []
        
        unit_data=df.groupby('business_unit')['revenue'].sum().reset_index()
        total_revenue=unit_data['revenue'].sum()

        unit_data['share']=round((unit_data['revenue']/total_revenue)*100,2)

        unit_data=unit_data.sort_values(by='share',ascending=False)

        return unit_data[['business_unit','share']].to_dict(orient='records')
    except Exception as e:
        print(f"Error generating business unit share data: {e}")
        return []
    
def get_top_clients(year:int,region:str=None):
    """
        Generates data for the horizontal bar chart: Top 5 Clients by Revenue.
    """
    try:
        df=fetch_sales_data(year,region)
        if df.empty:
            print("No sales data available for the specified year and region.")
            return []
        client_ranking=df.groupby('client')['revenue'].sum().reset_index()
        client_ranking=round(client_ranking.sort_values(by='revenue',ascending=False).head(5),2)
        return client_ranking.to_dict(orient='records')
    except Exception as e:
        print(f"Error generating top clients data: {e}")
        return []

def get_monthly_revenue_vs_cost(year:int,region:str=None):
    """
        Generates data for a combo chart: Monthly Revenue vs Cost.
    """
    try:
        df=fetch_sales_data(year,region)
        if df.empty:
            print("No sales data available for the specified year and region.")
            return [{"month": m, "revenue": 0, "cost": 0} for m in range(1, 13)]
        monthly_data=df.groupby('month').agg({'revenue':'sum','cost':'sum'}).reset_index()
        all_months=pd.DataFrame({'month':range(1,13)})
        final_df=pd.merge(all_months,monthly_data,on='month',how='left').fillna(0)
        return final_df.to_dict(orient='records')
    except Exception as e:
        print(f"Error generating monthly revenue vs cost data: {e}")
        return [{"month": m, "revenue": 0, "cost": 0} for m in range(1, 13)]

def get_compare_yearly_revenue(year:int,region:str=None):
    """
        Generates data for a bar chart comparing revenue of the current year vs previous year.
    """
    try:
        df_current=fetch_sales_data(year,region)
        df_previous=fetch_sales_data(year-1,region)
        if df_current.empty and df_previous.empty:
            print("No sales data available for the specified year and region.")
            return []
        
        monthly_current=df_current.groupby('month')['revenue'].sum().reset_index()
        monthly_previous=df_previous.groupby('month')['revenue'].sum().reset_index()

        all_months=pd.DataFrame({'month':range(1,13)})

        final_df=all_months.merge(monthly_current,on='month',how='left').rename(columns={'revenue': 'revenue_current'})
        final_df=final_df.merge(monthly_previous,on='month',how='left').rename(columns={'revenue': 'revenue_previous'})

        final_df=final_df.fillna(0)

        return final_df.to_dict(orient='records')
    except Exception as e:
        print(f"Error generating compare yearly revenue data: {e}")
        return []

def get_cash_flow(year:int,region:str=None):
    """
    Generates data for the Cash Flow chart (Monthly Inflows, Outflows, and Balance).
    """
    try:
        df=fetch_sales_data(year,region)
        
        if df.empty:
            return []

        monthly_data=df.groupby('month')[['revenue', 'cost']].sum().reset_index()
        monthly_data['balance']=monthly_data['revenue']-monthly_data['cost']

        all_months=pd.DataFrame({'month': range(1, 13)})
        final_df=pd.merge(all_months, monthly_data, on='month', how='left').fillna(0)

        return final_df.to_dict(orient='records')
    except Exception as e:
        print(f"Error generating cash flow data: {e}")
        return []

from services.data.data_loader import fetch_sales_data


def get_expenses_by_category(year:int,region:str=None):
    """
    Generates data for the 'Expenses by Category' component.
    Groups total cost by business unit.
    """
    try:
        df=fetch_sales_data(year,region)
        if df.empty:
            print("No sales data available for the specified year and region.")
            return []
        
        category_data=df.groupby('cost_category')['cost'].sum().reset_index()

        category_data=category_data.sort_values(by='cost',ascending=False)

        category_data['cost']=category_data['cost'].round(2)

        return category_data.to_dict(orient='records')
     
    except Exception as e:
        print(f"Error generating expenses by category: {e}")
        return []
