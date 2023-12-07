import { Component, Inject, Input, inject } from "@angular/core";
import { Router } from "@angular/router";

interface Link {
  name: string;
  navigation: string;
}

export interface DialogData {
  activePage: string;
}

import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { radixCross2, radixHamburgerMenu } from "@ng-icons/radix-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { GeneralActions } from "../../../shared/actions";
import { GeneralS } from "../../../shared/reducer";
import { selectPage } from "../../../shared/selector";
import { LoginComponent } from "../../bouttons/login/login.component";
@Component({
  selector: "app-menu",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIconComponent
  ],
  templateUrl: "./menu.component.html",
  viewProviders: [provideIcons({ radixHamburgerMenu })]
})
export class MenuComponent {
  activePage!: string;

  constructor(public dialog: MatDialog) {}
  private store: Store<{ general: GeneralS }> = inject(Store);

  openDialog(): void {
    this.store.select(selectPage).subscribe((val) => {
      this.activePage = val;
    });

    const dialogRef = this.dialog.open(MenuContentComponent, {
      data: { activePage: this.activePage },
      panelClass: "menu-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: "app-menu-content-dialog",
  templateUrl: "./menu-body.components.html",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIconComponent,
    LoginComponent
  ],
  viewProviders: [provideIcons({ radixCross2 })]
})
class MenuContentComponent {
  links: Link[] = [
    { name: "home", navigation: "/" },
    { name: "products", navigation: "/products" }
  ];

  private store: Store<{ general: GeneralS }> = inject(Store);

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MenuContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigate(name: string) {
    this.onNoClick();
    this.store.dispatch(GeneralActions.changePage({ page: name }));
    this.router.navigate([name]);
  }
}
