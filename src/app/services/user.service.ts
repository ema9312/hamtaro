import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private firestore: AngularFirestore
  ) {}


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  populateForm(employee) {
    //this.form.setValue(_.omit(employee,'departmentName'));
  }

  createUser(data: {id: number, name: string, lastname: string, username: string, email: string}) {
    return this.firestore.collection('users').add(data);
  }

  getUser(documentId: string) {
    return this.firestore.collection('users').doc(documentId).snapshotChanges();
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  
  updateUser(documentId: string, data: any) {
    return this.firestore.collection('users').doc(documentId).set(data);
  }

  deleteUser(documentId: string) {
    return this.firestore.collection('users').doc(documentId).delete();
    //his.firestore.remove($key);
  }

}