import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'holicven_db',
  user: process.env.DB_USER || 'holicven_admin',
  password: process.env.DB_PASSWORD || 'holicven_pass_2026',
});

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE active = true ORDER BY date ASC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
