import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  createEvent(data: { id: number, name: string, author: string, published: number, cover: string}) {
    return this.firestore.collection('events').add(data);
  }

  getEvent(documentId: string) {
    return this.firestore.collection('events').doc(documentId).snapshotChanges();
  }

  getEvents() {
    return this.firestore.collection('events').snapshotChanges();
  }

  updateEvent(documentId: string, data: any) {
    return this.firestore.collection('events').doc(documentId).set(data);
  }

  deleteEvent(documentId: string) {
    return this.firestore.collection('events').doc(documentId).delete();
  }

}
