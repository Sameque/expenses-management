import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ExpenseService } from '../../service/expense.service';


// Row Data Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

@Component({
  selector: 'my-app',
  template: `
    <div class="content">
      <!-- The AG Grid component, with Dimensions, CSS Theme, Row Data, and Column Definition -->
      <ag-grid-angular
        style="width: 100%; height: 550px;"
        [class]="themeClass"
        [rowData]="rowData"
        [columnDefs]="colDefs"
        (gridReady)="onGridReady($event)"
      >
      </ag-grid-angular>
    </div>
  `,
})
export class AppComponent {
  themeClass =
    "ag-theme-quartz-dark";
  // Row Data: The data to be displayed.
  rowData: IRow[] = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    { field: 'mission' },
    { field: 'company' },
    { field: 'location' },
    { field: 'date' },
    { field: 'price' },
    { field: 'successful' },
    { field: 'rocket' },
  ];

  // Load data into grid when ready
  constructor(private http: HttpClient) {}
  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/space-mission-data.json'
      )
      .subscribe((data) => (this.rowData = data));
  }
}

// import { Component } from '@angular/core';
// import { ExpenseService } from '../../service/expense.service';
// import { ColDef } from 'ag-grid-community';

// interface IRow {
//   mission: string;
//   company: string;
//   location: string;
//   date: string;
//   rocket: string;
//   price: number;
//   successful: boolean;
// }

// @Component({
//   selector: 'app-expense-list',
//   templateUrl: './expense-list.component.html',
//   styleUrl: './expense-list.component.css'
// })
// export class ExpenseListComponent {

//   constructor(expenseService: ExpenseService) { }


//   themeClass =
//     "ag-theme-quartz-dark";

//   // Row Data: The data to be displayed.
//   rowData: IRow[] = [
//     {
//       mission: 'Voyager',
//       company: 'NASA',
//       location: 'Cape Canaveral',
//       date: '1977-09-05',
//       rocket: 'Titan-Centaur ',
//       price: 86580000,
//       successful: true,
//     },
//     {
//       mission: 'Apollo 13',
//       company: 'NASA',
//       location: 'Kennedy Space Center',
//       date: '1970-04-11',
//       rocket: 'Saturn V',
//       price: 3750000,
//       successful: false,
//     },
//     {
//       mission: 'Falcon 9',
//       company: 'SpaceX',
//       location: 'Cape Canaveral',
//       date: '2015-12-22',
//       rocket: 'Falcon 9',
//       price: 9750000,
//       successful: true,
//     },
//   ];

//   // Column Definitions: Defines & controls grid columns.
//   colDefs: ColDef<IRow>[] = [
//     { field: 'mission' },
//     { field: 'company' },
//     { field: 'location' },
//     { field: 'date' },
//     { field: 'price' },
//     { field: 'successful' },
//     { field: 'rocket' },
//   ];
// }
