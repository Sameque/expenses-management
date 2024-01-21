import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
// import { MasterPageComponent } from './shared/master-page/master-page.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './component/layout/layout.component';
import { AgGridModule } from 'ag-grid-angular';
// import { route } from './app-routing.module';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    AgGridModule,
    // RouterModule.forRoot(routes),
    HttpClientModule,
    // MasterPageComponent,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
