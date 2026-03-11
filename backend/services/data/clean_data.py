import pandas as pd


def clean_sales_data(df:pd.DataFrame)->pd.DataFrame:
    """
        Cleans and validates the sales data.  
    """
    df=df.copy()
    initial_rows=len(df)

    df.dropna(inplace=True)
    numeric_cols=["revenue","cost","month","year"]
    for nc in numeric_cols:
        invalid_mask=df[nc]<=0
        count_invalid=sum(invalid_mask)
        if count_invalid >0:
            print(f"Was removed {count_invalid} rows for having values <=0 in column {nc}")
        df=df[~invalid_mask]

    final_rows=len(df)
    print(f"Cleaning completed: {initial_rows} -> {final_rows} rows remaining")

    return df.reset_index(drop=True)


def clean_targets_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans and validates target data.
    """
    df = df.copy()

    initial_rows = len(df)

    df.dropna(inplace=True)

    # garantir que target_value seja positivo
    invalid_mask = df["target_value"] <= 0
    invalid_count = invalid_mask.sum()

    if invalid_count > 0:
        print(f"Removed {invalid_count} rows with invalid target_value")

    df = df[~invalid_mask]

    final_rows = len(df)

    print(f"Target cleaning completed: {initial_rows} -> {final_rows}")

    return df.reset_index(drop=True)