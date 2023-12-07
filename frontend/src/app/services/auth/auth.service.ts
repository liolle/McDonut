import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "../../../environments/environment";
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
    return of(true);
  }

  logout() {
    return this.httpClient.get<{ revoked: string }>(`${this.apiUrl}/logout`);
  }
}
