import { Component, Inject, Input } from "@angular/core";
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
import { radixCross2 } from "@ng-icons/radix-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-menu",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.css"
})
export class MenuComponent {
  @Input()
  activePage!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { activePage: this.activePage },
      panelClass: "menu-dialog"
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
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
    NgIconComponent
  ],
  viewProviders: [provideIcons({ radixCross2 })]
})
class DialogOverviewExampleDialog {
  links: Link[] = [
    { name: "home", navigation: "/" },
    { name: "products", navigation: "/products" }
  ];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigate(name: string) {
    this.onNoClick();
    this.router.navigate([name]);
  }
}
