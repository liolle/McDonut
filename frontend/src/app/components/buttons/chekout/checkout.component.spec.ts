import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckoutComponent } from "./checkout.component";
import { StoreModule } from "@ngrx/store";
import { DonutsService } from "../../../services/donuts/donuts.service";

describe("ChekoutComponent", () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let service: DonutsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, StoreModule.forRoot({})]
    }).compileComponents();
    service = TestBed.inject(DonutsService);
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
