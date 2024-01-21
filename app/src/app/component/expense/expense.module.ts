import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './list/expense-list/expense-list.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    ExpenseListComponent,
    // MasterPageComponent,

  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    AgGridModule,

    // BrowserModule,
    // HttpClientModule
    // , AgGridModule
  ]
})
export class ExpenseModule { }
