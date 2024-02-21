import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LlantasService {
  constructor(private http: HttpClient) {}

  getLlantas(page: number, size: number) {
    // return pagintion of inventario llantas
    return this.http
      .get('../../assets/inventario.json')
      .pipe(
        map((data: any) => {
          console.log(data);
          return data.data.slice((page - 1) * size, page * size);
        })
      );
  }
}
