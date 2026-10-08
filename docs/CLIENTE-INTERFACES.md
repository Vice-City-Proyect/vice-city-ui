# Interfaces de Cliente (`/cliente`)

3 interfaces con sesión mock `MOCK_CLIENT_SESSION`. Shell `AppShell` con navegación
`CLIENT_NAV`.

> Base compartida (tipos, `lib`, componentes UI, datos mock): ver `APP-CORE.md`.

## Rutas

| Ruta | Página | Fichero |
|---|---|---|
| `/cliente` | Inicio | `src/app/cliente/page.tsx` |
| `/cliente/reservas` | Mis reservas | `src/app/cliente/reservas/page.tsx` |
| `/cliente/perfil` | Mi perfil | `src/app/cliente/perfil/page.tsx` |

---

## 1. Inicio — `/cliente`

**Hero** (`Card tone="dark"`): saludo "Hola, {nombre}" con la sesión mock, texto que recuerda
descuento de miércoles (20%) y mantenimiento de los lunes, CTAs **Reservar un servicio** y
**Ver mi perfil**, e `InfoChip`s de horario (`8:00 AM – 5:00 PM`), zona horaria (`TIME_ZONE`)
y descuento del miércoles.

**Instalaciones** (sección `#servicios`): grid de `ClientServiceCard` desde
`features/services/data/client-catalog.ts` (7 ítems). Cada tarjeta muestra imagen, badge de
disponibilidad (`success`/`pending`/`danger`), título, descripción, precio, modalidad,
capacidad, horario "Jornada 8:00 AM – 5:00 PM · Cerrado los lunes", recursos físicos,
anticipación máxima (`MAX_ADVANCE_DAYS_NORMAL` = 15 días) y CTA **Reservar** →
`/cliente/reservas`.

**Próxima reserva** (`reservations/ClientNextReservation`): tarjeta con la próxima reserva del
cliente (código, servicio, recurso, fecha, horario, total) o `EmptyState` si no hay.

**Accesos rápidos** (`QuickLinks`): `/cliente#servicios`, `/cliente/reservas`,
`/cliente/perfil`.

---

## 2. Mis reservas — `/cliente/reservas`

Encabezado: *"Mis **reservas**"* con `SegmentedTabs` de secciones y conteo:

| Sección | Definición (`clientSection`) |
|---|---|
| Próximas | Todas salvo `CANCELLED`/`FINISHED` |
| Completadas | `status === 'FINISHED'` |
| Canceladas | `status === 'CANCELLED'` |

Solo se listan reservas del cliente (`clientId === MOCK_CLIENT_SESSION.id`), ordenadas por
fecha descendente.

**Tarjeta de reserva** (grid 1–2 columnas): código, servicio, recurso físico, `StatusBadge`
de estado + `paymentKey(paymentStatus)`, fecha, horario, personas y total. Acciones:

- **Ver detalle y QR** → `ReservationDetailModal` con `showQr` (tiquete digital),
  desglose (base, descuento y total), notas de descuento no acumulable, estado de acceso y
  pulsera.
- **Cancelar reserva** → visible solo si `date >= hoy` y estado `PENDING`/`CONFIRMED`;
  actualiza `status` y `qrStatus` a `CANCELLED`. Nota permanente al pie:
  *"El MVP no aplica reembolsos por cancelación. La reserva cancelada queda registrada con su
  estado y no genera devolución de dinero."* (regla de negocio del MVP).

Estado vacío por sección con `EmptyState` + CTA "Ver próximas".

---

## 3. Mi perfil — `/cliente/perfil`

Encabezado: *"Mi **perfil**"* + acción **Cerrar sesión** (enlace a `/login`).

| Bloque | Contenido |
|---|---|
| Datos personales | Formulario `FormField` + `Input`: nombre completo, correo electrónico, teléfono; botón guardar con confirmación visual (`saved`) |
| Cambiar contraseña | Contraseña actual, nueva contraseña y confirmación; validaciones visuales: mínimo 8 caracteres y confirmación coincidente (`FormField error`) con mensajes de éxito (`passwordSaved`) |
| Resumen de cuenta | `Card` con avatar, nombre, rol (cliente), correo, estado y fechas (solo lectura) |

Validaciones solo en cliente; no hay envío a servidor.

---

## Reglas de negocio visibles en cliente

- Descuento miércoles 20% y cierre de mantenimiento los lunes (hero + tarjetas).
- Horario 8:00 AM – 5:00 PM (`America/Bogota`) y anticipación máxima 15 días.
- Pago pendiente vs. confirmado como badges distintos junto al estado de la reserva.
- Recurso físico fijo y QR transferible visibles en el detalle.
- Cancelación del cliente permitida solo como acción visual, sin reembolso en el MVP.

## Verificación

`tsc --noEmit`, `npm run lint`, `npm run build` y respuesta `200` de las 3 rutas.
