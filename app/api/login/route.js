// app/api/login/route.js
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

// Handle POST request
export async function POST(req) {
  const { username, password } = await req.json();

  try {
    // Fetch the user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return new Response(JSON.stringify({ username: user.username }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: 'Invalid credentials1' }), { status: 401 });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials12' }), { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
