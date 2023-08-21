import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Company, User } from 'src/app/interfaces/interface';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-document',
  templateUrl: './add-edit-document.component.html',
  styleUrls: ['./add-edit-document.component.css']
})
export class AddEditDocumentComponent implements OnInit {

  constructor(private service:SharedService) {  }

  @Output() refreshNeeded = new EventEmitter<void>();
  @Input() 
  document: any;
  id!: number;
  name!: string;
  created_at!: Date;
  updated_at!: Date;
  created_by!: any;
  company!: any;
  signed!: boolean;
  users: User[] = [];
  companies: Company[] = [];
  selectedUser!: User;
  selectedCompany!: Company;
  showModal: boolean = true;
  
  ngOnInit(): void {
    this.service.getUserList().subscribe(users => this.users = users);
    this.service.getCompanyList().subscribe(companies => this.companies = companies);
    this.id=this.document.id;
    this.name=this.document.name;
    this.signed=this.document.signed;
    this.created_by= this.document.created_by;
    this.company= this.document.company;
  };

  addDocument() {
    let val = { 
        name: this.name, 
        signed: this.signed, 
        created_by: this.selectedUser, 
        company: this.selectedCompany 
    };
    this.service.addDocList(val).subscribe(res => {
      alert(res.toString());
      this.refreshNeeded.emit();
      this.showModal = false;
    });
}

updateDocument(){
    let val = { id: this.id, name: this.name, signed: this.signed, created_by: this.created_by, company: this.company };
    this.service.updateDocList(val).subscribe(res=>{
      alert(res.toString());
      this.refreshNeeded.emit();
      this.showModal = false;
    });
  }

}
