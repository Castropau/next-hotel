// /pages/api/book.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

export async function POST(request) {
  const { users_id, room_id, checkin, checkout, number_of_persons } = await request.json();

  // Validate inputs
  if (!users_id || !room_id || !checkin || !checkout || number_of_persons < 1) {
    return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
  }

  try {
    await pool.query(
      'INSERT INTO bookings (users_id, room_id, checkin, checkout, number_of_persons) VALUES ($1, $2, $3, $4, $5)',
      [users_id, room_id, checkin, checkout, number_of_persons]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Database error while booking room:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
