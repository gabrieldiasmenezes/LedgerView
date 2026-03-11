--==================================================
-- ACTIVATE FOREIGN KEY SUPPORT (SQLite)
--==================================================
PRAGMA foreign_keys = ON;


--==================================================
-- DROP TABLES (for rebuild / development)
--==================================================
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS targets;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS cost_categories;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS business_units;
DROP TABLE IF EXISTS regions;


--==================================================
-- DIMENSION TABLES
--==================================================

-- Regions
CREATE TABLE regions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Business Units
CREATE TABLE business_units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Clients
CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    region_id INTEGER NOT NULL,

    FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- Products (used for product performance analysis)
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    business_unit_id INTEGER NOT NULL,

    FOREIGN KEY (business_unit_id) REFERENCES business_units(id)
);

-- Cost Categories (for expense analysis)
CREATE TABLE cost_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);


--==================================================
-- FACT TABLES
--==================================================

-- Sales fact table
CREATE TABLE sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    sale_date DATE NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,

    region_id INTEGER NOT NULL,
    business_unit_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    cost_category_id INTEGER NOT NULL,

    revenue REAL NOT NULL,
    cost REAL NOT NULL,

    FOREIGN KEY (region_id) REFERENCES regions(id),
    FOREIGN KEY (business_unit_id) REFERENCES business_units(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (cost_category_id) REFERENCES cost_categories(id)
);

-- Expenses fact table
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    expense_date DATE NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,

    category_id INTEGER NOT NULL,
    amount REAL NOT NULL,

    FOREIGN KEY (category_id) REFERENCES cost_categories(id)
);


--==================================================
-- ANALYTICAL TABLES
--==================================================

-- Targets for KPI progress tracking
CREATE TABLE targets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    metric TEXT NOT NULL,
    target_value REAL NOT NULL
);


--==================================================
-- INDEXES (Performance Optimization)
--==================================================

-- Sales indexes
CREATE INDEX idx_sales_date
ON sales(sale_date);

CREATE INDEX idx_sales_year_month
ON sales(year, month);

CREATE INDEX idx_sales_region
ON sales(region_id);

CREATE INDEX idx_sales_product
ON sales(product_id);

CREATE INDEX idx_sales_client
ON sales(client_id);


-- Product indexes
CREATE INDEX idx_products_business_unit
ON products(business_unit_id);


-- Expense indexes
CREATE INDEX idx_expenses_year_month
ON expenses(year, month);

CREATE INDEX idx_expenses_category
ON expenses(category_id);


-- Target indexes
CREATE INDEX idx_targets_year
ON targets(year);


-- Client indexes
CREATE INDEX idx_clients_region
ON clients(region_id);