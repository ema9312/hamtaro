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
  }

}