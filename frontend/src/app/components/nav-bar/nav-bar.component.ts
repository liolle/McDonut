import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { radixHamburgerMenu } from "@ng-icons/radix-icons";
import { MenuComponent } from "../dialogs/menu/menu.component";
import { PageNavigationComponent } from "../navigation/navigation.component";
import {
  DComponent,
  NComponent,
  TComponent,
  UComponent
} from "../svg-letters/svg-letters.component";

import { Store } from "@ngrx/store";
import { delay, of, switchMap, take } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../../services/auth/auth.service";
import { AuthActions } from "../../shared/actions";
import { LOG_STATUS, UserS } from "../../shared/auth/reducer";
import { selectStatus } from "../../shared/selector";
import { Spinner1Component } from "../icons/icon.component";
import { LoginComponent } from "../bouttons/login/login.component";

@Component({
  selector: "app-nav-bar",
  standalone: true,

  imports: [
    CommonModule,
    DComponent,
    NComponent,
    TComponent,
    UComponent,
    PageNavigationComponent,
    NgIconComponent,
    MenuComponent,
    Spinner1Component,
    LoginComponent
  ],
  viewProviders: [provideIcons({ radixHamburgerMenu })],
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent implements OnInit {
  logS = LOG_STATUS;
  isStateSet$ = of(false);
  isLogged$: Observable<boolean>;

  private readonly store: Store<{ user: UserS }> = inject(Store);
  status$: Observable<LOG_STATUS>;
  auth = inject(AuthService);
  constructor() {}

  ngOnInit(): void {
    this.isLogged$ = this.store
      .select(selectStatus)
      .pipe(switchMap((value) => of(value === LOG_STATUS.LOGGED)));

    this.isStateSet$ = this.store.select(selectStatus).pipe(
      delay(500),
      take(1),
      switchMap(() => of(true))
    );
  }

  googleLogin() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
