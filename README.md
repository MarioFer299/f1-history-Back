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
     npm install

3. **Configurar variables de entorno:**
   - Crea un archivo .env en la raíz del proyecto (puedes basarte en .env.example) y configura tu conexión a la base de datos:

    PORT=4000
   NODE_ENV=development
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/f1_history?schema=public"
   JWT_SECRET="tu_clave_secreta_muy_larga_y_segura"
   JWT_EXPIRES_IN="7d"
   CORS_ORIGIN="http://localhost:3000"

4. **Conectar y preparar la Base de Datos:**
    - Sincroniza el esquema de Prisma con tu base de datos y ejecuta el script de seed para cargar datos de prueba:

       npx prisma db push
       npx prisma db seed

5. **Ejecutar el servidor de desarrollo:**
       npm run dev

    La API estará disponible y corriendo en: http://localhost:4000


### 📄 2. Contenido para `f1-history-frontend/README.md`

```markdown
# 🏎️ F1 History - Frontend

Interfaz de usuario del proyecto final de Desarrollo Web. Es la evolución full-stack del sitio original, reconstruido utilizando **Next.js (App Router), TypeScript y Tailwind CSS**.

El frontend consume la API REST del backend, maneja la sesión de usuario con JWT y protege las rutas según el rol del usuario, manteniendo la misma identidad visual y dominio del proyecto inicial.

## 🛠️ Requisitos Previos
- Node.js (v18 o superior)
- El Backend (`f1-history-Back`) debe estar corriendo previamente en `http://localhost:4000`

## 🚀 Instalación y Configuración Local

1. **Clonar el repositorio y entrar a la carpeta:**
   ```bash
   git clone <url-del-repositorio>
   cd f1-history-frontend

2. **Instalar dependencias:**
    npm install

3. Configurar variables de entorno:
  - Crea un archivo .env.local en la raíz del proyecto para conectar con tu backend local:
     NEXT_PUBLIC_API_HOST=http://localhost:4000

4. **Ejecutar el servidor de desarrollo:**
       npm run dev

    El sitio web estará disponible y corriendo en: http://localhost:3000



