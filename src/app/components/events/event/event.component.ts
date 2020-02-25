import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {


  eventForm: FormGroup;
  titleAlert: string = "This field is required";
  post: any = "";
  event: Event;
  action: string = "Create"

  constructor(
    private eventService: EventService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EventComponent>,
    private formBuilder: FormBuilder
  ) {


  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.event) {
      this.action = "Edit";
      this.event =  this.data.event;
      this.eventForm.setValue({
        name: this.event.name,
        start_date: this.event.start_date,
        end_date: this.event.end_date,
        color: this.event.color
      });
    }
  }

  createForm() {
    this.eventForm = this.formBuilder.group({
      end_date: [null,Validators.required],
      name: [null, Validators.required],
      start_date: [null, Validators.required],
      color: [null, Validators.required]
    });
  }

  get name() {
    return this.eventForm.get("name") as FormControl;
  }

  get start_date() {
    return this.eventForm.get("start_date") as FormControl;
  }

  get end_date() {
    return this.eventForm.get("end_date") as FormControl;
  }

  get color() {
    return this.eventForm.get("color") as FormControl;
  }

  onSubmit(post) {
    if (this.eventForm.valid) {
      this.post = post;
      if (this.data.action === 0) {
        this.eventService.createEvent(post);
        this.notificationService.success("Event Created!");
      } else {
        this.eventService.updateEvent(this.event.id, post);
        this.notificationService.success("Event Updated!");
      }
      this.onClose();
    }

  }

  onClose() {
    this.dialogRef.close();
  }
}
