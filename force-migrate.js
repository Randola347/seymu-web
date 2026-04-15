const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log("Checking and creating table...");
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS about_us (
        id SERIAL PRIMARY KEY,
        history_title TEXT DEFAULT 'Historia',
        history_content TEXT,
        mission_title TEXT DEFAULT 'Misión',
        mission_content TEXT,
        vision_title TEXT DEFAULT 'Visión',
        vision_content TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    const existing = await sql(`SELECT * FROM about_us LIMIT 1`);
    if (existing.length === 0) {
      console.log("Seeding data...");
      await sql(`
        INSERT INTO about_us (history_content, mission_content, vision_content)
        VALUES (
          'La venta de Maderas Finas Seymu nace en el año 2008...',
          'Proveer maderas finas para la fabricación de muebles...',
          'Ser los líderes en la comercialización de maderas finas...'
        )
      `);
    }
    console.log("Done!");
  } catch (e) {
    console.error(e);
  }
}

run();
