import { TestBed } from "@angular/core/testing";

import { DonutsService } from "./donuts.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
describe("DonutsService", () => {
  let service: DonutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DonutsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
