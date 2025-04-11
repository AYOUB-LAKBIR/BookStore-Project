import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class BookFormComponent {
  bookForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book | null
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(500)]
    });

    if (data) {
      this.isEdit = true;
      this.bookForm.patchValue(data);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      if (this.isEdit && this.data?.id) {
        this.bookService.updateBook(this.data.id, book).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.bookService.addBook(book).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
