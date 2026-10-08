# Interfaces de Empleado (`/empleado`)

4 interfaces con sesión mock `MOCK_EMPLOYEE_SESSION`. Shell `AppShell` con navegación
`EMPLOYEE_NAV`. Incluye los dos roles operativos: `TICKET_SELLER` (vendedor de tiquetes) y
`QR_VALIDATOR` (validador de QR), definidos en `UserRole`.

> Base compartida (tipos, `lib`, componentes UI, datos mock): ver `APP-CORE.md`.

## Rutas

| Ruta | Página | Fichero |
|---|---|---|
| `/empleado` | Panel del día | `src/app/empleado/page.tsx` |
| `/empleado/reservas` | Reservas y acceso | `src/app/empleado/reservas/page.tsx` |
| `/empleado/pos` | Punto de venta | `src/app/empleado/pos/page.tsx` |
| `/empleado/qr` | Validación QR | `src/app/empleado/qr/page.tsx` |

---

## 1. Panel del día — `/empleado`

Encabezado: *"Panel del **empleado**"* con `SegmentedTabs` para cambiar de rol visible
(`TICKET_SELLER` / `QR_VALIDATOR`) — el rol solo reordena/ajusta los accesos rápidos, es una
demostración visual.

| Bloque | Componente | Contenido |
|---|---|---|
| Aviso de operación | `common/MaintenanceNotice` | Banner de mantenimiento u horario semanal |
| Resumen | `employees/EmployeeSummary` | 5 `StatCard`: reservas de hoy, visitantes esperados, servicios activos, próximas franjas (hint con horario), por atender (`accessStatus === 'NOT_ENTERED'`) |
| Control de acceso | `employees/AccessControl` | Búsqueda por código o nombre (`Search`), resultados con cliente, servicio, recurso, fecha, horario y código; estados "criterio vacío" y "reserva no encontrada" |
| Accesos del rol | `common/QuickLinks` | Según el rol seleccionado: `/empleado/pos`, `/empleado/reservas`, `/empleado/qr` |
| Franjas de hoy | página | Lista ordenada por hora con `StatusBadge` de estado y acceso, enlace **Ver todas** → `/empleado/reservas` |

Datos: `MOCK_RESERVATIONS`, `MOCK_SERVICES`, `getOperatingSlots()` (devuelve `[]` en día de
mantenimiento).

---

## 2. Reservas y acceso — `/empleado/reservas`

Encabezado: *"Reservas del **día**"*.

**Filtros** (`ReservationFiltersBar` con `showQuery={false}`): fecha, servicio, estado y franja
(hay botón de búsqueda solo para admin; aquí se filtra en vivo). Contador y `EmptyState`.

**Tabla** (`Table` responsive): franja + fecha, cliente + código, servicio + recurso físico,
estado (`StatusBadge`), acceso (`accessKey(accessStatus)` + `qrStatus`) y acciones:

| Acción | Comportamiento |
|---|---|
| Ver detalles | `ReservationDetailModal` con `showAccess` |
| Verificar acceso | Mismo modal con `showQr` (muestra el tiquete para validar) |
| Registrar entrada | `updateAccess(id, 'INSIDE')`; deshabilitado si ya está `INSIDE` |
| Registrar salida | `updateAccess(id, 'EXITED')`; habilitado solo si está `INSIDE` |

El modal de detalle expone `actions`: botón **Cerrar** y **Registrar entrada** cuando la
reserva no está dentro (solo lectura/acción visual, sin backend).

---

## 3. Punto de venta — `/empleado/pos`

Encabezado: *"Venta en **sitio**"*.

Formulario en 2 columnas (`xl:grid-cols-5`):

1. **Datos del cliente**: nombre completo y cédula (obligatorios para confirmar).
2. **Selección de servicio**: grid de tarjetas seleccionables con los 9 servicios de
   `MOCK_SERVICES` (nombre, precio por persona-hora o por hora, capacidad); la selección se
   resalta con borde/fondo `club-primary`.
3. **Franja y cantidad**: fecha, franja horaria (`08:00`–`16:00`), duración en horas (limitada
   por `MAX_DURATION_HOURS` y el cierre `OPERATING_CLOSE`) y cantidad (etiqueta dinámica:
   "Personas" en servicios por persona, "Cantidad" en servicios por hora fija).
4. **Medio de pago**: botones `Efectivo` / `Tarjeta`.

Panel derecho (`pos/components/TicketPreview`): tiquete digital con borde punteado que muestra
cliente, cédula, servicio, recurso, fecha, franja, cantidad, medio de pago, valor base,
descuento y total; nota de "máximo un descuento del 20% por reserva".

**Reglas aplicadas en el cálculo:**

- Total = precio × horas (× personas si `PER_PERSON_HOUR`).
- `isWednesday(date)` aplica `WEDNESDAY_DISCOUNT` (20%); nunca se acumulan descuentos.
- Validación `isWithinOperatingHours({ start, end })` antes de confirmar.
- Confirmar valida nombre y cédula, muestra estado **Tiquete generado** (con total y datos)
  y botón **Nueva venta**; no valida disponibilidad ni persiste.

---

## 4. Validación QR — `/empleado/qr`

Encabezado: *"Lector de **QR**"* con sello "Demostración sin cámara real".

**Área de escaneo** (colina izquierda): recuadro punteado con `QrCode`/`ScanLine`, estados
*Esperando escaneo* → *Escaneando...* → *Escaneo completado*, botones **Simular escaneo** y
**Reiniciar**. Cada simulación recorre un escenario distinto (ciclo):

| # | Estado (`QrStatus`) | Escenario |
|---|---|---|
| 1 | `VALID` | Reserva válida hoy (muestra aviso de entrada tardía si la franja sigue activa) |
| 2 | `USED` | Tiquete ya usado |
| 3 | `EXPIRED` | HOLD de pago expirado y capacidad liberada |
| 4 | `OUTSIDE_TIME` | Reserva fuera de su franja válida |
| 5 | `CANCELLED` | Reserva cancelada |
| 6 | `NOT_FOUND` | Código inexistente |

**Panel de resultado** (colina derecha): badges de QR, reserva, pago (`paymentKey`) y acceso
(`accessKey`); mensajes específicos por estado; datos de la reserva (cliente, servicio,
recurso, fecha, horario, código, color de pulsera solo-lectura y estado del tiquete).

- Si el estado es `VALID`: botón **Permitir ingreso / Autorizar acceso** → estado visual
  **Ingreso autorizado** con el nombre del cliente y su color de pulsera.
- Si no es válido: nota "El ingreso no puede autorizarse con este estado de tiquete".
- `NOT_FOUND` muestra `EmptyState` "Reserva no encontrada".

No accede a la cámara, no consulta base de datos y no marca `USED`; el QR es transferible
(no se rechaza por identidad).

---

## Reglas de negocio visibles en empleado

- Operación 8:00 AM – 5:00 PM y cierre de mantenimiento (resumen de franjas con
  `getOperatingSlots`, banner `MaintenanceNotice`).
- HOLD de pago de 10 minutos representado vía `qrStatus: 'EXPIRED'` en la validación.
- Pago pendiente ≠ confirmado ≠ reserva confirmada (badges separados).
- Recurso físico fijo por reserva y QR transferible.
- Pulsera por color como información de solo lectura (sin inventario).
- Descuento miércoles 20% calculado en el POS, sin acumulación.

## Verificación

`tsc --noEmit`, `npm run lint`, `npm run build` y respuesta `200` de las 4 rutas.
