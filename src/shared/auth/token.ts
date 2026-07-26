import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  userId: number;
  email: string;
  employeeId: number;
  roles: string[];
  exp: number;
  iat: number;
}

export function decodeToken() {
  const token = localStorage.getItem("access");

  if (!token) return null;

  return jwtDecode<JwtPayload>(token);
}