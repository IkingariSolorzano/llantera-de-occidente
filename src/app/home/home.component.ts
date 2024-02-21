import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { LlantasService } from '../services/llantas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  llantas: any[]= [];
  page= 1;
  size= 10;
  totalPages= Math.floor(2662/10);
  isFirstPage:boolean = true;
  isLastPage:boolean = false;

  constructor(private llantasService: LlantasService) {
    this.llantasService.getLlantas(1, 10).subscribe((data: any) => {
      console.log(data);
      this.llantas = data;
    });
   }

   prevPage() {
      if(this.page > 1) {
        this.page--;
        this.llantasService.getLlantas(this.page, this.size).subscribe((data: any) => {
          console.log(data);
          this.llantas = data;
        });
      }
    }

    nextPage() {
     if(this.page < this.totalPages) {
      this.page++;
      this.isFirstPage = false;
      this.llantasService.getLlantas(this.page, this.size).subscribe((data: any) => {
        console.log(data);
        this.llantas = data;
      });
     }
    }

    lastPage() {
      this.page = this.totalPages;
      this.isLastPage = true;
      this.llantasService.getLlantas(this.page, this.size).subscribe((data: any) => {
        console.log(data);
        this.llantas = data;
      });
    }

}
