import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Company, User } from 'src/app/interfaces/interface';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {

  constructor(private service:SharedService) {  }

  @Output() refreshNeeded = new EventEmitter<void>();
  @Input() user!: User;
  document: any;
  id!: number;
  email!: string;
  company!: any;
  users: User[] = [];
  companies: Company[] = [];
  selectedUser!: User;
  selectedCompany!: Company;
  showModal: boolean = true;
  
  ngOnInit(): void {
    this.service.getUserList().subscribe(users => {
      this.users = users;
      if (users.length > 0) {
        this.company = users[0].company;
      }
    });
    this.service.getCompanyList().subscribe(companies => this.companies = companies);
  };
  

  addUser() {
    let val = { 
        email: this.email,
        company: this.selectedCompany.id 
    };
    this.service.addUserList(val).subscribe(res => {
      alert(res.toString());
      this.refreshNeeded.emit();
      this.showModal = false;
    });
  }

  updateUser(){
    let val = { id: this.id, email: this.email, company: this.company };
    this.service.updateUserList(val).subscribe(res=>{
      alert(res.toString());
      this.refreshNeeded.emit();
      this.showModal = false;
    });
  }

}
