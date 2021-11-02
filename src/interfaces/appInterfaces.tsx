export interface LoginData {
    email: string,
    password: string
}

export interface LoginResponse {
    user:  User;
    token: string;
}

export interface User {
    status: boolean;
    google: boolean;
    name:   string;
    email:  string;
    rol:    string;
    uid:    string;
    img?:   string;
}

export interface Location {
    latitude: number,
    longitude: number
}


