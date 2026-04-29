# Design System: Secured Terminal v2.0

## Core Philosophy
The EMS application follows a **Modern Minimalist** aesthetic centered around the concept of a **"Secured Terminal."** The design prioritizes clarity, structural precision, and professional utility.

---

## 1. Visual Tokens

### Edge & Shape
- **Rounding**: Strictly `rounded-none` (0px). All containers, buttons, inputs, and cards must feature sharp edges to convey a sense of architectural precision and security.
- **Borders**: Thin, defined borders (`border-[1px]`).
  - Neutral: `border-slate-100` / `border-slate-200`.
  - Active/Focus: `border-slate-900`.

### Color Palette
- **Primary Background**: `#fafbfc` (Soft Neutral).
- **Surface**: `#ffffff` (Pure White).
- **Text**: 
  - Headings: `Slate-900`.
  - Body: `Slate-600`.
  - Technical/Labels: `Slate-400`.
- **Accents**:
  - Indigo: `indigo-600` / `indigo-50/50` (Primary/Admin).
  - Emerald: `emerald-600` / `emerald-50/50` (Success/Active).
  - Amber: `amber-600` / `amber-50/50` (Warning/Pending).

### Typography
- **Headings**: Sans-serif (Light/Medium weight) with tight tracking.
- **Labels & Data**: Mono-spaced (`font-mono`) for all technical indicators, status messages, and positional tags.
- **Case**: Tracking-heavy Uppercase for small labels to enhance the "Terminal" feel.

---

## 2. Component Patterns

### The Accent Line
Every primary header is preceded by a `w-10 h-px` horizontal line (`bg-slate-200`). This serves as a structural anchor and a recurring visual motif.

### Bento Stats Grid
- **Structure**: Metric cards arranged in a grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
- **Interaction**: On hover, the border shifts from `slate-200` to `slate-900`, accompanied by a subtle offset shadow (`shadow-[10px_10px_40px_-15px_rgba(0,0,0,0.05)]`).

### Technical Filter Console
Inputs and filters are grouped in a technical console style:
- **Labels**: Prepended with a mono-spaced identifier (e.g., `DEPT: `).
- **Icons**: Minimalist `lucide-react` icons (12px-14px) with custom chevrons.

### Premium Loading System
- **Spinner**: Smooth, multi-layered rounded design with varying rotation speeds and subtle glows. This component is the ONLY exception to the `rounded-none` rule, using perfect circles to communicate fluidity and premium system processing.
- **Backdrop**: Advanced glassmorphism (`backdrop-blur-xl`) with soft, high-quality overlays and radial gradients.
- **Status**: Progress messages in pulsing mono-spaced text with tracking-heavy alignment.

### Responsive Modal Architecture
To prevent vertical overflow and ensure terminal access across all devices:
- **Constraint**: Modal containers must use `max-h-[90vh]` or `max-h-[95vh]`.
- **Scrolling**: Implement `overflow-y-auto` on the primary content area (form/list) within the modal.
- **Layout**: Use `flex flex-col` on the modal card to keep headers and footers stable while content scrolls.
- **Spacing**: Apply `p-4` or `p-6` mobile padding to avoid edge clipping on small viewports.

---

## 3. Interaction Design
- **Micro-interactions**: Use 300ms transitions for all hover states.
- **Active Indicators**: Navigation active states use a 2px vertical bar on the left edge.
- **Button Feedback**: Subtle `active:scale-95` on clicks to provide tactile response.

---

## 4. Layout Architecture
- **Desktop**: Fixed `w-64` sidebar with a scrollable main content area offset by `md:pl-64`.
- **Mobile**: Collapsible sidebar drawer with a top-left hamburger menu. Main content includes a header spacer to prevent overlap.
