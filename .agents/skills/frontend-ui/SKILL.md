# Frontend UI Skills — Vice City MVP

## Objective

Implement the frontend interfaces for the Vice City MVP using Next.js + TypeScript and the existing project architecture.

These skills define only the visual frontend work and user interface interactions.

Before implementing any interface:

* Review the existing skills and project documentation.
* Review `docs/`, reusable components, and the current project structure.
* Reuse existing components before creating new ones.
* Maintain the feature-based architecture.
* Do not duplicate components.
* Do not modify existing functionality unrelated to the assigned task.
* Do not add unnecessary dependencies.
* Keep all interfaces responsive.
* Use mock data to represent dynamic information.
* Actions may change the visual state of the interface, but must not implement real backend logic.
* Prepare interfaces to be connected to APIs later.
* Follow the visual rules, components, typography, spacing, and conventions defined in the existing skills/documentation. Do not create a parallel design system.

---

# 1. ADMIN DASHBOARD

## Route

`/admin`

## Objective

Create the main administrator dashboard with an overview of the sports complex operation.

## Elements

### Summary

Display cards for:

* Today's reservations.
* Pending reservations.
* Revenue.
* Registered users.
* Current occupancy.

### Upcoming Reservations

Display a list or table containing:

* Customer.
* Service.
* Date.
* Time.
* Status.
* Price.

Available statuses:

* Pending.
* Confirmed.
* Cancelled.
* Finished.

### Occupancy

Visually display occupancy for:

* Adult Pool 1.
* Adult Pool 2.
* Adult Pool 3.
* Children's Pool 1.
* Large Soccer Field.
* Micro Soccer Field.
* Multi-purpose Court.
* Gym.
* Wet Area.

The information must visually represent the concept of capacity and occupancy.

### Revenue

Add a visual chart using mock data.

Allow the interface to display information by:

* Day.
* Week.
* Month.
* Year.

### Quick Actions

Include visual shortcuts for:

* New reservation.
* Services.
* Users.
* Revenue.

Do not implement the actual operations yet.

---

# 2. ADMIN — RESERVATIONS

## Route

`/admin/reservas`

## Objective

Create the administrator interface for visually reviewing and managing reservations.

## Elements

### List

Display:

* Customer.
* Service.
* Resource.
* Date.
* Time.
* Price.
* Status.

### Search

Allow visual searching by:

* Customer.
* Service.
* Date.

### Filters

Add visual filters for:

* Date.
* Customer.
* Service.
* Status.
* Time slot.

### Statuses

Use the following statuses:

* Pending.
* Confirmed.
* Cancelled.
* Finished.

### Actions

Each reservation must visually allow:

* View details.
* Edit.
* Cancel.

Actions are visual/mock only.

### Important Information

The interface must be prepared to later represent:

* Normal reservation.
* Full pool reservation.
* Payment-pending reservation.
* Reservation confirmed after payment.
* Reservation expired due to HOLD.

The frontend must not implement the actual concurrency, expiration, or payment logic yet.

---

# 3. ADMIN — SERVICES

## Route

`/admin/servicios`

## Objective

Create the interface for managing the categories and services available in the sports complex.

## Information

Each service must be able to represent:

* Name.
* Category.
* Price.
* Booking modality.
* Capacity.
* Status.
* Schedule.
* Image.
* Associated physical resource.

### Initial Services

Visually represent:

* Adult Pool 1.
* Adult Pool 2.
* Adult Pool 3.
* Children's Pool 1.
* Large Soccer Field.
* Micro Soccer Field.
* Multi-purpose Court.
* Gym 1.
* Sauna / Wet Area.

### Mock Prices

Use the values defined by the business rules:

* Pools: $2,000 COP per person/hour.
* Large Soccer Field: $140,000 COP/hour.
* Micro Soccer Field: $80,000 COP/hour.
* Multi-purpose Court: $70,000 COP/hour.
* Gym: $2,000 COP per person/hour.
* Wet Area: $4,000 COP per person/hour.

### Visual Actions

Allow the interface to visually represent:

* Create service.
* Edit service.
* Activate/deactivate.
* Delete.
* Configure price.
* Configure capacity.
* Configure schedule.

Do not connect to the database yet.

---

# 4. ADMIN — USERS AND EMPLOYEES

## Route

`/admin/usuarios`

## Objective

Create the administrator interface for viewing and managing users and employees.

## List

Display:

* Name.
* Email.
* Phone.
* Role.
* Status.
* Registration date.

### Roles

Represent:

* ADMIN.
* CLIENT.
* TICKET_SELLER.
* QR_VALIDATOR.

### Statuses

* Active.
* Inactive.

