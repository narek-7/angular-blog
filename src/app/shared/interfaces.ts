export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseAuthResponse {
  idToken?: string;
  expiresIn?: string;
}

export interface Post {
  id?: string;
  title: string;
  author: string;
  text: string;
  date: Date;
}

export interface FbCreateResponse{
  name: string;
}
