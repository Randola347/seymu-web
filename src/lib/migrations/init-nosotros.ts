import { sql } from "../db";

async function migrate() {
  console.log("Creating 'about_us' table...");
  try {
    await sql`
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
    `;

    const existing = await sql`SELECT * FROM about_us LIMIT 1`;
    
    if (existing.length === 0) {
      console.log("Seeding 'about_us' with default content...");
      await sql`
        INSERT INTO about_us (history_content, mission_content, vision_content)
        VALUES (
          'La venta de Maderas Finas Seymu nace en el año 2008 en el distrito de la Guácima de Alajuela...',
          '“Proveer maderas finas para la fabricación de muebles y construcción de la más alta calidad que superen las expectativas de los clientes, ofreciendo un servicio experto y personalizado fomentando las mejores prácticas.”',
          '“Ser los líderes en la comercialización de maderas finas, transformando la forma en que los clientes perciben y valora nuestro producto reflejando nuestro compromiso con la calidad”'
        )
      `;
    }
    
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
