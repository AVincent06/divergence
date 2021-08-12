/**
* @file Model for structuring the data to be displayed on the frontend for profiles.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
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
