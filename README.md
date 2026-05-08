![Angular Portfolio](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwind-css)
![Status](https://img.shields.io/badge/status-active-green.svg)

# 🌐 Angular Portfolio

> Portfolio web profesional desarrollado en Angular 19 con modo oscuro/claro, internacionalización ES/EN y protecciones anti-scraping.

[English](#english) | [Español](#español)

---

## 🇪🇸 Español

### Características

- **🎨 Modo Oscuro/Claro**: Transición fluida con CSS variables y persistencia en localStorage
- **🌍 Internacionalización ES/EN**: Traducciones completas para todos los textos
- **📧 Email Protegido**: Rendering en Canvas + honeypot anti-scraping
- **🖥️ Mini Navegadores**: Iframes embebidos para mostrar proyectos reales
- **♿ Accesibilidad**: Soporte completo para lectores de pantalla y navegación por teclado

### Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── i18n/           # Traducciones ES/EN
│   │   ├── pipes/           # Pipes personalizados
│   │   └── services/       # ThemeService, I18nService
│   ├── features/
│   │   └── projects/       # ProjectBrowserComponent
│   └── shared/
│       └── email-protected/  # EmailProtectedComponent
└── styles.css              # CSS Variables globales
```

### Componentes

| Componente | Descripción |
|------------|-------------|
| `EmailProtectedComponent` | Email protegido con rendering en Canvas, honeypot y construcción runtime de mailto |
| `ProjectBrowserComponent` | Mini navegador con iframes embebidos y Chrome bar simulada |
| `ThemeService` | Gestión de tema dark/light con Signals |
| `I18nService` | Internacionalización ES/EN con traducciones completas |
| `SafeUrlPipe` | Pipe para sanitizar URLs de iframes |

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/portfolio-angular.git
cd portfolio-angular

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve

# Construir para producción
ng build
```

### Uso de Servicios

```typescript
// Inyectar en tu componente
constructor(
  private themeService: ThemeService,
  private i18n: I18nService
) {}

// Cambiar tema
this.themeService.toggle();

// Traducir texto
this.i18n.t('hero_greeting'); // "Hola, soy"
```

### Variables CSS Disponibles

```css
:root {
  --bg-primary;      /* Fondo principal */
  --bg-secondary;    /* Fondo secundario */
  --bg-card;        /* Fondo de tarjetas */
  --text-primary;   /* Texto principal */
  --text-secondary; /* Texto secundario */
  --accent;        /* Color de acento */
  --accent2;       /* Segundo color de acento */
  --navbar-bg;      /* Fondo del navbar */
  --shadow;         /* Sombras */
}
```

---

## 🇬🇧 English

### Features

- **🎨 Dark/Light Mode**: Smooth transitions with CSS variables and localStorage persistence
- **🌍 Internationalization ES/EN**: Complete translations for all texts
- **📧 Protected Email**: Canvas rendering + anti-scraping honeypot
- **🖥️ Mini Browsers**: Embedded iframes for real project previews
- **♿ Accessibility**: Full screen reader and keyboard navigation support

### Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── i18n/           # ES/EN translations
│   │   ├── pipes/         # Custom pipes
│   │   └── services/      # ThemeService, I18nService
│   ├── features/
│   │   └── projects/      # ProjectBrowserComponent
│   └── shared/
│       └── email-protected/  # EmailProtectedComponent
└── styles.css           # Global CSS Variables
```

### Installation

```bash
# Clone repository
git clone https://github.com/your-user/portfolio-angular.git
cd portfolio-angular

# Install dependencies
npm install

# Start dev server
ng serve

# Build for production
ng build
```

### Services Usage

```typescript
// Inject in your component
constructor(
  private themeService: ThemeService,
  private i18n: I18nService
) {}

// Toggle theme
this.themeService.toggle();

// Translate text
this.i18n.t('hero_greeting'); // "Hi, I'm"
```

### Available CSS Variables

```css
:root {
  --bg-primary;      /* Main background */
  --bg-secondary;  /* Secondary background */
  --bg-card;        /* Card background */
  --text-primary;  /* Main text */
  --text-secondary;/* Secondary text */
  --accent;        /* Primary accent */
  --accent2;       /* Secondary accent */
  --navbar-bg;     /* Navbar background */
  --shadow;        /* Shadows */
}
```

---

## 📄 Licencia / License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🤝 Contribuir / Contributing

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📧 Contacto / Contact

- **Email**: [joseantonioriveraurbi16@gmail.com](mailto:joseantonioriveraurbi16@gmail.com)
- **WhatsApp**: [+57 313 3945995](https://wa.me/573133945995)
- **GitHub**: [@joseRiver39](https://github.com/joseRiver39)

---

⭐️ Si te gusta este proyecto, dale una estrella / If you like this project, give it a star