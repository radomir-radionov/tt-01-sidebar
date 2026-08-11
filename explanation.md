# Comment to fix — explanation

Source: `task.md` § «Комментарий к исправлению» (re-checked).

Reviewer: task understood mostly correctly, but **Router was done without a real integration layer** — it was put on the **business/app level “наживую”**.

---

## What is what

### Headless UI (`HeadlessMenu`)

Logic-only menu: open/active/collapsed, keyboard, focus, ARIA, mobile breakpoint behavior.

- Controlled props so any store can drive it (`useState`, localStorage, router, …).
- **No** React Router inside.
- Per the fix comment: behavior + **only the most necessary styles** (not product branding).

In this repo: `src/headless-menu/**` → `HeadlessMenu`.

### RouterMenu (product adapter)

Wraps HeadlessMenu and adds:

- Active route (`useLocation`)
- Navigation (`navigate`)
- Final app design / branding

Exposes high-DX compounds: `RouterMenu.Item`, `RouterMenu.Group` — no keys/state/handlers for callers.

In this repo: `src/app/components/RouterMenu.tsx` (+ HelloClient paint in `nav/**`).

### Business layer

Declares the menu tree only: `label`, `to`, `icon`. No ids, handlers, classNames, or router wiring.

In this repo: business tree lives in `AppSidebar` inside `RouterMenu`.

---

## How it was done (what the comment criticizes)

Router wired **ad-hoc at business level**:

```tsx
// ❌ App/business knows pathname, navigate, headless props, styles
<HeadlessMenu value={pathname} onValueChange={navigate}>
  <HeadlessMenu.Item value='/shop' className='…'>
    …
  </HeadlessMenu.Item>
</HeadlessMenu>
```

That is hand-wiring, not a reusable `RouterMenu` integration.

---

## How it needs to be (comment checklist)

From the comment, integration means:

1. **HeadlessMenu** — headless component: behavior (+ minimal styles only).
2. **RouterMenu** — product wrapper: router binding + own design.
3. **DX API** — business markup like:

```tsx
<RouterMenu>
  <RouterMenu.Group label='Group 1'>
    <RouterMenu.Item label='Item 1' to='/path/1' />
    <RouterMenu.Item label='Item 2' to='/path/2' />
  </RouterMenu.Group>
  <RouterMenu.Item label='Item 3' to='/path/3' />
  <RouterMenu.Item label='Item 4' to='/path/4' />
</RouterMenu>
```

1. **Zones of responsibility**

| Level                | Result                                                             |
| -------------------- | ------------------------------------------------------------------ |
| Component (headless) | Behavior testable alone; Storybook without router                  |
| RouterMenu           | Active path, navigate, final branding styles                       |
| Business             | Simple markup — no implementation leakage (no ids/handlers/styles) |

Goal of the test: separate styles from logic **and** ship high DX so other developers can use and test the menu easily.

---

## How it is now (re-check vs comment)

| Comment requirement                                  | Current code                                                                   | Verdict                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------- |
| 1. HeadlessMenu, no router inside                    | `src/headless-menu/**`                                                          | **OK**                                            |
| 2. RouterMenu wraps headless + route + design        | `RouterMenu` → `HeadlessMenu` + `SidebarShell` / `nav/**`                       | **OK**                                            |
| 3. Compound DX (`Item` / `Group`, only `label`/`to`) | `RouterMenu.Item` / `.Group`; tree in `AppSidebar`                             | **OK**                                            |
| 4.1 Test headless without router                     | Controlled props on `HeadlessMenu`                                              | **OK** (Storybook not present, but API allows it) |
| 4.2 Router + branding in RouterMenu                  | `value={pathname}`, `onValueChange={navigate}`, paint in product layer         | **OK**                                            |
| 4.3 Business has no ids/handlers/styles              | `AppSidebar` = `Item` / `Group` only; Settings/Knowledge = RouterMenu `footer` | **OK**                                            |

**Bottom line:** realization **matches the fix comment** (Headless → RouterMenu → business DX). `SidebarShell` is reusable layout; app-specific utility links live in RouterMenu.
