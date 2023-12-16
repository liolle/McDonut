import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { UserProfile } from "../../interfaces/api";

interface Credential {
  email: string;
  password: string;
}

export abstract class LoginSuccess {
  type: string;
  token: string;
  expires_at: string;
}

export abstract class LoginFailure {
  responseText: string;
  guard: string;
}

export abstract class LoginResponse {
  error: string;
  token: string;
}

export abstract class SignUpSuccess {
  email: string;
  id: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  me() {
    return this.httpClient.get<UserProfile>(`${this.apiUrl}/me`, {
      withCredentials: true
    });
  }

  credentialLogin({ email, password }: Credential) {
    return this.httpClient.post<LoginSuccess>(`${this.apiUrl}/login`, {
      email: email,
      password: password
    });
  }

  googleLogin() {
    window.open(`${this.apiUrl}/oauth/google/redirect`, "_self");
  }

  signup({ email, password }: Credential) {
    return this.httpClient.post<SignUpSuccess>(`${this.apiUrl}/register`, {
      email: email,
      password: password
    });
  }

  logout() {
    return this.httpClient.post<{ revoked: string }>(
      `${this.apiUrl}/logout`,
      "",
      {
        withCredentials: true
      }
    );
  }
}
