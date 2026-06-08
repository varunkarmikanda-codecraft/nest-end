export const ROLES = ['admin', 'developer', 'intern'] as const;
export type Role = typeof ROLES[number];

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}