import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'holicven_db',
  user: process.env.DB_USER || 'holicven_admin',
  password: process.env.DB_PASSWORD || 'holicven_pass_2026',
});

export async function getProducts() {
  const result = await pool.query('SELECT * FROM products WHERE active = true ORDER BY name');
  return result.rows;
}

export async function getEvents() {
  const result = await pool.query('SELECT * FROM events WHERE active = true AND date >= CURRENT_DATE ORDER BY date ASC');
  return result.rows;
}

export async function createOrder(order: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  product_price: number;
  quantity: number;
}) {
  const result = await pool.query(
    `INSERT INTO orders (customer_name, customer_email, customer_phone, product_name, product_price, quantity, status)
     VALUES ($1, $2, $3, $4, $5, $6, 'ny') RETURNING *`,
    [order.customer_name, order.customer_email, order.customer_phone, order.product_name, order.product_price, order.quantity]
  );
  return result.rows[0];
}
