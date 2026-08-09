# Headless Sidebar Menu

Reusable **headless** sidebar menu (React 19 + TypeScript) with a HelloClient-styled Tailwind + React Router demo. Behavior follows [`task.md`](task.md) and [`sources/`](sources/).

**Live demo:** [https://radomir-radionov.github.io/tt-01-sidebar/](https://radomir-radionov.github.io/tt-01-sidebar/)

## Quick start

```bash
npm install
npm run dev
```

- `npm run build` — typecheck + production build  
- `npm run preview` — preview the production build

## Architecture

| Domain | Path | Responsibility |
| --- | --- | --- |
| Headless menu | [`src/sidebar-menu/`](src/sidebar-menu/) | Compound API, providers, hooks, types — **no styles, no React Router** |
| Shared assets | [`src/shared/`](src/shared/) | Consumer SVG icons |
| Consumer demo | [`src/app/`](src/app/) | HelloClient look (Tailwind), layout chrome, React Router wiring |

```text
src/
  sidebar-menu/         # headless domain (import from here)
    components/         # compound SidebarMenu API
    providers/          # context + selection / open / density
    hooks/              # controllable state + viewport
    types/ utils/
    index.ts            # public barrel
  shared/
    assets/icons/
  app/                  # demo domain
    components/         # AppSidebar + nav/* paint
    pages/
    App.tsx
  main.tsx
  index.css             # Tailwind entry (demo only)
```

## Headless API (JSX composition)

Menu structure is declared with components — not a JSON/`items[]` config:

```tsx
import { SidebarMenu } from './sidebar-menu'

<SidebarMenu
  value={pathname}
  onValueChange={navigate}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
>
  <SidebarMenu.Item value="/trends">{({ selected }) => …}</SidebarMenu.Item>

  <SidebarMenu.Sub value="inventory">
    <SidebarMenu.SubTrigger>{({ active, open }) => …}</SidebarMenu.SubTrigger>
    <SidebarMenu.SubContent>
      <SidebarMenu.Item value="/inventory/products">…</SidebarMenu.Item>
    </SidebarMenu.SubContent>
  </SidebarMenu.Sub>

  <SidebarMenu.CollapseTrigger />
</SidebarMenu>
```

### Submenu presentation (behavior from webp mockups)

| Mode | When | Behavior |
| --- | --- | --- |
| `flyout` | Desktop + collapsed | Side panel on hover/click |
| `inline` | Desktop + wide | Children under parent; auto-expand when a child is active |
| `sheet` | Mobile (`max-width: 767px`) | Overlay with dimmed backdrop + close |

## Visual vs behavior refs

| Source | Role |
| --- | --- |
| [`sources/desctop-ui.mp4`](sources/desctop-ui.mp4) | **Desktop look + interaction** (HelloClient UI) |
| [`sources/mobile-ui.mp4`](sources/mobile-ui.mp4) | **Mobile look + interaction** (bottom nav, sheet) |
| `sources/image*.webp` | **Behavior only** (minimal/wide, flyout vs inline, active parent) — not paint |

## Demo highlights

- [`AppSidebar.tsx`](src/app/components/AppSidebar.tsx) — router + collapsed state; paint in [`nav/`](src/app/components/nav/)
- Controlled API (`value` / `onValueChange`, `collapsed` / `onCollapsedChange`) works with Router or plain `useState`
- Resize below 768px for the mobile bottom nav

## Spec

[`task.md`](task.md)
