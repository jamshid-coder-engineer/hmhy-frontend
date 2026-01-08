export interface LoginT {
  username: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    username: string;
    token: any;
    accessToken: string;
    role: string; // "ADMIN" | "TEACHER" | "SUPER_ADMIN"
  };
}

export type Role = "admin" | "teacher" | "superadmin";