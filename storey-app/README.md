# Storey App - Angular Dashboard

Una aplicación web moderna construida con Angular 19 que incluye un sistema de autenticación completo y un dashboard interactivo.

## 🚀 Características

- **Sistema de Login**: Autenticación con credenciales simuladas
- **Dashboard Responsivo**: Interfaz moderna con sidebar de navegación
- **Componentes Interactivos**: 
  - Home: Estadísticas y actividades recientes
  - Profile: Gestión de perfil de usuario
  - Settings: Configuraciones de la aplicación
- **Guard de Autenticación**: Protección de rutas
- **Diseño Moderno**: UI/UX con gradientes y animaciones
- **Totalmente Responsivo**: Funciona en dispositivos móviles y desktop

## 🛠️ Tecnologías Utilizadas

- Angular 19
- TypeScript
- SCSS
- Angular Router
- Angular Forms (Reactive Forms)
- RxJS

## 📦 Instalación

1. **Clonar el repositorio**:
```bash
git clone <repository-url>
cd storey-app
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar la aplicación**:
```bash
ng serve
```

4. **Abrir en el navegador**:
```
http://localhost:4200
```

## 🔐 Credenciales de Acceso

Para acceder al dashboard, utiliza las siguientes credenciales:

- **Usuario**: `admin`
- **Contraseña**: `admin`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   └── dashboard/
│   │       ├── dashboard.component.ts
│   │       ├── dashboard.component.html
│   │       ├── dashboard.component.scss
│   │       ├── home/
│   │       ├── profile/
│   │       └── settings/
│   ├── services/
│   │   └── auth.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.routes.ts
│   └── app.config.ts
```

## 🎯 Funcionalidades

### Login
- Formulario de autenticación con validaciones
- Simulación de proceso de login
- Manejo de errores
- Redirección automática al dashboard

### Dashboard
- **Sidebar de Navegación**: Menú lateral con enlaces a diferentes secciones
- **Información del Usuario**: Muestra datos del usuario autenticado
- **Botón de Logout**: Cerrar sesión y redireccionar al login

### Home
- **Tarjetas de Estadísticas**: Métricas importantes con iconos
- **Actividades Recientes**: Lista de actividades del sistema
- **Acciones Rápidas**: Botones para acciones comunes

### Profile
- **Información Personal**: Datos del usuario
- **Modo Edición**: Formulario editable para actualizar información
- **Validaciones**: Campos requeridos y validaciones de email
- **Información Adicional**: Datos complementarios del usuario

### Settings
- **Notificaciones**: Configuración de alertas (email, push, SMS)
- **Privacidad**: Control de visibilidad del perfil
- **Apariencia**: Tema, idioma y zona horaria
- **Toggles Interactivos**: Switches para configuraciones booleanas

## 🔧 Configuración

### Rutas
- `/login` - Página de autenticación
- `/dashboard` - Dashboard principal (protegido)
- `/dashboard/home` - Página de inicio
- `/dashboard/profile` - Gestión de perfil
- `/dashboard/settings` - Configuraciones

### Guard de Autenticación
El `authGuard` protege las rutas del dashboard, redirigiendo a usuarios no autenticados al login.

## 🎨 Diseño

- **Paleta de Colores**: Gradientes azul-púrpura
- **Tipografía**: Inter (sistema)
- **Iconos**: Emojis para simplicidad
- **Animaciones**: Transiciones suaves y efectos hover
- **Responsive**: Diseño adaptativo para todos los dispositivos

## 🚀 Comandos Útiles

```bash
# Desarrollo
ng serve

# Build de producción
ng build

# Tests
ng test

# Linting
ng lint
```

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔮 Próximas Mejoras

- [ ] Integración con backend real
- [ ] Temas oscuro/claro
- [ ] Notificaciones push reales
- [ ] Subida de imágenes de perfil
- [ ] Más componentes del dashboard
- [ ] Tests unitarios y e2e

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado con ❤️ usando Angular 19**
