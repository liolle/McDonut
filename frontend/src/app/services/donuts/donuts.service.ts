import { Injectable } from "@angular/core";
import { Donuts } from "../../class/donut/donut";
import { Toppings } from "../../class/toppings/toppings";
import { of } from "rxjs/internal/observable/of";
import { Observable } from "rxjs/internal/Observable";

const TOPPINGS: Toppings[] = [
  {
    id: "T_topping1_00", //0
    name: "chocolate sprinkle",
    price: 0.25
  },
  {
    id: "T_CHO_00", //1
    name: "chocolate filling",
    price: 0.25
  },
  {
    id: "T_CHO_01", //2
    name: "chocolate icing",
    price: 0.25
  },
  {
    id: "T_CHO_02", //3
    name: "chocolate drizzle",
    price: 0.25
  },
  {
    id: "T_CHO_03", //4
    name: "dark chocolate sprinkle",
    price: 0.25
  },
  {
    id: "T_CHO_04", //5
    name: "dark chocolate icing",
    price: 0.25
  },
  {
    id: "T_VAN_00", //6
    name: "vanilla icing",
    price: 0.25
  },
  {
    id: "T_VAN_01", //7
    name: "vanilla filling",
    price: 0.25
  },
  {
    id: "T_VAN_02", //8
    name: "vanilla drizzle",
    price: 0.25
  },
  {
    id: "T_CAR_00", //9
    name: "caramel drizzle",
    price: 0.25
  },
  {
    id: "T_NUT_00", //10
    name: "nut",
    price: 0.25
  },
  {
    id: "T_NUT_01", //11
    name: "coconut sprinkle",
    price: 0.25
  }
];

export const DONUTS: Donuts[] = [
  {
    id: "DI_CHO_01",
    name: "choco delight",
    toppings: [TOPPINGS[0], TOPPINGS[2]],
    price: 1.75,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_1.png"
  },
  {
    id: "DI_CHO_02",
    name: "dual swirl",
    toppings: [TOPPINGS[8], TOPPINGS[3]],
    price: 1.5,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_2.png"
  },
  {
    id: "DI_CHO_03",
    name: "caramel crunch ",
    toppings: [TOPPINGS[6], TOPPINGS[9], TOPPINGS[10]],
    price: 2.0,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_3.png"
  },
  {
    id: "DI_CHO_04",
    name: "dark lava",
    toppings: [TOPPINGS[4], TOPPINGS[5]],
    price: 1.75,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_4.png"
  },
  {
    id: "DI_VAN_01",
    name: "choco drizzle",
    toppings: [TOPPINGS[3], TOPPINGS[6]],
    price: 1.5,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_5.png"
  },
  {
    id: "DI_CHO_05",
    name: "choco heaven",
    toppings: [TOPPINGS[0], TOPPINGS[1], TOPPINGS[2]],
    price: 1.5,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_6.png"
  },
  {
    id: "DI_VAN_02",
    name: "choco drift",
    toppings: [TOPPINGS[6], TOPPINGS[0], TOPPINGS[3]],
    price: 2.0,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_7.png"
  },
  {
    id: "DI_CHO_06",
    name: "dark elegance",
    toppings: [TOPPINGS[4], TOPPINGS[2], TOPPINGS[7]],
    price: 1.75,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_8.png"
  },
  {
    id: "DI_CHO_07",
    name: "vanilla coconut",
    toppings: [TOPPINGS[11], TOPPINGS[7], TOPPINGS[6]],
    price: 2.25,
    picture: "https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_9.png"
  }
];

@Injectable({
  providedIn: "root"
})
export class DonutsService {
  constructor() {}

  get(number: number): Observable<Donuts[]> {
    return of(DONUTS.slice(0, number));
  }

  getByTerm(keyword: string): Observable<Donuts[]> {
    if (keyword.length < 1) return of([]);
    const donut_list = DONUTS.filter((donut) => donut.name.includes(keyword));
    return of(donut_list);
  }
}
