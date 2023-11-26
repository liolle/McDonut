import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subject, debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./search-bar.component.html"
})
export class SearchBarComponent implements OnInit {
  searchSubject = new Subject<string>();

  @Output() keyword = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.keyword.emit(value);
      });
  }

  pushSubject(keyword: string) {
    this.searchSubject.next(keyword);
  }
}
