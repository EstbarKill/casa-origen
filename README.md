# Casa Origen - Destino Gastronómico e Interactivo

Casa Origen es una plataforma web premium diseñada para un restaurante de lujo en Ciénaga, Magdalena, Colombia. Combina narrativa cultural, gamificación y una experiencia de usuario cinematográfica.

## 🚀 Stack Tecnológico

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Librería de UI:** React 19
- **Estilos:** Tailwind CSS
- **Componentes:** ShadCN UI / Radix UI
- **Animaciones:** Framer Motion (Parallax, micro-interacciones, Mascot AI)
- **Visuales:** HTML5 Canvas (Simulación de olas procedimentales)
- **Iconos:** Lucide React

### Backend & AI
- **Base de Datos:** Firebase Firestore (Gestión de Menú y Reservas)
- **Autenticación:** Firebase Auth
- **AI Engine:** Google Genkit (Integrado con Gemini 2.5 Flash)
- **Flujos AI:**
  - *Gastronomic Concierge:* Sugerencias personalizadas de maridaje.
  - *Menu Description Assistant:* Generación de copywriting elegante para platos.

## 🏗️ Arquitectura de Características

### 1. Sistema de Atmósfera Dinámica
Implementado en `AtmosphereProvider.tsx`, detecta la hora local para alternar entre temas:
- **Mañana:** Colores claros y brillantes.
- **Atardecer:** Tonos dorados y sombras cálidas.
- **Noche:** Estética de bar de playa elegante con baja iluminación.

### 2. Gamificación (Treasure Hunt)
Un sistema de descubrimiento cultural (`DiscoverySystem.tsx`) donde los usuarios encuentran "secretos" de Ciénaga:
- **Mascota Caimán:** Entidad interactiva que sigue el scroll y guía al usuario.
- **Persistencia:** Uso de `localStorage` para guardar descubrimientos y recompensas.

### 3. Motor de Reservas Visual
Mapa interactivo de mesas (`ReservationsPage.tsx`) que permite:
- Selección visual de ubicación (Frente al mar, VIP, etc.).
- Integración con WhatsApp API para confirmación instantánea.
- Validación de horarios y fechas mediante `date-fns`.

### 4. Storytelling Gastronómico
El menú no es un catálogo, es un relato. Cada ítem (`MenuItem`) incluye una "Historia Cultural" que conecta el plato con la herencia de Ciénaga.

## 🛠️ Desarrollo

Para ejecutar el entorno de desarrollo:
```bash
npm run dev
```

Para iniciar el entorno de Genkit (AI):
```bash
npm run genkit:dev
```

---
Desarrollado bajo la brisa del Magdalena para **Casa Origen**.