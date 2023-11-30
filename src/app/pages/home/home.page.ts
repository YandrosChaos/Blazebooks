import { Component, OnDestroy, OnInit } from '@angular/core';
import { DemiCardConfig } from 'demiurge';
import { Observable, Subscription, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: [],
})
export class HomePage implements OnInit, OnDestroy {
  private subToolbar!: Subscription;
  private subBooks!: Subscription;

  public currentBook$: Observable<DemiCardConfig> =
    this.bookService.currentBook$;
  public books$: Observable<DemiCardConfig[]> = this.bookService.books$;
  public searchValue: string = '';

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.subToolbar = this.toolbarService
      .searchObservable()
      .subscribe((value) => (this.searchValue = value ?? ''));

    this.subBooks = this.books$.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.subToolbar.unsubscribe();
    this.subBooks.unsubscribe();
  }
}
