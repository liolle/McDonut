import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
  constructor(private httpClient: HttpClient) {}

  select({ page, limit, keyword }: SelectInterface) {
    return this.httpClient.get<Donuts[]>(
      `/api/donuts?limit=${limit}&page=${page}${
        keyword ? "&keyword=" + keyword : ""
      }`
    );
  }
}
