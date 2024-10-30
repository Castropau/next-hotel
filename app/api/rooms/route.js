import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});


// Handler to add a room
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

// Handler to get all rooms
export async function GET(request) {
  try {
    const result = await pool.query('SELECT * FROM rooms');
    const rooms = result.rows;

    return new Response(JSON.stringify(rooms), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database error while fetching rooms:', error);
    return new Response(JSON.stringify({ message: 'Database error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Handler to book a room
export async function bookRoom(request) {
  const { roomId, customerName, customerEmail, checkIn, checkOut } = await request.json();

  if (!roomId || !customerName || !customerEmail || !checkIn || !checkOut) {
    return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
  }

  try {
    await pool.query(
      'INSERT INTO bookings (room_id, customer_name, customer_email, check_in, check_out) VALUES ($1, $2, $3, $4, $5)',
      [roomId, customerName, customerEmail, checkIn, checkOut]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Database error while booking room:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
