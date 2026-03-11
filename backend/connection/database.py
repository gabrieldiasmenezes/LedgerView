import sqlite3
from pathlib import Path

DB_PATH=Path(__file__).parent.parent.parent/"database"/"ledgerview.db"

def get_db_connection():
    """Estabelece a conexão com o SQLite."""
    try:
        conn=sqlite3.connect(DB_PATH)
        conn.row_factory=sqlite3.Row
        print("Database connection established successfully.")
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
        return None
get_db_connection()
