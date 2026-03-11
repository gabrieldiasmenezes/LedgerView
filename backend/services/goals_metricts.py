from services.data.data_loader import fetch_sales_data,fetch_target_data

def progress(current, target):
    if target == 0:
        return 0
    
    value = (current / target) * 100
    
    return round(min(value, 100), 1)

def get_goals_progress(year:int,region:str=None):
    """
        Generates data for the 'Goals Progress' component.
    """
    try:
        df_sales= fetch_sales_data(year,region)

        if df_sales.empty:
            print("No sales data available for the specified year and region.")
            return []
        
        total_revenue=df_sales["revenue"].sum()
        total_cost=df_sales["cost"].sum()
        margin= ((total_revenue - total_cost) / total_revenue) * 100 if total_revenue > 0 else 0
        new_clients=df_sales["client"].nunique()
        nps_score=72
        target_data=fetch_target_data(year)

        if not target_data:
            print("No target data available for the specified year.")
            return []

        goals = [
            {
                "name": "Annual Revenue",
                "current": round(total_revenue,2),
                "target": target_data.get("revenue",0),
                "progress": progress(total_revenue, target_data.get("revenue",0))
            },

            {
                "name": "New Clients",
                "current": new_clients,
                "target": target_data.get("new_clients",0),
                "progress": progress(new_clients, target_data.get("new_clients",0))
            },

            {
                "name": "Net Margin",
                "current": round(margin,1),
                "target": target_data.get("margin",0),
                "progress": progress(margin, target_data.get("margin",0))
            },

            {
                "name": "NPS Score",
                "current": nps_score,
                "target": target_data.get("nps",0),
                "progress": progress(nps_score, target_data.get("nps",0))
            }
        ]

        return goals
    except Exception as e:
        print(f"Error generating goals progress: {e}")
        return []