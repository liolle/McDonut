import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/internal/operators/filter";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthActions } from "./shared/actions";
import { UserS } from "./shared/auth/reducer";
import { GeneralS } from "./shared/reducer";
import { selectPage } from "./shared/selector";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  template: `
    <div
      class="flex h-screen min-h-screen flex-col overflow-y-auto bg-accent-1"
    >
      <div *ngIf="currentPath != '/login'">
        <app-nav-bar
          class=" sticky top-0 z-10 flex h-14 w-full items-center p-2 backdrop-blur-lg"
        />
      </div>

      <router-outlet> </router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = "frontend";
  store: Store<{ user: UserS; general: GeneralS }> = inject(Store);
  currentPath: string;
  activePage$ = this.store.select(selectPage);
  routerSubscription: Subscription;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((navigation: NavigationEnd) => {
        this.currentPath = navigation.url;
      });

    this.store.dispatch(AuthActions.profile());
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
