# 🚀 Modern Portfolio | Angular 19 + Tailwind CSS v4

[![Angular](https://img.shields.io/badge/Angular-19.0+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Este es un portafolio de alto rendimiento diseñado con una estética **SaaS Premium**, enfocado en la velocidad, la seguridad y la experiencia de usuario. Implementa las últimas características de Angular 19, incluyendo Signals para una gestión de estado reactiva y eficiente.

---

## 🌟 Características Principales

### 🛠️ Tecnología de Vanguardia
- **Angular 19**: Uso de **Signals** para reactividad pura, eliminando la necesidad de Zone.js en el futuro.
- **Tailwind CSS v4**: Motor de estilos de última generación con configuración optimizada y variables CSS nativas.
- **Lucide Icons**: Iconografía vectorial ligera y moderna.

### 🌍 Internacionalización (I18n)
- Sistema dinámico ES/EN integrado mediante señales.
- Detección automática del idioma del navegador.
- Persistencia de preferencia en `localStorage`.

### 🛡️ Seguridad y Privacidad
- **Anti-Scraping**: Email y teléfono protegidos mediante renderizado dinámico en **Canvas API**. Los datos no existen como texto en el DOM, evitando que bots y arañas recolecten tu información.
- **Honeypot Logic**: Técnicas avanzadas para prevenir spam en el formulario de contacto.

### 🎨 UX/UI Premium
- **Modo Oscuro/Claro**: Sistema de temas con persistencia y transiciones fluidas.
- **Typewriter Effect**: Efecto de escritura dinámico y pausado que se adapta al idioma seleccionado.
- **Responsive Design**: Optimización total para dispositivos móviles, tablets y escritorio.

---

## 📂 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/
│   │   ├── i18n/           # Diccionarios de traducción ES/EN
│   │   ├── services/       # Lógica central (I18n, Theme, Analytics)
│   │   └── pipes/          # Pipes de seguridad y utilidades
│   ├── features/           # Módulos de funcionalidad (Hero, Projects, Experience)
│   └── shared/             # Componentes reutilizables (Navbar, ProtectedInfo)
├── assets/                 # Recursos estáticos (Imágenes, PDF)
└── styles.css              # Diseño base con Tailwind v4 @theme
```

---

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- Angular CLI 19+

### Pasos
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/joseRiver39/curriculo.git
   cd curriculo
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   ng serve -o
   ```

4. **Compilar para producción**
   ```bash
   ng build --configuration production
   ```

---

## 🔧 Integraciones

- **Formspree**: Gestión de mensajes de contacto sin backend propio.
- **Google Fonts**: Tipografías 'Syne' y 'DM Sans' para un look tipográfico moderno.
- **Canvas API**: Renderizado de seguridad para datos sensibles.

---

## 🤝 Contacto

Si estás interesado en mi perfil o tienes alguna duda sobre este proyecto:

- **LinkedIn**: www.linkedin.com/in/jose-antonio-rivera-urbina-85221a8a
- **Email**: joseantonioriveraurbi16@gmail.com (Protegido en la web)
- **GitHub**: [@joseRiver39](https://github.com/joseRiver39)

---

> [!TIP]
> Este portafolio está listo para ser desplegado en **Vercel** o **Netlify** con un solo clic.

---

Desarrollado con ❤️ por **José Rivera**
