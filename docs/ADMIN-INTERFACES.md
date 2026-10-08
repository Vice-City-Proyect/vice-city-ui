# Interfaces de Administración (`/admin`)

5 interfaces con sesión mock `MOCK_ADMIN_SESSION`. Todas usan el shell `AppShell` con
navegación de admin (`ADMIN_NAV`) definida en `src/components/layout/app-nav.ts`.

> Base compartida (tipos, `lib`, componentes UI, datos mock): ver `APP-CORE.md`.

## Rutas

| Ruta | Página | Fichero |
|---|---|---|
| `/admin` | Dashboard | `src/app/admin/page.tsx` |
| `/admin/reservas` | Reservas | `src/app/admin/reservas/page.tsx` |
| `/admin/servicios` | Servicios | `src/app/admin/servicios/page.tsx` |
| `/admin/usuarios` | Usuarios | `src/app/admin/usuarios/page.tsx` |
| `/admin/ganancias` | Ganancias | `src/app/admin/ganancias/page.tsx` |

---

## 1. Dashboard — `/admin`

Encabezado: eyebrow *"Panel de control"*, título *"Resumen del **complejo**"* + botón
**Nueva reserva**.

| Bloque | Componente | Contenido |
|---|---|---|
| Aviso de operación | `common/MaintenanceNotice` | Banner de mantenimiento (hoy aplica, o regla lunes/martes + horario) |
| Métricas | `administration/DashboardStats` | 5 `StatCard`: reservas de hoy (hint franja 8:00 AM – 5:00 PM), pendientes (esperando confirmación de pago), ingresos de hoy (pagos confirmados), usuarios, ocupación actual |
| Próximas reservas | `administration/UpcomingReservations` | Lista de reservas próximas con `StatusBadge`; estado vacío `EmptyState` |
| Accesos rápidos | `administration/QuickActions` | `QuickLinks` → `/admin/reservas`, `/admin/servicios`, `/admin/usuarios`, `/admin/ganancias` |
| Ocupación | `administration/OccupancyPanel` | `ProgressBar` por instalación |
| Ingresos | `administration/RevenuePanel` | `RevenueChart` con `SegmentedTabs` de periodo (`week` por defecto) |

Datos: `administration/data/mock-occupancy.ts`, `MOCK_RESERVATIONS`, `MOCK_USERS`.

---

## 2. Reservas — `/admin/reservas`

Encabezado: *"Reservas del **complejo**"* + botón **Nueva reserva**.

**Filtros** (`ReservationFiltersBar` sobre `Card`):
- búsqueda por texto (`query`),
- fecha,
- servicio (opciones desde `MOCK_SERVICES`),
- estado (opciones `RESERVATION_STATUS_OPTIONS`),
- franja horaria (`TIME_SLOT_OPTIONS`).

Lógica: `filterReservations()` + `hasActiveFilters()` en
`features/reservations/data/reservation-filters.ts`. Contador de resultados y
`EmptyState` cuando no hay coincidencias.

**Tabla** (`Table`, responsive con `renderCard` en móvil): código, cliente, servicio +
recurso físico, fecha, hora (`08:00 – 10:00`), precio total, estado y acciones:

| Acción | Comportamiento |
|---|---|
| Ver detalles | Abre `ReservationDetailModal` (badges de estado, pago, hold, acceso, QR, pulsera, descuento, `HoldCountdown` si el HOLD está activo y explicación si expiró) |
| Editar | Abre `ReservationEditModal` con fecha, hora de inicio, personas y estado; `onSave` actualiza el estado local |
| Cancelar | Cambia `status` y `qrStatus` a `CANCELLED` (deshabilitado si ya está `CANCELLED` o `FINISHED`) |

Los modales se montan condicionalmente (`{editing && ...}`) para reiniciar el formulario.

---

## 3. Servicios — `/admin/servicios`

Encabezado: *"Servicios del **complejo**"* + contador de activos/inactivos + botón
**Nuevo servicio**.

- Grid `md:grid-cols-2 xl:grid-cols-3` de `ServiceCard` (imagen, categoría, recurso físico,
  precio, capacidad, horario, estado).
- Acciones por tarjeta: **Editar**, **Activar/Desactivar** (toggle `status`) y **Eliminar**
  (confirmación visual).
- `ServiceFormModal` (crear/editar) con campos: nombre, categoría, recurso físico, precio
  (COP), capacidad, modalidad de reserva (`PER_PERSON_HOUR`/`FIXED_HOUR`), estado, apertura,
  cierre e imagen (ruta en `/public`).
- Al crear se agrega con id generado; estado vacío con `EmptyState` + CTA.

Datos: `features/services/data/mock-services.ts` (9 servicios con precios y capacidades
exactos: $2.000 persona-hora, $140.000 fútbol 11, $80.000 micro, $70.000 multipropósito,
$4.000 zona húmeda).

---

## 4. Usuarios — `/admin/usuarios`

Encabezado: *"Usuarios y **empleados**"*.

**Filtros**: rol (`UserRole`), estado (`ACTIVE`/`INACTIVE`), registrado desde (fecha).

**Tabla** (`Table` con `Avatar`): avatar/nombre, correo, rol (`ROLE_LABELS`), estado
(`StatusBadge`), fecha de registro y acciones:

| Acción | Comportamiento |
|---|---|
| Ver usuario | `UserDetailModal`: datos, rol, estado y fecha de registro |
| Editar | `UserFormModal`: nombre, correo, teléfono, rol, estado; nota de que los roles determinan los permisos (administrador, cliente, vendedor de tiquetes, validador QR) |
| Activar/Desactivar | Alterna `status` sin persistencia |

Datos: `features/users/data/mock-users.ts` (12 usuarios).

---

## 5. Ganancias — `/admin/ganancias`

Encabezado: *"Ingresos y **métricas**"* con `SegmentedTabs` de periodo
(`REVENUE_PERIODS`).

| Bloque | Contenido |
|---|---|
| 5 `StatCard` | Ingresos totales, reservas totales, servicio top, día top, ocupación promedio |
| `RevenueChart` | Línea de facturación del periodo seleccionado (`MOCK_REVENUE[period]`) |
| `ServiceBarChart` | Reservas por instalación (`MOCK_RESERVATIONS_BY_SERVICE`) |
| `DistributionDonut` | Participación de cada servicio en la facturación (`MOCK_REVENUE_DISTRIBUTION`) |

Datos: `features/reports/data/mock-revenue.ts`. Los gráficos usan CSS vars del tema
(`CHART_COLORS`) en lugar de hex hardcodeados.

---

## Reglas de negocio visibles en admin

- Badges diferenciados: `paymentStatus` (pendiente/confirmado) ≠ `status` de reserva.
- Cuenta regresiva de HOLD de 10 minutos (`HoldCountdown`) y mensaje de capacidad liberada
  cuando `holdState === 'EXPIRED'`.
- Descuentos con nota "no se acumula con otros descuentos" (miércoles / piscina completa).
- Recurso físico fijo visible en toda lista y detalle de reserva.
- Horario y mantenimiento representados en el dashboard (`MaintenanceNotice`).

## Verificación

`tsc --noEmit`, `npm run lint`, `npm run build` y respuesta `200` de las 5 rutas.
