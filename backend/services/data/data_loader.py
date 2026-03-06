import pandas as pd
from connection.database import get_db_connection
from .clean_data import clean_sales_data, clean_targets_data



def fetch_sales_data(year:int = None ,region:str = None):
    """
        Searches for sales data and loads it into a Pandas DataFrame.
        Filters by year and region if provided.
    """
    try:
        conn=get_db_connection()
        query = """
            SELECT 
                s.year,
                s.month,
                r.name AS region,
                c.name AS client,
                b.name AS business_unit,
                p.name AS product,
                cc.name AS cost_category,
                s.revenue,
                s.cost

            FROM sales s

            JOIN regions r 
            ON s.region_id = r.id

            JOIN clients c 
            ON s.client_id = c.id

            JOIN business_units b 
            ON s.business_unit_id = b.id

            JOIN products p
            ON s.product_id = p.id

            JOIN cost_categories cc
            ON s.cost_category_id = cc.id

            WHERE 1=1
        """

        params=[]
        if year:
            query+= " AND s.year = ?"
            params.append(year)
        if region:
            query+= " AND r.name = ?"
            params.append(region)

        df=pd.read_sql_query(query,conn,params=params)
        df=clean_sales_data(df)
        conn.close()
        return df
    except Exception as e:
        print(f"Error fetching sales data: {e}")
        return pd.DataFrame()  # Return an empty DataFrame on error


def fetch_target_data(year: int):
    """
    Fetches target values for the specified year from the database.
    """
    try:
        conn = get_db_connection()

        query = """
        SELECT metric, target_value
        FROM targets
        WHERE year = ?
        """

        df = pd.read_sql_query(query, conn, params=[year])

        df = clean_targets_data(df)

        conn.close()

        targets = df.set_index("metric")["target_value"].to_dict()

        return targets

    except Exception as e:
        print(f"Error fetching target data: {e}")
        return {}

