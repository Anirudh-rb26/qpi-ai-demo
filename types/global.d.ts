export {};
// Create a type for the roles
export type Roles = "admin" | "moderator" | "role_a" | "role_b" | "role_c";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
