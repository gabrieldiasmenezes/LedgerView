from services.data.data_loader import fetch_sales_data

def calculate_product_trend(df):
    """
    Calculates revenue trend for each product based on monthly evolution.
    Returns a dictionary with product -> trend percentage.
    """

    trends = {}

    for product, group in df.groupby("product"):

        monthly = (
            group.groupby("month")["revenue"]
            .sum()
            .sort_index()
        )

        if len(monthly) > 1:
            growth = ((monthly.iloc[-1] - monthly.iloc[0]) / monthly.iloc[0]) * 100
        else:
            growth = 0

        trends[product] = round(growth, 2)

    return trends

def get_product_performance(year):

    df = fetch_sales_data(year)

    product_stats = (
        df.groupby("product")
        .agg({
            "revenue": "sum",
            "cost": "sum"
        })
        .reset_index()
    )

    product_stats["units"] = df.groupby("product").size().values

    product_stats["margin"] = (
        (product_stats["revenue"] - product_stats["cost"])
        / product_stats["revenue"]
        * 100
    ).round(2)

    trends = calculate_product_trend(df)

    results = []

    for _, row in product_stats.iterrows():

        results.append({
            "product": row["product"],
            "revenue": row["revenue"],
            "cost": row["cost"],
            "units": row["units"],
            "margin": round(row["margin"],2),
            "trend": trends.get(row["product"],0)
        })

    return results