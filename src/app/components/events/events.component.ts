import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EventService } from 'src/app/services/event.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EventComponent } from './event/event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "name",
    "start_date",
    "end_date",
    "color",
    "actions"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  public events = [];

  constructor(private eventService: EventService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.eventService.getEvents().subscribe(eventsSnapshot => {
      this.events = [];
      eventsSnapshot.forEach((eventData: any) => {
        const id  = eventData.payload.doc.id;
        const data = eventData.payload.doc.data();
        this.events.push({
          id: id,
          ...data
        });
        this.dataSource = new MatTableDataSource(this.events);
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { action: 0}
    this.dialog.open(EventComponent,dialogConfig);
  }

  onEdit(event){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { action: 2, event: event}
    this.dialog.open(EventComponent,dialogConfig);
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.eventService.deleteEvent(id).then();
        this.notificationService.warn('Deleted successfully!');
      }
    });
  }

}
