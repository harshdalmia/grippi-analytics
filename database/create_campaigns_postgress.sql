CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Active', 'Paused')),
    clicks INTEGER NOT NULL DEFAULT 0,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    impressions INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
    ('Summer Sale', 'Active', 150, 45.99, 1000),
    ('Black Friday', 'Paused', 320, 89.50, 2500),
    ('Holiday Special', 'Active', 275, 67.25, 1800),
    ('Spring Launch', 'Active', 420, 125.00, 3200),
    ('Winter Clearance', 'Paused', 180, 52.75, 1500),
    ('New Year Promo', 'Active', 550, 165.50, 4100),
    ('Easter Sale', 'Paused', 95, 28.99, 750),
    ('Back to School', 'Active', 380, 112.40, 2900),
    ('Cyber Monday', 'Active', 670, 198.75, 5200),
    ('Valentine Special', 'Paused', 210, 63.50, 1650);
