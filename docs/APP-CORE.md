# Núcleo compartido — Interfaces de la aplicación (sin backend)

Documento base de todo el trabajo construido para las 12 interfaces de la aplicación
(administración, cliente y empleado). Todo funciona con **datos mock**: no hay llamadas a API,
persistencia ni validación de servidor.

> Las interfaces por rol se documentan en `ADMIN-INTERFACES.md`, `CLIENTE-INTERFACES.md` y
> `EMPLEADO-INTERFACES.md`.

## Mapa de rutas

| Rol | Ruta | Página |
|---|---|---|
| Admin | `/admin` | `src/app/admin/page.tsx` |
| Admin | `/admin/reservas` | `src/app/admin/reservas/page.tsx` |
| Admin | `/admin/servicios` | `src/app/admin/servicios/page.tsx` |
| Admin | `/admin/usuarios` | `src/app/admin/usuarios/page.tsx` |
| Admin | `/admin/ganancias` | `src/app/admin/ganancias/page.tsx` |
| Cliente | `/cliente` | `src/app/cliente/page.tsx` |
| Cliente | `/cliente/reservas` | `src/app/cliente/reservas/page.tsx` |
| Cliente | `/cliente/perfil` | `src/app/cliente/perfil/page.tsx` |
| Empleado | `/empleado` | `src/app/empleado/page.tsx` |
| Empleado | `/empleado/reservas` | `src/app/empleado/reservas/page.tsx` |
| Empleado | `/empleado/pos` | `src/app/empleado/pos/page.tsx` |
| Empleado | `/empleado/qr` | `src/app/empleado/qr/page.tsx` |

Rutas anidadas con `layout.tsx` propio: `src/app/{admin,cliente,empleado}/layout.tsx`.

## Tipos (`src/types/`)

| Archivo | Contenido |
|---|---|
| `user.ts` | `UserRole` (`ADMIN` \| `CLIENT` \| `TICKET_SELLER` \| `QR_VALIDATOR`), `UserStatus`, `User` |
| `service.ts` | `ServiceCategory`, `BookingModality` (`PER_PERSON_HOUR` \| `FIXED_HOUR`), `ServiceStatus`, `PriceUnit`, `ServiceSchedule`, `Service`, `TimeSlot` |
| `reservation.ts` | `ReservationStatus`, `PaymentStatus` (`PENDING` \| `CONFIRMED`), `HoldState` (`NONE` \| `ACTIVE` \| `EXPIRED`), `ReservationType`, `AccessStatus` (`NOT_ENTERED` \| `INSIDE` \| `EXITED`), `DiscountType`, `QrStatus`, `WristbandColor`, `Reservation` |
| `auth.ts` | Re-exporta `UserRole`; `LoginFormData`, `AuthSessionUser` |

## Utilidades (`src/lib/`)

### `format.ts`

| Función | Uso |
|---|---|
| `formatCOP(value)` | `$ 140.000` |
| `formatCOPShort(value)` | `$ 140 k` (gráficas) |
| `formatDate(iso)` | `12 oct 2026` |
| `formatLongDate(iso)` | `12 de octubre de 2026` |
| `toISODate(date)` | `2026-10-12` en zona America/Bogota |

### `schedule.ts` — reglas de negocio centralizadas

| Export | Valor / firma | Regla |
|---|---|---|
| `TIME_ZONE` | `America/Bogota` | Zona horaria |
| `OPERATING_OPEN` / `OPERATING_CLOSE` | `08:00` / `17:00` | Horario de operación |
| `MAINTENANCE_DAY` | `1` (lunes) | Cierre por mantenimiento |
| `HOLIDAY_AFTER_MAINTENANCE_DAY` | `2` (martes) | Si el lunes es festivo, se mueve al martes |
| `MAX_ADVANCE_DAYS_NORMAL` / `MAX_ADVANCE_DAYS_FULL_POOL` | `15` / `20` | Anticipación máxima de reserva |
| `MIN_DURATION_HOURS` / `MAX_DURATION_HOURS` | `1` / `9` | Duración de franja |
| `HOLD_MINUTES` | `10` | HOLD de pago antes de liberar capacidad |
| `WEDNESDAY_DISCOUNT` / `FULL_POOL_DISCOUNT` | `20` / `20` | Descuentos (nunca se acumulan) |
| `isWithinOperatingHours(slot)` | `TimeSlot => boolean` | Validación 8:00–17:00 |
| `isMaintenanceDay(iso, holiday?)` | `boolean` | ¿Hoy aplica mantenimiento? |
| `isWednesday(iso)` | `boolean` | ¿Aplica descuento del 20%? |
| `getOperatingSlots(iso)` | `TimeSlot[]` | Franjas disponibles (`[]` en mantenimiento) |
| `addHours(time, hours)` | `string` | Cálculo de hora final |

## Componentes UI (`src/components/ui/`)

Reutilizables por los tres roles. Todos respetan los tokens de `docs/DESIGN-SYSTEM.md`.

