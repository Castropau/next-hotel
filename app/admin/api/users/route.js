// import { Pool } from 'pg';

// const pool = new Pool({
//   user: process.env.USER_NAME,
//   host: process.env.HOST_NAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.PORT_NUMBER,
// });

// export async function GET() {
//   try {
//     const { rows } = await pool.query('SELECT * FROM users');
//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';


const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  const { username, password, email } = await request.json();

  
  const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (existingUser.rows.length > 0) {
    return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 400 });
  }


  const hashedPassword = await bcrypt.hash(password, 10);


  try {
    await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
      [username, hashedPassword, email]
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
