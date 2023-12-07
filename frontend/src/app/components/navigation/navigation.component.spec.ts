import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PageNavigationComponent } from "./navigation.component";
import { StoreModule } from "@ngrx/store";

describe("PageNavigationComponent", () => {
  let component: PageNavigationComponent;
  let fixture: ComponentFixture<PageNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNavigationComponent, StoreModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
