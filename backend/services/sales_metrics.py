import pandas as pd
from services.data.data_loader import fetch_sales_data


def calculate_metrics(df:pd.DataFrame):
    """
        Calculates key performance metrics from the sales data.
        Returns a dictionary of metrics.
    """
    try:
        #Total Revenue 
        total_revenue=float(sum(df['revenue']))

        total_cost=float(sum(df["cost"]))

        # Net Profit
        net_profit=total_revenue-total_cost

        # Margin 
        margin=float((net_profit/total_revenue)*100)

        # Average Ticket Size,
        average_ticket=float(total_revenue/len(df))

        # Monthly Growth
        monthly_revenue=df.groupby('month')['revenue'].sum().sort_index()
        if len(monthly_revenue)>1:
            current_month_rev=monthly_revenue.iloc[-1]
            last_month_rev=monthly_revenue.iloc[-2]
            growth=((current_month_rev - last_month_rev)/last_month_rev)*100
        else:
            growth=0

        return {
            "total_revenue":total_revenue,
            "net_profit":net_profit,
            "margin":round(margin,2),
            "average_ticket":round(average_ticket,2),
            "monthly_growth":round(float(growth),2)
        }
    except Exception as e:
        print(f"Error calculating metrics: {e}")
        return {}  


def calculate_percentage_change(current,previous):
    # Calculate percentage change between current and previous values.
    if previous == 0:
        return 0 # Infinite growth if previous is zero
    return round(((current - previous) / previous) * 100, 2)

def get_sales_metrics(year: int, region: str = None):
    """
    Main function to get sales metrics based on year and region.
    Fetches data and calculates metrics.
    """
    try:
        df_current = fetch_sales_data(year, region)
        df_previous = fetch_sales_data(year - 1, region)

        # Se não houver dados no ano atual, não faz sentido calcular
        if df_current.empty:
            print("No data available for the specified year and region.")
            return {}

        metrics_current = calculate_metrics(df_current)

        # Se não houver dados no ano anterior
        has_previous_data = not df_previous.empty
        if not has_previous_data:
            metrics_previous = {
                "total_revenue": 0,
                "net_profit": 0,
                "margin": 0,
                "average_ticket": 0,
                "monthly_growth":0
            }
        else:
            metrics_previous = calculate_metrics(df_previous)

        sales_metrics = {
            "revenue": {
                "value": metrics_current["total_revenue"],
                "growth": calculate_percentage_change(
                    metrics_current["total_revenue"],
                    metrics_previous["total_revenue"]
                )
            },
            "profit": {
                "value": metrics_current["net_profit"],
                "growth": calculate_percentage_change(
                    metrics_current["net_profit"],
                    metrics_previous["net_profit"]
                )
            },
            "margin": {
                "value": metrics_current["margin"],
                "growth": 0 if not has_previous_data else round(
                    metrics_current["margin"] - metrics_previous["margin"], 2
                )
            },
            "average_ticket": {
                "value": metrics_current["average_ticket"],
                "growth": 0 if not has_previous_data else calculate_percentage_change(
                    metrics_current["average_ticket"],
                    metrics_previous["average_ticket"]
                )
            },
            "monthly_growth": {
                "value": metrics_current["monthly_growth"],
                "growth": 0 if not has_previous_data else calculate_percentage_change(
                    metrics_current["monthly_growth"],
                    metrics_previous["monthly_growth"]
                )
            }
        }

        return sales_metrics

    except Exception as e:
        return {"Error getting sales metrics:": e}