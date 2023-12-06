import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UserProfile } from "../../interfaces/api";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  me() {
    return this.httpClient.get<UserProfile>(`${this.apiUrl}/me`);
  }

  login() {
    window.open(`${this.apiUrl}/oauth/google/redirect`, "_self");
  }

  logout() {
    return this.httpClient.get<{ revoked: string }>(`${this.apiUrl}/logout`);
  }
}
