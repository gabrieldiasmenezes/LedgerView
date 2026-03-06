from services.data.data_loader import fetch_sales_data
from services.sales_metrics import get_sales_metrics
from services.goals_metricts import get_goals_progress
from services.product_performace import get_product_performance
import services.chart_metrics as cm

df=fetch_sales_data(2024)
print(df.head())



metrics=get_sales_metrics(2024)
for k,v in metrics.items():
    print(f"{k.capitalize()}: {v['value']} (Growth: {v['growth']}%)")

months=cm.get_monthly_evolution(2024,"Asia")
print("\nMonthly Profit Evolution:")
for month in months:
    print(f"Month {month['month']}: Profit {month['profit']}")

revenue_by_region=cm.get_revenue_by_region(2024)
print("\nRevenue by Region:")
for region in revenue_by_region:
    print(f"{region['region']}: Revenue: {region['revenue']}")

business_unit_share=cm.get_business_unit_share(2024)
print("\nBusiness Unit Revenue Share:")
for unit in business_unit_share:
    print(f"{unit['business_unit']}: {unit['share']}%")

top_clients=cm.get_top_clients(2024)
print("\nTop 5 Clients by Revenue:")
for client in top_clients:
    print(f"{client['client']}: Revenue: {client['revenue']}")

revenue_vs_costs=cm.get_monthly_revenue_vs_cost(2024)
print("\nMonthly Revenue vs Cost:")
for month in revenue_vs_costs:
    print(f"Month {month['month']}: Revenue: {month['revenue']}, Cost: {month['cost']}")

compare_yearly_revenue=cm.get_compare_yearly_revenue(2025)
print("\nYearly Revenue Comparison:")
for c in compare_yearly_revenue:
    print(f"Month:{c['month']}-> \n Current Revenue: {c['revenue_current']} vs Previous Revenue: {c['revenue_previous']}")

cash_flow=cm.get_cash_flow(2024)
print("\nCash Flow Analysis:")
for month in cash_flow:
    print(f"Month {month['month']}: Cash Flow: {month['balance']} (Revenue: {month['revenue']} - Cost: {month['cost']})")

target_vs_current=get_goals_progress(2024)
print("\nGoals Progress:")
for goal in target_vs_current:
    print(f"{goal['name']}: Current: {goal['current']} vs Target: {goal['target']} (Progress: {goal['progress']}%)")


category_share=cm.get_expenses_by_category(2024)
print("\nExpense Share by Category:")
for category in category_share:
    print(f"{category['cost_category']}: Expense: {category['cost']}")


product_performance=get_product_performance(2024)
print("\nProduct Performance:")
for product in product_performance:
    print(f"{product['product']}: Revenue: {product['revenue']}, Cost: {product['cost']}, Units: {product['units']}, Margin: {product['margin']}%,Trend: {product['trend']}")