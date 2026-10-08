import type { UserRole } from './user';

export type { UserRole };

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
