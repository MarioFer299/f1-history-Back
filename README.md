# 🏎️ F1 History - Backend API

API REST desarrollada para el proyecto final de Desarrollo Web. Gestiona la autenticación de usuarios, el catálogo de escuderías de Fórmula 1 y las interacciones de los usuarios. 

El proyecto está construido con **Node.js, Express, TypeScript y Prisma ORM**, siguiendo una arquitectura limpia en capas (Domain, Application, Infrastructure, Interface).

## 🛠️ Requisitos Previos
- Node.js (v18 o superior)
- PostgreSQL (local o en la nube)
- npm o yarn

## 🚀 Instalación y Configuración Local

1. **Clonar el repositorio y entrar a la carpeta:**
   ```bash
   git clone <url-del-repositorio>
   cd f1-history-Back

2. **Instalar dependencias:**
    ```bash
     npm install

3. **Configurar variables de entorno:**
   - Crea un archivo .env en la raíz del proyecto (puedes basarte en .env.example) y configura tu conexión a la base de datos:
    ```bash
     PORT=4000
    NODE_ENV=development
    DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/f1_history?schema=public"
    JWT_SECRET="tu_clave_secreta_muy_larga_y_segura"
    JWT_EXPIRES_IN="7d"
    CORS_ORIGIN="http://localhost:3000"

4. **Conectar y preparar la Base de Datos:**
    - Sincroniza el esquema de Prisma con tu base de datos y ejecuta el script de seed para cargar datos de prueba:
    ```bash
       npx prisma db push
       npx prisma db seed

5. **Ejecutar el servidor de desarrollo:**
    ```bash
       npm run dev
 La API estará disponible y corriendo en: http://localhost:4000

 ### 🔗 Enlaces del Proyecto Desplegado

- **Repositorio del Backend:** https://github.com/MarioFer299/f1-history-Back
- **Repositorio del Frontend:** https://github.com/MarioFer299/f1-history-frontend
- **API Desplegada (Render):** https://f1-history-back.onrender.com
- **Sitio Web Desplegado (Vercel):** https://f1-history-frontend.vercel.app

### 👤 Credenciales de Prueba
- **Administrador:** `admin@f1history.com` / `Admin123!`
- **Usuario:** `user@f1history.com` / `User123!`

> *Nota: El backend está en el plan gratuito de Render. La primera petición después de inactividad puede tardar 30-50 segundos mientras el servidor "despierta". Esto es normal.*


