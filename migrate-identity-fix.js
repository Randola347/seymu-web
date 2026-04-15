const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
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
  console.log("Creating 'site_identity' table...");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_identity (
        id SERIAL PRIMARY KEY,
        logo_url TEXT,
        banner_url TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    const settings = await sql`SELECT logo_url, banner_url FROM company_settings LIMIT 1`;
    if (settings.length > 0) {
      const { logo_url, banner_url } = settings[0];
      const identity = await sql`SELECT * FROM site_identity LIMIT 1`;
      if (identity.length === 0) {
        console.log("Migrating identity data...");
        // Use tagged template correctly
        await sql`INSERT INTO site_identity (logo_url, banner_url) VALUES (${logo_url}, ${banner_url})`;
      }
    }

    console.log("Success!");
  } catch (err) {
    console.error(err);
  }
}

run();
