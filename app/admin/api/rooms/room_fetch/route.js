import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

// GET all rooms
export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM rooms');
    return NextResponse.json(rows); // Return rooms directly
  } catch (error) {
    console.error('Database error while fetching rooms:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
