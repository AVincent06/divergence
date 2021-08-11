export interface Profile {
    id: number;
    photo: string;
    name: string;
    firstname: string;
    bio: string;
    email: string, 
    password: string;
    is_admin: boolean;
}

export interface Profile_private {
    id: number;
    photo: string;
    name: string;
    firstname: string;
    bio: string;
    email: string, 
    password: string;
    is_admin: boolean;
}

export interface Profile_public {
    id: number;
    photo: string;
    name: string;
    firstname: string;
    bio: string;
}

export interface Profile_public2 {
    email: string;
    photo: string;
    name: string;
    firstname: string;
    bio: string;
    file: File;
}
