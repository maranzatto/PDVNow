import type { UserType } from "@/api/generated";

// types/user.types.ts
export interface UserForm {
    id?: string;
    username?: string | null;
    password?: string | null | undefined;
    email?: string | null;
    userType?: UserType;
    isActive?: boolean;
}

export type UserErros = Record<string, string>;
