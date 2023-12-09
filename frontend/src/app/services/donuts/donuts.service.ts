import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Donuts } from "../../class/donut/donut";
interface SelectInterface {
  page: number;
  limit: number;
  keyword: string;
}

export abstract class CartItem {
  price_id: string;
  quantity: number;
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

  checkout(items: CartItem[]) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      items: items
    });
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body
    };
    fetch(`${this.apiUrl}/checkout`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        window.open(result, "_self");
      })
      .catch((error) => console.log("error", error));
  }
}
