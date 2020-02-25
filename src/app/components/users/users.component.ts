import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserComponent } from './user/user.component';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user';

@Component({
  selector: "app-user",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "name",
    "lastname",
    "username",
    "email",
    "actions"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  user: Observable<User[]>;

  public users = [];

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { 
      
    }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userService.getUsers().subscribe(usersSnapshot => {
      this.users = [];
      usersSnapshot.forEach((userData: any) => {
        const id  = userData.payload.doc.id;
        const data = userData.payload.doc.data();
        this.users.push({
          id: id,
          ...data
        });
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    //this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { action: 0}
    this.dialog.open(UserComponent,dialogConfig);
  }

  onEdit(user){
    //this.userService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { action: 2, user: user}
    this.dialog.open(UserComponent,dialogConfig);
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.userService.deleteUser(id).then();
        this.notificationService.warn('Deleted successfully!');
      }
    });
  }
  
}
