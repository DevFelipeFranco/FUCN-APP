import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { AuthService } from '../../auth/auth.service';
import { LoanDataGridModel } from '../../models/loan.model';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private _personService: PersonService, private _authService: AuthService) { }

  displayedColumns: string[] = ['dispositivo', 'tipo de solicitud', 'direccion', 'fecha de solicitud'];
  //dataSource = ELEMENT_DATA;
  dataSource!: LoanDataGridModel[];

  ngOnInit() {
    this.loadPerson();
  }

  loadPerson() {
    const user = this._authService.getUserFromLocalCache();
    if (user?.idUser) {
      this._personService.findPersonByIdUser(user.idUser).subscribe(
        (response: any) => {
          console.log(response.data.person.loans);
          this.dataSource = response.data.person.loans;
          console.info(this.dataSource);
        },
        (err: any) => {
          console.error(err);
        });
    }
  }
}
