export interface User {
  id: string;
  email: string;
  roles: string[];
}

export interface UserWithCandidate extends User {
  candidate: {
    id: string;
    fullName: string | null;
    phoneNumber: string | null;
    linkedinUrl: string | null;
    portfolioUrl: string | null;
  } | null;
  createdAt: Date;
}

export interface AuthResponse {
  id: string;
  email: string;
  roles: string[];
}

export interface LogoutResponse {
  message: string;
}

export interface MeResponse {
  id: string;
  email: string;
  roles: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  candidate: Record<string, any> | null;
  createdAt: Date;
}
