import { Injectable } from "@angular/core";
import { Donuts } from "../../class/donut/donut";
import { Toppings } from "../../class/toppings/toppings";
import { of } from "rxjs/internal/observable/of";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";

interface SelectInterface {
  page: number;
  limit: number;
  keyword: string;
}

@Injectable({
  providedIn: "root"
})
export class DonutsService {
  constructor(private httpClient: HttpClient) {}

  select({ page, limit, keyword }: SelectInterface) {
    return this.httpClient.get<Donuts[]>(
      `/api/donuts?limit=${limit}&page=${page}${
        keyword ? "&keyword=" + keyword : ""
      }`
    );
  }
}
