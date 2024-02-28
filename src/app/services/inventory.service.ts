import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  orderBy,
  limit,
  count,
  deleteDoc,
  startAfter,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Llantas } from '../models/llantas';
import { getCountFromServer, getDoc, getDocs } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private firestore: Firestore) {}

  saveInventory(data: any) {
    const itemCollection = collection(this.firestore, 'inventario');
    return addDoc(itemCollection, data);
  }

  deleteInventory() {
    const itemCollection = collection(this.firestore, 'inventario');
    //delete all documents

  }

  async getTotalItems() {
    const collectionesData = collection(this.firestore, 'inventario');
    const snapshot = await getCountFromServer(collectionesData);
    return snapshot.data().count;
  }

  getInventory(page: number, size: number) {
    console.log('Page', size);
    let starter= (page-1)*size;
    console.log('Starter', starter);
    const q = query(collection(this.firestore, 'inventario'), orderBy('descripcion'), limit(size), startAfter(starter));
    return collectionData(q);
  }
}
