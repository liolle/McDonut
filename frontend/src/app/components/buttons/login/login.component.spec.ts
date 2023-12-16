import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StoreModule } from "@ngrx/store";
import { LoginButtonComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LoginButtonComponent", () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginButtonComponent,
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
