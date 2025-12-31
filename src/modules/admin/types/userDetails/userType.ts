// types/user.types.ts
export interface UserForm {
    name: string;
    position: string;
}

export type UserErros = Record<string, string>;
