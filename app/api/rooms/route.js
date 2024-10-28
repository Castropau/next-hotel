import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

export async function POST(request) { // Use POST to match the route for adding rooms
  const { room, persons, price, image } = await request.json();

  try {
    await pool.query(
      'INSERT INTO rooms (room, persons, price, image) VALUES ($1, $2, $3, $4)',
      [room, persons, price, image]
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Database error while adding room:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
