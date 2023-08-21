import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import  {DocumentComponent} from './components/document/document.component';
import  {UserComponent} from './components/user/user.component';
import  {CompanyComponent} from './components/company/company.component';

const routes: Routes = [
  {path:'document',component:DocumentComponent},
  {path:'user',component:UserComponent},
  {path:'company',component:CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
