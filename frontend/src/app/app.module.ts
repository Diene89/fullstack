import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {DocumentComponent } from './components/document/document.component';
import { UserComponent } from './components/user/user.component';
import { CompanyComponent } from './components/company/company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowDocumentComponent } from './components/document/show-document/show-document.component';
import { AddEditDocumentComponent } from './components/document/add-edit-document/add-edit-document.component';
import { ShowUserComponent } from './components/user/show-user/show-user.component';
import { AddEditUserComponent } from './components/user/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    UserComponent,
    CompanyComponent,
    ShowDocumentComponent,
    AddEditDocumentComponent,
    ShowUserComponent,
    AddEditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
