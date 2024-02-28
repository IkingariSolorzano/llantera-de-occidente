import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Llantas } from '../models/llantas';
import { UploadInventoryComponent } from '../upload-inventory/upload-inventory.component';
import { InventoryService } from '../services/inventory.service';
import { LlantasService } from '../services/llantas.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NgClass,
    AsyncPipe,
    UploadInventoryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  inventoryService = inject(InventoryService);
  llantasService = inject(LlantasService);
  llantas: Llantas[] = [];
  page = 1;
  segmentSize = 10;
  totalPages = 267;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  constructor() {
    this.calculatePages();
    this.getdata();

    /*  this.llantasService.getTotalItems().subscribe((data: any) => {
      this.totalPages = Math.ceil(data / this.segmentSize);
    }); */
    /*  this.llantasService
      .getInventory(this.page, this.segmentSize)
      .subscribe((data: any) => {
        this.llantas = data;
      }); */
  }

  getdata() {
    this.llantasService
      .getInventory(this.page, this.segmentSize)
      .subscribe((data: any) => {
        this.llantas = data;
      });
  }
  calculatePages() {
    this.inventoryService.getTotalItems().then((data: any) => {
      this.totalPages = Math.ceil(data / this.segmentSize);
      console.log(this.totalPages);
    });
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.isLastPage = false;
      this.getdata();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.isFirstPage = false;
      this.getdata();
    }
  }

  lastPage() {
    this.page = this.totalPages;
    this.isLastPage = true;
    this.isFirstPage = false;
    this.getdata();
  }

  firstPage() {
    this.page = 1;
    this.isFirstPage = true;
    this.isLastPage = false;
    this.getdata();
  }

  changePagination(event: Event) {
    let size = (event.target as HTMLSelectElement).value;
    console.log(size);
    this.segmentSize = parseInt(size);
    console.log(this.segmentSize);
    this.firstPage();
    this.calculatePages();
    this.getdata();
  }
}
