import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  createBook(data: { id: number, name: string, author: string, published: number, cover: string}) {
    return this.firestore.collection('books').add(data);
  }

  getBook(documentId: string) {
    return this.firestore.collection('books').doc(documentId).snapshotChanges();
  }

  getBooks() {
    return this.firestore.collection('books').snapshotChanges();
  }
  
  updateBook(documentId: string, data: any) {
    return this.firestore.collection('books').doc(documentId).set(data);
  }

  deleteBook(documentId: string) {
    return this.firestore.collection('books').doc(documentId).delete();
  }

}
