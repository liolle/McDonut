import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { radixHamburgerMenu } from "@ng-icons/radix-icons";
import { PageNavigationComponent } from "../navigation/navigation.component";
import {
  DComponent,
  NComponent,
  TComponent,
  UComponent
} from "../svg-letters/svg-letters.component";
import { MenuComponent } from "../dialogs/menu/menu.component";

@Component({
  selector: "frontend-nav-bar",
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
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.css"
})
export class NavBarComponent {
  @Input()
  activePage!: string;
}
