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
  styleUrl: './home.component.css',
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
    /*  this.inventoryService
      .getTotalItems()
      .then((data: any) => {
        this.totalPages = Math.ceil(data / this.segmentSize);
      })
      .then(() => {
        this.inventoryService
          .getInventory(this.page, this.segmentSize)
          .subscribe((data: any) => {
            this.llantas = data;
          });
      }); */

   /*  this.llantasService.getTotalItems().subscribe((data: any) => {
      this.totalPages = Math.ceil(data / this.segmentSize);
    }); */
    this.llantasService
      .getInventory(this.page, this.segmentSize)
      .subscribe((data: any) => {
        this.llantas = data;
      });
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.isLastPage = false;
      this.llantasService
        .getInventory(this.page, this.segmentSize)
        .subscribe((data: any) => {
          this.llantas = data;
        });
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.isFirstPage = false;
      this.llantasService
        .getInventory(this.page, this.segmentSize)
        .subscribe((data: any) => {
          this.llantas = data;
        });
    }
  }

  lastPage() {
    this.page = this.totalPages;
    this.isLastPage = true;
    this.isFirstPage = false;
    this.llantasService
      .getInventory(this.page, this.segmentSize)
      /* .subscribe((data: any) => {
        this.llantas = data;
      }); */
  }

  firstPage() {
    this.page = 1;
    this.isFirstPage = true;
    this.isLastPage = false;
    this.llantasService
      .getInventory(this.page, this.segmentSize)
     /*  .subscribe((data: any) => {
        this.llantas = data;
      }); */
  }

  changePagination(event: Event){
    let size = (event.target as HTMLSelectElement).value;
    console.log(size);
    //cast size from string to  number
    this.segmentSize = parseInt(size);
    this.llantasService
      .getInventory(this.page, this.segmentSize)
      .subscribe((data: any) => {
        this.llantas = data;
      });

    // this.segmentSize = toInteger(size);
  }
}
