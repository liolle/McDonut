import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
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

import { environment } from "../../../environments/environment";

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
    MenuComponent
  ],
  viewProviders: [provideIcons({ radixHamburgerMenu })],
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent {
  @Input()
  activePage!: string;

  private apiUrl = environment.apiUrl;

  googleLogin() {
    window.open(`${this.apiUrl}/oauth/google/redirect`, "_self");
  }
}