| Componente | Props principales | Descripción |
|---|---|---|
| `Button` / `ButtonLink` | `size`, `variant`, `type` | Acciones; `variant` `dark`/`light`/por defecto |
| `Card` | `tone` (`light` \| `dark`), `className` | Contenedor con borde redondeado y borde sutil |
| `PageHeader` | `eyebrow`, `title`, `highlightedTitle`, `description`, `actions` | Encabezado de página con título en dos partes (parte resaltada en `club-primary`) |
| `StatCard` | `label`, `value`, `icon`, `hint`, `className` | Métrica compacta |
| `StatusBadge` | `status` (`StatusKey`) | Badge con estilo por estado; helpers `paymentKey()`, `accessKey()`, `holdKey()` |
| `Badge` | `tone` (`success` \| `pending` \| `danger` \| `neutral` …) | Badge genérico |
| `Table` | `columns`, `data`, `rowKey`, `renderCard`, `minWidth` | Tabla responsive: tabla en desktop y tarjetas en móvil (`renderCard`) |
| `Modal` | `open`, `onClose`, `title`, `eyebrow`, `footer`, `children` | Modal accesible con overlay; se monta condicionalmente para reiniciar el estado del formulario |
| `SegmentedTabs` | `options`, `value`, `onChange`, `ariaLabel` | Tabs segmentados (secciones, periodos, roles) |
| `Select` / `Input` / `Label` / `FormField` | `error`, `className` + nativas | Controles de formulario con soporte de error |
| `ProgressBar` | `value`, `max`, `label`, `hint` | Barra de progreso (ocupación) |
| `Avatar` | `name`, `size` | Avatar con iniciales |
| `EmptyState` | `icon`, `title`, `description` | Estado vacío ilustrado |

## Componentes comunes (`src/components/common/`)

| Componente | Descripción |
|---|---|
| `QuickLinks` | Panel de accesos rápidos `{ href, label, icon }[]`; lo usan los tres dashboards |
| `MaintenanceNotice` | Banner de mantenimiento: aviso destacado si hoy es día de mantenimiento, o la regla semanal (lunes / martes si el lunes es festivo) con horario 8:00 AM – 5:00 PM |
| `charts/RevenueChart` | Línea de ingresos (recharts) — props `data: ChartPoint[]`, `height` |
| `charts/ServiceBarChart` | Barras por servicio — props `data`, `height`, `currency` |
| `charts/DistributionDonut` | Dona de distribución — props `data: DistributionPoint[]` |
| `charts/chart-utils` | `CHART_COLORS`, `AXIS_TICK`, `ChartTooltip` (usan CSS vars del tema, sin hex hardcodeados) |

## Layout (`src/components/layout/`)

- `AppShell.tsx`: shell compartido con sidebar (navegación), topbar (nombre de rol y usuario
  mock) y menú hamburguesa en móvil. Ítem activo resaltado con `bg-club-primary`.
- `app-nav.ts`: `ADMIN_NAV`, `CLIENT_NAV`, `EMPLOYEE_NAV` y `ROLE_LABELS`.
- `src/app/{admin,cliente,empleado}/layout.tsx`: montan `AppShell` con la sesión mock
  correspondiente (`src/features/auth/data/mock-session.ts`: `MOCK_ADMIN_SESSION`,
  `MOCK_CLIENT_SESSION`, `MOCK_EMPLOYEE_SESSION`).

## Datos mock compartidos

| Archivo | Contenido |
|---|---|
| `features/auth/data/mock-session.ts` | Sesiones mock por rol (id, nombre, rol, email) |
| `features/services/data/mock-services.ts` | 9 servicios con precio/capacidad/modalidad exactos ($2.000 persona-hora; $140.000 fútbol 11; $80.000 micro; $70.000 multipropósito; $4.000 zona húmeda) |
| `features/reservations/data/mock-reservations.ts` | 19 reservas con fechas relativas, descuentos calculados (`WEDNESDAY_DISCOUNT`/`FULL_POOL_DISCOUNT`), `holdExpiresAt = ahora + 10 min`, estados de acceso/QR/pulsera |
| `features/reservations/data/reservation-filters.ts` | `ReservationFilters` (`query`, `date`, `service`, `status`, `slot`), `filterReservations`, `hasActiveFilters`, `clientSection`, `TIME_SLOT_OPTIONS`, `RESERVATION_STATUS_OPTIONS` |
| `features/reports/data/mock-revenue.ts` | Series de ingresos, reservas por servicio, distribución y resumen por periodo |
| `features/users/data/mock-users.ts` | 12 usuarios (clientes y empleados) con estados y fechas de registro |

Los componentes de `features/employees/` y `features/pos/` consumen `MOCK_RESERVATIONS` y
`MOCK_SERVICES` (no tienen dataset propio).

## Reglas de negocio representadas en la UI

- Horario 8:00 AM – 5:00 PM (`America/Bogota`) y cierre de mantenimiento los lunes/martes.
- Descuento miércoles 20% y piscina completa 20%, **nunca acumulables**.
- HOLD de pago de 10 minutos: `paymentStatus`, `holdState` y cuenta regresiva visibles.
- Pago pendiente ≠ pago confirmado ≠ reserva confirmada (badges diferenciados).
- Recurso físico fijo por reserva (`resource` visible en detalle).
- QR transferible: la validación no rechaza por identidad del portador.
- Pulsera por color: solo lectura (sin inventario).
- Duración máxima 9 horas; anticipación 15 días (20 para piscina completa).

## Verificación

```bash
npx tsc --noEmit   # sin errores
npm run lint       # sin errores (solo warning preexistente en src/middleware.ts)
npm run build      # 17 rutas generadas
```

Las 14 rutas responden `200` en `npm run dev`.
