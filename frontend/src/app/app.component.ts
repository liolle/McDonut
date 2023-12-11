import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActions } from "./shared/actions";
import { UserS } from "./shared/auth/reducer";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
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
      <app-nav-bar
        class=" sticky top-0 z-10 flex h-14 w-full items-center p-2 backdrop-blur-lg"
      />

      <router-outlet> </router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = "frontend";
  store: Store<{ user: UserS; general: GeneralS }> = inject(Store);
  activePage$ = this.store.select(selectPage);
  ngOnInit(): void {
    this.store.dispatch(AuthActions.profile());
  }
}
