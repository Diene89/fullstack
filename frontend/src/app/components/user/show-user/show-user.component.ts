import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Company, User } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent {

  constructor(private service:SharedService) { }

  UserList:any=[];
  user: any;
  ModalTitle!: string;
  ActivateAddEditUser:boolean=false;
  users: User[] = [];
  companies: Company[] = [];

  ngOnInit(): void { 
    this.refreshUserList();
  }

  addClick(){
    this.user = {
      id: 0,
      email: "",
      company_id: 0,
    };
    this.ModalTitle="Adicionar Usuário";
    this.ActivateAddEditUser=true;
    this.service.getUserList().subscribe(users => this.users = users);
    this.service.getCompanyList().subscribe(companies => this.companies = companies);
  };

  editClick(item: any){
    this.user = item;
    this.ModalTitle = "Editar Usuário";
    this.ActivateAddEditUser = true;
  }  

  delete(user: any) {
    user.deleted = true;
    this.service.updateUserList(user).subscribe(res => {
      this.ActivateAddEditUser=false;
      this.refreshUserList();
    });
  }

  updateUser() {
    let val = {signed: this.user };
    this.service.updateUserList(val).subscribe(res => {
      this.ActivateAddEditUser=false;
    });
  }
  
  refreshUserList() {
    this.service.getUserList().subscribe(data => {
      this.UserList = data.filter((item) => !item.deleted);
      this.closeClick();
    });
  }  

  closeClick(){
    this.ActivateAddEditUser=false;
  }

}
