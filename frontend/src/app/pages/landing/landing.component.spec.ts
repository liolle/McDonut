import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LandingComponent } from "./landing.component";
import { StoreModule } from "@ngrx/store";

describe("LandingComponent", () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent, StoreModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
