import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject, flatMap, of, switchMap } from "rxjs";
import { UserProfile } from "../../interfaces/api";
import { UserS } from "../../shared/auth/reducer";
import { GeneralS } from "../../shared/reducer";
import { selectPage, selectUser } from "../../shared/selector";

interface Link {
  name: string;
  navigation: string;
}

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navigation.component.html"
})
export class PageNavigationComponent implements OnInit {
  links$ = of([
    { name: "home", navigation: "/", available: true },
    { name: "products", navigation: "/products", available: true },
    { name: "profile", navigation: "/profile", available: true }
  ]);

  private store: Store<{ general: GeneralS; user: UserS }> = inject(Store);
  activePage$ = this.store.select(selectPage) || of("/");

  user$: Observable<UserProfile>;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.user$ = this.store.select(selectUser).pipe(
      switchMap((value) => {
        return of(value.user);
      })
    );

    this.user$.subscribe((value) => {
      if (value.email != "") {
        this.links$ = of([
          { name: "home", navigation: "/", available: true },
          { name: "products", navigation: "/products", available: true },
          { name: "profile", navigation: "/profile", available: true }
        ]);
      }
    });
  }

  navigate(name: string) {
    this.router.navigate([name]);
  }
}
