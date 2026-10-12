# Rumbo Catracho - Backoffice & Admin Dashboard

Panel administrativo y consola de monitoreo operacional para la empresa turística ficticia hondureña **Rumbo Catracho**, desarrollado por **Jonathan Ávila** para la tarea de CSS Frameworks (**Bono: Admin Dashboard con Bootstrap o Bulma**) de la clase **Portales Web II** (UNICAH III Tri 2026).

- **Framework utilizado:** Bulma CSS 1.0.4.
- **Iconografía y analítica:** Font Awesome 6.5.1 + Chart.js 4.4.1.
- **Relación con el ecosistema del proyecto:** Este proyecto funciona en tándem como el panel interno (Backoffice ERP) de la agencia, complementando al sitio público comercial [Rumbo Catracho (Bootstrap)](https://github.com/JonaJSA/rumbo-catracho-bootstrap).

---

## 1. Relación con la clase

- **Referencia del docente:** [Demostración de Bulma CSS en clase (`bulmademo.html`)](https://github.com/obetancourthunicah/pw2s_202603/blob/main/p1/pw2-sabados/bulmademo.html).
- Se utiliza la versión más reciente de **Bulma CSS (1.0.4)** mediante CDN oficial, integrando la arquitectura de variables CSS nativas (`--bulma-primary-*`) explicada por el catedrático.
- Se implementó el patrón oficial de navegación móvil y control interactivo de componentes mediante delegación de eventos en JavaScript sin dependencias pesadas.

### Mapeo de Componentes y Clases de Bulma Utilizados

| Categoría | Clases / Componentes de Bulma CSS | Propósito en el Dashboard |
|---|---|---|
| **Cuadrícula y Disposición** | `columns`, `column`, `is-multiline`, `is-gapless`, `is-variable`, modificadores responsivos (`is-3-desktop`, `is-12-tablet`) | Organización modular del menú lateral, tarjetas de KPIs y bloques analíticos |
| **Navegación y Cabecera** | `navbar`, `navbar-brand`, `navbar-burger js-burger`, `navbar-menu`, `navbar-item`, `has-dropdown`, `is-hoverable` | Barra superior con telemetría de servidores, búsqueda global y perfil de usuario |
| **Menú Vertical (Sidebar)** | `aside.menu`, `menu-label`, `menu-list`, `is-active` | Navegación interna jerárquica para supervisores y despachadores |
| **Indicadores y Métricas** | `level`, `level-left`, `level-right`, `level-item`, `tag`, `tags`, `tag.is-rounded` | Resumen ejecutivo de KPIs (ingresos, ocupación, puntualidad) |
| **Tablas Transaccionales** | `table`, `table.is-fullwidth`, `table.is-hoverable`, `table.is-striped`, `table-container` | Bitácora de transacciones bancarias, pagos y reservas en tiempo real |
| **Alertas y Telemetría** | `message`, `message.is-warning`, `message.is-info`, `message.is-success`, `progress`, `progress.is-small` | Monitoreo meteorológico marítimo y barras de capacidad de flota |
| **Formularios y Filtros** | `field`, `control`, `input`, `select`, `has-icons-left` | Filtrado instantáneo por código/DNI y formulario de reserva manual |
| **Modales Operativos** | `modal`, `modal-background`, `modal-card`, `modal-card-head`, `modal-card-body`, `modal-card-foot` | Ventanas emergentes de auditoría fiscal SAR y comparativa conceptual |
| **Paginación** | `pagination`, `pagination-previous`, `pagination-next`, `pagination-list`, `pagination-link` | Control de navegación de registros transaccionales |

---

## 2. Diferenciación Conceptual: Sitio Comercial vs. Sitio Empresarial

El objetivo principal de esta asignación consiste en evidenciar la comprensión de las diferencias funcionales, visuales y arquitectónicas entre una presencia comercial pública y un panel empresarial interno:

| Dimensión | Sitio Comercial (Público / Ventas)<br>*Ej. Rumbo Catracho Público* | Sitio Empresarial (Interno / Monitoreo)<br>*Ej. Rumbo Catracho Backoffice* |
|---|---|---|
| **Enfoque Principal** | **Atracción y Persuasión:** Orientado al marketing, atracción visual de viajeros y conversión de ventas de paquetes vacacionales. | **Monitoreo y Operaciones:** Supervisión en vivo de despachos de transporte, control de plazas, cobros y conciliación de pagos. |
| **Audiencia (Usuario)** | **Cliente Externo:** Turistas nacionales y extranjeros que buscan inspiración, itinerarios, fotografías atractivas y contacto comercial. | **Personal Interno:** Supervisores logísticos, agentes de call center, coordinadores de guías y auditores fiscales. |
| **Densidad de Contenido** | **Baja y Espaciosa:** Uso intensivo de imágenes grandes en banners hero, tipografías editoriales emocionales y bloques con amplio padding. | **Alta y Compacta:** Tablas tabulares densas, códigos alfanuméricos de reserva (`#RC-...`), identificadores fiscales (DNI/RTN) y cifras monetarias. |
| **Herramientas Clave** | Banners promocionales, galería de destinos, testimonios y botones llamativos de compra ("Quiero explorar"). | Métricas de rendimiento (KPIs), gráficos de tendencias temporales (Chart.js), filtros dinámicos, alertas de contingencia y exportación CSV. |
| **Estética y Jerarquía** | **Emocional y Publicitaria:** Diseñada para cautivar; colores cálidos y estética aspiracional. | **Funcional y Pragmática:** Diseñada para la velocidad de lectura y toma de decisiones operativas. Código de colores semántico (`tag is-success` para aprobado, `tag is-danger` para cancelado). |
| **Métricas de Éxito** | Tasa de conversión de reservas, volumen de tráfico de visitantes y tiempo de permanencia en la página web. | Puntualidad de salidas (98.6%), tasa de ocupación de flota (89.4%) y tiempo de resolución de contingencias. |

---
## 3. Estructura del Proyecto

```text
rumbo-catracho-dashboard/
├── index.html                 Estructura semántica del dashboard y modales Bulma
├── styles.css                 Variables CSS de Bulma 1.0.4 y ajustes corporativos
├── script.js                  Control de modales, filtros en vivo, gráficos y exportación
├── assets/
│   └── img/
│       └── favicon.svg        Isotipo corporativo vectorial de Rumbo Catracho
├── .nojekyll                  Configuración para publicación limpia en GitHub Pages
└── README.md                  Memoria técnica, justificación teórica y guía de entrega
```

---

## 4. Instrucciones de Ejecución

### Apertura Local
1. Clonar o descargar la carpeta del proyecto.
2. Abrir el archivo `index.html` en cualquier navegador web moderno (Edge, Chrome, Firefox).
3. Todas las librerías base (Bulma CSS, Font Awesome y Chart.js) se cargan a través de CDNs de alta velocidad y funcionan sin pasos de compilación ni servidores locales obligatorios.

### Publicación en GitHub Pages
1. Crear un repositorio público en GitHub (por ejemplo, `rumbo-catracho-dashboard`).
2. Vincular los archivos locales y realizar el push:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit admin dashboard con Bulma CSS"
   git branch -M main
   git remote add origin https://github.com/JonaJSA/rumbo-catracho-dashboard.git
   git push -u origin main
   ```
3. En GitHub, ingresar a **Settings → Pages**.
4. En **Build and deployment**, seleccionar **Source: Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guardar los cambios.
5. El sitio estará activo públicamente en: `https://jonajsa.github.io/rumbo-catracho-dashboard/`.

---

## 5. Autor y Créditos Académicos

- **Estudiante:** Jonathan Ávila
- **Asignatura:** Portales Web II (IF-357)
- **Docente:** Ing. Betancourth
- **Universidad:** Universidad Católica de Honduras (UNICAH), Campus San Pedro y San Pablo
- **Periodo:** III Trimestre 2026
