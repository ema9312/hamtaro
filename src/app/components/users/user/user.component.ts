import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { NotificationService } from "src/app/services/notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Observable } from "rxjs";
import { da } from "date-fns/locale";
import { User } from 'src/app/models/user';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  titleAlert: string = "This field is required";
  post: any = "";
  user: User;
  action: string = "Create"

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UserComponent>,
    private formBuilder: FormBuilder
  ) {


  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.user) {
      this.action = "Edit";
      this.user =  this.data.user;
      this.userForm.setValue({
        name: this.user.name,
        lastname: this.user.lastname,
        email: this.user.email,
        username: this.user.username,
        password: this.user.password
      });
    }
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.userForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(emailregex)],
        this.checkInUseEmail
      ],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, [Validators.required, this.checkPassword]]
    });
  }

  get name() {
    return this.userForm.get("name") as FormControl;
  }

  get lastname() {
    return this.userForm.get("lastname") as FormControl;
  }

  get username() {
    return this.userForm.get("username") as FormControl;
  }

  get email() {
    return this.userForm.get("email") as FormControl;
  }

  get password() {
    return this.userForm.get("password") as FormControl;
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ["test@gmail.com"];
    return new Observable(observer => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorEmail() {
    return this.userForm.get("email").hasError("required")
      ? "Field is required"
      : this.userForm.get("email").hasError("pattern")
      ? "Not a valid emailaddress"
      : this.userForm.get("email").hasError("alreadyInUse")
      ? "This emailaddress is already in use"
      : "";
  }

  getErrorPassword() {
    return this.userForm.get("password").hasError("required")
      ? "Field is required (at least eight characters, one uppercase letter and one number)"
      : this.userForm.get("password").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }

  onSubmit(post) {
    if (this.userForm.valid) {
      this.post = post;
      console.log(post);
      if (this.data.action === 0) {
        this.userService.createUser(post);
        this.notificationService.success("User Created!");
      } else {
        this.userService.updateUser(this.user.id, post);
        this.notificationService.success("User Updated!");
      }
      this.onClose();
    }

  }

  onClose() {
    this.dialogRef.close();
  }
}
