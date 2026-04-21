# Maderas Seymu - Catálogo Digital de Maderas Finas

![Seymu Banner](https://images.unsplash.com/photo-1516592653372-b715694c731f?q=80&w=2070&auto=format&fit=crop)

Maderas Seymu es una plataforma web moderna diseñada para la exhibición y gestión de maderas finas. Construida con **Next.js 15**, ofrece una experiencia de usuario fluida, un catálogo interactivo y un panel administrativo robusto.

## 🌲 Características Principales

### 📱 Experiencia de Usuario (Frontend)
- **Catálogo Interactivo**: Filtrado instantáneo por categorías (Especies Finas, Maderas Duras, etc.).
- **Galería Premium**: Visualización detallada de maderas con navegación táctil optimizada.
- **Diseño Responsivo**: Adaptado perfectamente para móviles, tablets y escritorio.
- **Contacto Directo**: Integración con WhatsApp para consultas inmediatas.

### 🔐 Gestión Administrativa (Backend)
- **Panel Privado**: Acceso protegido bajo una ruta administrativa personalizada para mayor seguridad.
- **Control de Inventario**: CRUD completo de maderas, precios y descripciones.
- **Gestión de Imágenes**: Carga y optimización automática a través de Cloudinary.
- **Identidad Corporativa**: Panel para actualizar datos de contacto, logos y banners del sitio.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Vanilla CSS con enfoque en Diseño Premium y Moderno.
- **Autenticación**: Auth.js (NextAuth v5) con estrategia JWT.
- **Base de Datos**: PostgreSQL (Neon Database)
- **Media**: Cloudinary (Almacenamiento de imágenes)
- **Iconos**: Lucide React

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Randola347/seymu-web.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env.local` basado en las necesidades del proyecto (Base de Datos, Auth Secret, Cloudinary).

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

## 🛡️ Seguridad

El proyecto implementa mejores prácticas de seguridad:
- Rutas administrativas anonimizadas.
- Almacenamiento de contraseñas mediante hashing Bcrypt.
- Middleware de protección de rutas y limitación de intentos de login.
- Exclusión estricta de secretos en el control de versiones.

---
© 2024 Maderas Seymu - Calidad y Elegancia en Madera.
