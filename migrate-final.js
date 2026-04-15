const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const config = {};
  content.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      config[key.trim()] = value.join('=').trim().replace(/^"(.*)"$/, '$1');
    }
  });
  return config;
}

const env = loadEnv();
const sql = neon(env.DATABASE_URL);

async function run() {
  console.log("Migrating database...");
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
      console.log("Seeding initial data...");
      await sql(`
        INSERT INTO about_us (history_content, mission_content, vision_content)
        VALUES (
          'La venta de Maderas Finas Seymu nace en el año 2008...',
          'Proveer maderas finas...',
          'Ser los líderes...'
        )
      `);
    }
    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

run();
