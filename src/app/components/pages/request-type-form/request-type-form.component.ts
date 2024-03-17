import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequestTypeFormComponent } from './dialog-request-type-form/dialog-request-type-form.component';
import { RequestTypeService } from '../services/request-type.service';
import { RequestTypeModel } from '../../models/request-type.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-request-type-form',
  templateUrl: './request-type-form.component.html',
  styleUrl: './request-type-form.component.css'
})
export class RequestTypeFormComponent implements OnInit {

  constructor(public dialog: MatDialog, private _requestTypeService: RequestTypeService) { }

  displayedColumns: string[] = ['name', 'description'];
  requestTypes!: RequestTypeModel[];
  requestType!: RequestTypeModel;
  dataSource!: RequestTypeModel[];

  animal!: string;
  name!: string;

  openDialog() {
    const dialogRef = this.dialog.open(DialogRequestTypeFormComponent, {data: this.requestType, disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this._requestTypeService.createRequestType(result).subscribe((resultado) => this.loadData());
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._requestTypeService.findAllRequestType().subscribe(
      (response: any) => {
        const requestTypes = response.data.requestType as RequestTypeModel[];
        this.requestTypes = requestTypes;
        this.dataSource = this.requestTypes.sort((a , b) => (b?.idRequestType || 0) - (a?.idRequestType || 0));
        console.log(response);
      });
  }
}
