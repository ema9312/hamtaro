import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from './book/book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books = [];

  constructor(private bookService: BookService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { 
      
    }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.bookService.getBooks().subscribe(booksSnapshot => {
      this.books = [];
      booksSnapshot.forEach((bookData: any) => {
        const id  = bookData.payload.doc.id;
        const data = bookData.payload.doc.data();
        this.books.push({
          id: id,
          ...data
        });
      });
    });

  }


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { action: 0}
    this.dialog.open(BookComponent,dialogConfig);
  }

}
