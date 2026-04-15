import { sql } from "../db";

async function migrate() {
  console.log("Creating 'site_identity' table...");
  try {
    // 1. Create the new table
    await sql`
      CREATE TABLE IF NOT EXISTS site_identity (
        id SERIAL PRIMARY KEY,
        logo_url TEXT,
        banner_url TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // 2. See if there's data to migrate from company_settings
    const settings = await sql`SELECT logo_url, banner_url FROM company_settings LIMIT 1`;
    
    if (settings.length > 0) {
      const { logo_url, banner_url } = settings[0];
      
      const identity = await sql`SELECT * FROM site_identity LIMIT 1`;
      if (identity.length === 0) {
        console.log("Migrating identity data from company_settings...");
        await sql`
          INSERT INTO site_identity (logo_url, banner_url)
          VALUES (${logo_url}, ${banner_url})
        `;
      }
    } else {
      // Seed defaults if nothing exists
      const identity = await sql`SELECT * FROM site_identity LIMIT 1`;
      if (identity.length === 0) {
        console.log("Seeding default identity data...");
        await sql`
          INSERT INTO site_identity (logo_url, banner_url)
          VALUES (NULL, NULL)
        `;
      }
    }

    console.log("Migration 'site_identity' completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