### Filters

Allow visual filtering by:

* Role.
* Status.
* Registration date.

### Actions

Allow the interface to visually represent:

* View user.
* Edit.
* Activate/deactivate.

Prepare the interface to later connect with real employee management.

---

# 5. ADMIN — REVENUE AND METRICS

## Route

`/admin/ganancias`

## Objective

Create a dedicated dashboard for analyzing revenue and sales behavior.

## Summary

Display:

* Total revenue.
* Total reservations.
* Highest-revenue service.
* Highest-sales day.
* Average occupancy.

## Charts

Create charts using mock data for:

### Revenue

Display:

* Day.
* Week.
* Month.
* Year.

### Reservations by Service

Compare:

* Pools.
* Large Soccer Field.
* Micro Soccer.
* Multi-purpose Court.
* Gym.
* Wet Area.

### Revenue Distribution

Visually display which services generate the highest revenue.

### Filters

Add a visual selector for:

* Day.
* Week.
* Month.
* Year.

Do not implement real database queries yet.

---

# 6. CLIENT — HOME

## Route

`/cliente`

## Objective

Create the main client page after login.

## Elements

### Welcome

Display basic user information and a call to action to make a reservation.

### Available Services

Display cards for:

* Adult Pools.
* Children's Pool.
* Large Soccer Field.
* Micro Soccer.
* Multi-purpose Court.
* Gym.
* Wet Area.

Each card must clearly identify:

* Service.
* Price.
* Booking modality.
* Capacity.
* Mock availability.
* Reservation action.

### Next Reservation

Display the client's next reservation with:

* Service.
* Date.
* Time.
* Price.
* Status.

### Quick Actions

Include:

* Book a service.
* My reservations.
* Profile.

---

# 7. CLIENT — RESERVATIONS

## Route

`/cliente/reservas`

## Objective

Create the interface where clients can view their reservations.

## Sections

Visually separate:

* Upcoming.
* Completed.
* Cancelled.

## Information

Each reservation must display:

* Service.
* Specific resource.
* Date.
* Time.
* Price.
* Status.

### Details

Allow opening a detail view containing:

* Reservation information.
* Schedule.
* Service.
* Price.
* Status.
* QR information when applicable.

### Cancellation

Display a visual cancel-reservation action when applicable.

The MVP does not provide refunds, so the interface must not display a money-refund flow.

---

# 8. CLIENT — PROFILE

## Route

`/cliente/perfil`

## Objective

Create the client's profile interface.

## Information

Display:

* Name.
* Email.
* Phone.
* Avatar.
* Basic account information.

### Editing

Create visual forms for:

* Editing personal information.
* Changing password.

### Account

Add visual actions for:

* Save changes.
* Log out.

Do not implement actual database modifications yet.

---

# 9. EMPLOYEE — DASHBOARD

## Route

`/empleado`

## Objective

Create the main employee dashboard.

The interface must account for two main employee types:

* `TICKET_SELLER`
* `QR_VALIDATOR`

Actual role-based access will be handled later by the backend/middleware.

## Summary

Display:

* Today's reservations.
* Expected visitors.
* Active services.
* Upcoming time slots.
* Upcoming reservations.

## Access Control

Create a visual section for:

* Search reservation.
* Search customer.
* View information.
* Check ticket status.
* Access the validation flow.

### Reservation Information

Display:

* Customer.
* Service.
* Resource.
* Date.
* Time.
* Status.
* Access status.

The interface must be prepared to later support QR validation.

---

# 10. EMPLOYEE — RESERVATIONS

## Route

`/empleado/reservas`

## Objective

Create the reservation management interface for employees.

## Filters

Include:

* Date selector.
* Service.
* Status.
* Time slot.

## List

Display:

* Customer.
* Service.
* Resource.
* Date.
* Time.
* Status.
* Access information.

### Statuses

Visually represent:

* Pending.
* Confirmed.
* In progress.
* Finished.
* Cancelled.

### Actions

Visually allow:

* View details.
* Check access.
* Register entry.
* Register exit.

Actions are mock-only and must not modify the database yet.

---

# 11. EMPLOYEE — POS

## Route

`/employee/pos`

## Objective

Create the visual interface for the on-site point-of-sale module.

This module corresponds to the `TICKET_SELLER` role.

## Sales Form

Represent the required information:

* Name.
* ID number.
* Service.
* Time slot.
* Quantity.
* Payment method.

Visual payment methods:

* Cash.
* Card.

## Service Selection

Allow visual selection of:

* Pools.
* Large Soccer Field.
* Micro Soccer.
* Multi-purpose Court.
* Gym.
* Wet Area.

