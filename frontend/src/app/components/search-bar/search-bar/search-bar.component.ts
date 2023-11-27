import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";

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
