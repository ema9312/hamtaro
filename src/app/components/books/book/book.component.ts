import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookForm: FormGroup;
  titleAlert: string = "This field is required";
  post: any = "";
  book: Book;
  action: string = "Create"

  constructor(
    private bookService: BookService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<BookComponent>,
    private formBuilder: FormBuilder
  ) {


  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.book) {
      this.action = "Edit";
      this.book =  this.data.book;
      this.bookForm.setValue({
        name: this.book.name,
        author: this.book.author,
        published: this.book.published,
        cover: this.book.cover
      });
    }
  }

  createForm() {
    this.bookForm = this.formBuilder.group({
      published: [null,Validators.required],
      name: [null, Validators.required],
      author: [null, Validators.required],
      cover: [null, Validators.required]
    });
  }

  get name() {
    return this.bookForm.get("name") as FormControl;
  }

  get author() {
    return this.bookForm.get("author") as FormControl;
  }

  get published() {
    return this.bookForm.get("published") as FormControl;
  }

  get cover() {
    return this.bookForm.get("cover") as FormControl;
  }

  onSubmit(post) {
    if (this.bookForm.valid) {
      this.post = post;
      if (this.data.action === 0) {
        this.bookService.createBook(post);
        this.notificationService.success("Book Created!");
      } else {
        this.bookService.updateBook(this.book.id, post);
        this.notificationService.success("Book Updated!");
      }
      this.onClose();
    }

  }

  onClose() {
    this.dialogRef.close();
  }

}