## Preview

Before confirmation, display a digital ticket preview containing:

* Customer.
* Service.
* Resource.
* Date.
* Time.
* Quantity.
* Price.
* Payment method.
* Total.

Actual confirmation, availability, and persistence are outside the scope of this visual skill.

---

# 12. EMPLOYEE — QR VALIDATION

## Route

`/employee/qr`

## Objective

Create the visual interface for the `QR_VALIDATOR` employee to validate tickets using the phone camera.

## Main Screen

Display:

* Scanning area.
* Scan status.
* Found reservation information.

## Found Information

After a mock scan, display:

* Customer name.
* Date.
* Time.
* Service.
* Resource.
* Ticket status.
* QR status.

## Visual States

Represent:

* Valid QR.
* Expired QR.
* Used QR.
* Reservation not found.
* Reservation outside valid time.
* Cancelled reservation.

## Access Action

When the QR is valid, clearly display the action:

**"Allow Entry / Grant Access"**

The interface must visually represent the subsequent state:

**"Entry Authorized"**

## Late Entry

The interface must be able to represent a valid QR even when the customer arrives after the reservation start time, as long as the reservation time slot is still active.

Do not implement actual camera access, database validation, or real `USED` status updates yet.

---

# FUNCTIONAL RULES THE FRONTEND MUST REPRESENT

These rules belong to the business domain and must be used to correctly build visual states and mock data.

## Operating Hours

* Operating hours: 8:00 AM → 5:00 PM.
* Do not display availability outside operating hours.
* Time zone: `America/Bogota`.

## Maintenance

* Every Monday.
* If Monday is a public holiday, maintenance moves to Tuesday.
* During maintenance there are no reservations, POS sales, or QR access.

## Reservations

* Normal reservation: maximum 15 days in advance.
* Full pool reservation: maximum 20 days in advance.
* Minimum duration: 1 hour.
* Maximum duration: 9 hours.
* Access ends when the reserved time slot ends.
* A purchase started during an active time slot keeps the original time-slot end time.

## HOLD

When representing a web purchase process:

* The capacity is held for 10 minutes.
* Display a countdown timer.
* Show a pending state while payment has not been confirmed.
* When the timer expires, visually represent the release of the capacity.

The actual logic will be implemented later in the backend.

## Discounts

### Wednesday

20% discount.

### Full Pool Reservation

20% discount when applicable.

Do not allow both discounts to be visually combined.

A reservation must never display a 40% discount.

## Pools

A normal reservation uses a specific physical resource.

Do not represent a reservation as if it could automatically change from:

`Pool 1 → Pool 2 → Pool 3`

The resource must remain identified.

## Payments

The interface must visually differentiate:

* Payment pending.
* Payment confirmed.
* Reservation confirmed.

Do not automatically mark a payment as confirmed simply because the user pressed a button.

Actual confirmation will later depend on the Stripe Webhook.

## QR

The QR represents the ticket/reservation and must be able to visually display:

* Valid.
* Used.
* Expired.
* Cancelled.
* Outside valid time.

After the first successful entry, it must be possible to visually represent the ticket as `USED`.

The QR is transferable. The identity of the person physically presenting the QR must not be used as a visual condition for rejecting it.

## POS

The on-site sale must include:

* Name.
* ID number.
* Service.
* Time slot.
* Quantity.
* Payment method.
* Ticket preview.

## Wristbands

Do not create functionality for inventory, assignment, or management of physical wristbands.

Physical wristband management belongs to the sports complex's internal operations.

---

# IMPLEMENTATION CONSTRAINTS

These interfaces are frontend-only and visual.

DO NOT implement in these tasks:

* Backend.
* Real APIs.
* Prisma.
* Real PostgreSQL queries.
* Real Stripe integration.
* Webhooks.
* Real JWT.
* Real OAuth.
* Database concurrency.
* Transactions.
* Real QR validation.
* Real camera access.
* Real persistence.
* Backend business rules.

Use mock data and local state only when necessary to demonstrate visual flows.

The interfaces must be structured so that mocks can later be replaced with API/services without having to completely rebuild the UI.

---

# ARCHITECTURE

Maintain the existing project structure and feature-based architecture.

Before creating a component:

1. Check whether a reusable component already exists.
2. Reuse it if it satisfies the requirement.
3. Create a new component only when it is genuinely reusable or specific to the feature.
4. Avoid duplication between Admin, Client, and Employee interfaces.
5. Keep pages thin and move feature-specific components into their respective feature folders.

Do not reorganize the entire project unless the assigned task requires it.

Do not modify the existing Login/Register functionality.

Do not modify functionality outside the scope of the assigned interface.
