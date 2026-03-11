--==================================================
-- INSERT: regions
--==================================================
INSERT INTO regions (name) VALUES
('North America'),
('Europe'),
('Asia'),
('South America');


--==================================================
-- INSERT: business_units
--==================================================
INSERT INTO business_units (name) VALUES
('Cloud Services'),
('AI & Machine Learning'),
('Consumer Devices'),
('Enterprise Solutions'),
('Digital Advertising'),
('Cybersecurity'),
('Streaming & Media'),
('Fintech Services');


--==================================================
-- INSERT: clients
--==================================================
INSERT INTO clients (name, region_id) VALUES
('Nubank', 4),
('Magazine Luiza', 4),
('Petrobras', 4),
('iFood', 4),
('Ambev', 4),
('TOTVS', 4),
('Mercado Livre', 4),
('Raia Drogasil', 4),
('Stone', 4),
('Embraer', 4);


--==================================================
-- INSERT: products
--==================================================
INSERT INTO products (name, category, business_unit_id) VALUES
('Cloud Infrastructure', 'Cloud', 1),
('AI Analytics Platform', 'AI', 2),
('Smart Devices', 'Hardware', 3),
('Enterprise ERP', 'Enterprise', 4),
('Ad Optimization Engine', 'Advertising', 5),
('Threat Detection System', 'Security', 6),
('Streaming Platform Pro', 'Media', 7),
('Digital Payments API', 'Fintech', 8);


--==================================================
-- INSERT: cost_categories
--==================================================
INSERT INTO cost_categories (name) VALUES
('Personnel'),
('Operational'),
('Marketing'),
('Technology'),
('Administrative'),
('Other');


--==================================================
-- INSERT: targets (Goals for KPI progress)
--==================================================
INSERT INTO targets (year, metric, target_value) VALUES
-- 2023
(2023, 'revenue', 2200000),
(2023, 'new_clients', 30),
(2023, 'margin', 34),
(2023, 'nps', 75),

-- 2024
(2024, 'revenue', 2600000),
(2024, 'new_clients', 40),
(2024, 'margin', 36),
(2024, 'nps', 78),

-- 2025
(2025, 'revenue', 3000000),
(2025, 'new_clients', 50),
(2025, 'margin', 38),
(2025, 'nps', 80);


--==================================================
-- GENERATE SALES DATA (ADVANCED REALISTIC)
--==================================================

WITH RECURSIVE months(m) AS (
    SELECT 1
    UNION ALL
    SELECT m + 1 FROM months WHERE m < 12
),
years(y) AS (
    SELECT 2023
    UNION ALL SELECT 2024
    UNION ALL SELECT 2025
),
regions_list(r) AS (
    SELECT 1
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
)

INSERT INTO sales
(
sale_date,
year,
month,
region_id,
business_unit_id,
client_id,
product_id,
cost_category_id,
revenue,
cost
)

SELECT
date(y || '-' || printf('%02d', m) || '-15'),
y,
m,
r,

((m + r) % 8) + 1,
((m + r + y) % 10) + 1,
((m + r + y) % 8) + 1,
((m + r) % 6) + 1,

--==================================================
-- REVENUE
--==================================================

(

-- base revenue
40000

-- crescimento anual forte
+ ((y - 2023) * 15000)

-- diferença regional
+ CASE
    WHEN r = 1 THEN 120000   -- North America
    WHEN r = 2 THEN 70000    -- Europe
    WHEN r = 3 THEN 45000    -- Asia
    ELSE 20000               -- South America
  END

-- sazonalidade forte
+ CASE
    WHEN m IN (11,12) THEN 60000
    WHEN m IN (9,10) THEN 30000
    WHEN m IN (6,7) THEN 20000
    WHEN m IN (1,2) THEN -10000
    ELSE 0
  END

-- peso por produto (alguns dominam)
+ CASE ((m + r + y) % 8) + 1
    WHEN 1 THEN 35000
    WHEN 2 THEN 42000
    WHEN 3 THEN 12000
    WHEN 4 THEN 25000
    WHEN 5 THEN 18000
    WHEN 6 THEN 20000
    WHEN 7 THEN 38000
    WHEN 8 THEN 45000
  END

-- variação realista
+ ABS(random() % 20000)

),

--==================================================
-- COST
--==================================================

(

28000

-- crescimento anual
+ ((y - 2023) * 9000)

-- custo por região
+ CASE
    WHEN r = 1 THEN 70000
    WHEN r = 2 THEN 42000
    WHEN r = 3 THEN 30000
    ELSE 15000
  END

-- sazonalidade
+ CASE
    WHEN m IN (11,12) THEN 20000
    WHEN m IN (6,7) THEN 12000
    ELSE 0
  END

-- crise econômica (2024 início)
+ CASE
    WHEN y = 2024 AND m IN (1,2,3) THEN 25000
    ELSE 0
  END

-- investimento pesado em 2025
+ CASE
    WHEN y = 2025 AND m IN (5,6,7) THEN 35000
    ELSE 0
  END

-- variação realista
+ ABS(random() % 18000)

)

FROM years
CROSS JOIN months
CROSS JOIN regions_list;


--==================================================
-- GENERATE EXPENSE DATA (ADVANCED)
--==================================================

WITH RECURSIVE months(m) AS (
    SELECT 1
    UNION ALL
    SELECT m + 1 FROM months WHERE m < 12
),
years(y) AS (
    SELECT 2023
    UNION ALL SELECT 2024
    UNION ALL SELECT 2025
),
categories(c) AS (
    SELECT 1
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
    UNION ALL SELECT 5
    UNION ALL SELECT 6
)

INSERT INTO expenses
(
expense_date,
year,
month,
category_id,
amount
)

SELECT
date(y || '-' || printf('%02d', m) || '-10'),
y,
m,
c,

(

15000

-- crescimento anual
+ ((y - 2023) * 4000)

-- sazonalidade marketing
+ CASE
    WHEN c = 3 AND m IN (10,11,12) THEN 25000
    ELSE 0
  END

-- pesos por categoria
+ CASE
    WHEN c = 1 THEN 60000
    WHEN c = 2 THEN 35000
    WHEN c = 3 THEN 28000
    WHEN c = 4 THEN 22000
    WHEN c = 5 THEN 16000
    ELSE 9000
  END

-- variação
+ ABS(random() % 10000)

)

FROM years
CROSS JOIN months
CROSS JOIN categories;


--==================================================
-- VERIFICATION QUERIES
--==================================================
-- Clients with region
SELECT
c.id,
c.name,
r.name AS region
FROM clients c
JOIN regions r ON c.region_id = r.id;

SELECT DISTINCT year FROM sales;
-- Sales overview
SELECT
s.id,
s.year,
s.month,
r.name AS region,
b.name AS business_unit,
p.name AS product,
c.name AS client,
cc.name AS cost_categories,
s.revenue,
s.cost
FROM sales s
JOIN regions r ON s.region_id = r.id
JOIN business_units b ON s.business_unit_id = b.id
JOIN products p ON s.product_id = p.id
JOIN clients c ON s.client_id = c.id
JOIN cost_categories cc ON s.cost_category_id = cc.id;


-- Expense summary
SELECT
cc.name,
SUM(e.amount) AS total_expense
FROM expenses e
JOIN cost_categories cc
ON e.category_id = cc.id
GROUP BY cc.name;

SELECT 
    id,
    year,
    metric,
    target_value
FROM targets
ORDER BY year;
-- Quick counts
SELECT COUNT(*) AS sales_records FROM sales;
SELECT COUNT(*) AS expense_records FROM expenses;