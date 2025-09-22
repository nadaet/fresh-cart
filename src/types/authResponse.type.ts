export type AuthResponse =
  | {
      statusMsg: string;
      message: string;
    }
  | {
      message: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
      token: string;
    };

export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}