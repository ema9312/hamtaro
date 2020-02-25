import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { BookComponent } from '../book/book.component';
import { id } from 'date-fns/locale';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input('book') book: Book;
  @Input('home') home: boolean;

  constructor(private bookService: BookService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onEdit(book){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { action: 2, book: book}
    this.dialog.open(BookComponent,dialogConfig);
  }

  onDelete(book){
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.bookService.deleteBook(book.id).then();
        this.notificationService.warn('Deleted successfully!');
      }
    });
  }

}
