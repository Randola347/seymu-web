const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Migrando base de datos usando variable de entorno...");
  try {
    await sql`ALTER TABLE woods ADD COLUMN IF NOT EXISTS measurements TEXT;`;
    console.log("Columna 'measurements' añadida con éxito.");
  } catch (err) {
    console.error("Error en migración:", err);
  }
}

migrate();
