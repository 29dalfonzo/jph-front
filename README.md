# 📝 jph-front

[🌐 **Ver Demo en Vivo**](https://jph-front.netlify.app/)

¡Bienvenido al proyecto **jph-front**! 🚀

Este proyecto es una aplicación frontend desarrollada en Angular que consume la API de JSONPlaceholder para gestionar publicaciones (posts) y comentarios. Permite listar, buscar, crear, editar y eliminar posts, así como visualizar y gestionar comentarios asociados a cada publicación.

---

## 📂 Estructura del Proyecto

```
│
├── src/
│   ├── app/
│   │   ├── data/                # Servicios y estados
│   │   │   ├── services/
│   │   │   │   ├── post.service.ts
│   │   │   │   └── toast.service.ts
│   │   │   └── states/
│   │   │       └── postState.service.ts
│   │   ├── domain/             # Modelos e interfaces
│   │   │   └── models/
│   │   │       ├── post.interface.ts
│   │   │       └── comment.interface.ts
│   │   ├── presentation/       # Componentes de UI
│   │   │   ├── components/
│   │   │   │   ├── postList/
│   │   │   │   │   ├── postList.component.ts
│   │   │   │   │   └── postList.component.scss
│   │   │   │   ├── post/
│   │   │   │   └── comments/
│   │   │   └── shared/
│   │   │       └── create-post-modal/
│   │   │           └── create-post-modal.component.ts
│   │   └── ...
│   └── environments/
│       └── environment.ts
├── angular.json
├── package.json
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

- **Angular** 18+
- **PrimeNG** (UI Components)
- **RxJS**
- **TypeScript**
- **Karma + Jasmine** (Testing)

---

## ✨ Funcionalidades

- 📃 **Listar Posts:** Visualiza todas las publicaciones.
- 🔍 **Buscar Posts:** Filtra publicaciones por título en tiempo real.
- ➕ **Crear Post:** Agrega nuevas publicaciones mediante un modal.
- ✏️ **Editar Post:** Modifica publicaciones existentes.
- 🗑️ **Eliminar Post:** Borra publicaciones de la lista.
- 💬 **Ver Comentarios:** Muestra los comentarios asociados a cada post en un drawer lateral.
- 🔔 **Notificaciones:** Feedback visual mediante toasts para acciones exitosas o errores.

---

## 🚀 ¿Cómo ejecutar el proyecto?

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/dalfonzo/jph-front.git
   cd jph-front
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Ejecuta la aplicación:**

   ```bash
   ng serve
   ```

   Luego abre [http://localhost:4200](http://localhost:4200) en tu navegador favorito.

4. **Ejecuta los tests:**
   ```bash
   ng test
   ```

---

## 🧪 Pruebas

- El proyecto incluye pruebas unitarias para servicios y componentes principales.
- Usa `ng test` para ejecutarlas y ver los resultados en tiempo real.

---

## 📦 Estructura de Componentes Clave

- `postList.component.ts` — Listado, búsqueda y paginación de posts.
- `post.component.ts` — Visualización individual de un post.
- `comments.component.ts` — Visualización de comentarios.
- `create-post-modal.component.ts` — Modal para crear/editar posts.
- `toast.service.ts` — Servicio para notificaciones visuales.

---

## 👤 Autor

- **Dalfonzo**

---

## 📬 Contacto

¿Tienes dudas, sugerencias o quieres contribuir? ¡No dudes en abrir un issue o un pull request!

---

¡Gracias por visitar este proyecto! 💙
