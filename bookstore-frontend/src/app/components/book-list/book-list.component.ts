import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Pour *ngIf, *ngFor, etc.
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe
  ]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'price', 'description', 'actions'];

  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '500px',
      data: null // Nouveau livre
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBooks();
      }
    });
  }

  openEditDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '500px',
      data: book // Livre à modifier
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBooks();
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
