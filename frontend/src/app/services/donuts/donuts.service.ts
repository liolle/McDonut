import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Donuts } from "../../class/donut/donut";
interface SelectInterface {
  page: number;
  limit: number;
  keyword: string;
}

@Injectable({
  providedIn: "root"
})
export class DonutsService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  select({ page, limit, keyword }: SelectInterface) {
    const headers = {
      Accept: "application/json"
    };

    return this.httpClient.get<Donuts[]>(
      `${this.apiUrl}/donuts?limit=${limit}&page=${page}${
        keyword ? "&keyword=" + keyword : ""
      }`,
      { headers: headers }
    );
  }
}
