import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-inventory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-inventory.component.html',
  styleUrl: './upload-inventory.component.scss',
})
export class UploadInventoryComponent {
  //Subir archivo a firebase
  form: FormGroup;
  fileUpladed: any;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.form = this.fb.group({
      file: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const file = this.fileUpladed;
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, { type: 'array' });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let data = XLSX.utils.sheet_to_json(worksheet);
      data.forEach((element: any) => {
        this.inventoryService.saveInventory(element);
      });
    };
  }

  manageUpload(event: any) {
    const file = event.target.files[0];
    this.fileUpladed = file;
  }
}
