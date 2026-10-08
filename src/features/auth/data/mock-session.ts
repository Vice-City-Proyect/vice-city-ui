import type { AuthSessionUser } from '@/types/auth';

export const MOCK_ADMIN_SESSION: AuthSessionUser = {
  id: 'usr-001',
  name: 'Andrés Ríos',
  email: 'admin@vicecityiguana.co',
  role: 'ADMIN',
};

export const MOCK_CLIENT_SESSION: AuthSessionUser = {
  id: 'usr-101',
  name: 'Laura Mendoza',
  email: 'laura.mendoza@correo.com',
  role: 'CLIENT',
};

export const MOCK_EMPLOYEE_SESSION: AuthSessionUser = {
  id: 'usr-201',
  name: 'Carlos Pérez',
  email: 'carlos.perez@vicecityiguana.co',
  role: 'TICKET_SELLER',
};
