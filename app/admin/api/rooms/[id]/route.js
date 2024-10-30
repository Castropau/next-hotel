import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});

export async function PUT(request, { params }) {
    const roomId = params.id;
    const formData = await request.formData();
    const room = formData.get('room');
    const persons = formData.get('persons');
    const price = formData.get('price');
    const imageFile = formData.get('image');
  
    try {
      let query = 'UPDATE rooms SET room = $1, persons = $2, price = $3';
      const values = [room, persons, price];
  
      if (imageFile && imageFile.size) {
        // Generate a random name for the image file
        const randomString = generateRandomString(10); // Adjust length as needed
        const imageExtension = path.extname(imageFile.name);
        const newImageName = `${randomString}${imageExtension}`;
        const imagePath = path.join(process.cwd(), 'public/images', newImageName);
        
        // Save the new image to public/images
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);
        
        query += ', image = $4';
        values.push(`/images/${newImageName}`); // Store the new relative path
      }
      
      query += ' WHERE id = $5';
      values.push(roomId);
  
      const result = await pool.query(query, values);
      console.log('Rows affected:', result.rowCount);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Database error while updating room:', error.message);
      return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
    }
  }
  
  // Function to generate a random string
  const generateRandomString = (length) => {
    return Math.random().toString(36).substring(2, 2 + length);
  };
  


export async function DELETE(request, { params }) {
  const roomId = params.id;

  try {
    await pool.query('DELETE FROM rooms WHERE id = $1', [roomId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error while deleting room:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
