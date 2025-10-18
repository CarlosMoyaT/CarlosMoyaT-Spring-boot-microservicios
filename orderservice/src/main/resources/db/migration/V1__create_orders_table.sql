CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    total NUMERIC(10, 2) NOT NULL,
    quantity BIGINT NOT NULL,
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id BIGINT,
    event_id BIGINT
);
