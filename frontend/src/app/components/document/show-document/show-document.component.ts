import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Company, User } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.css']
})

export class ShowDocumentComponent implements OnInit{
 
  constructor(private service:SharedService) { }

  DocumentList:any=[];

  ModalTitle!: string;
  ActivateAddEditDoc:boolean=false;
  document:any;
  users: User[] = [];
  companies: Company[] = [];

  ngOnInit(): void { 
    this.refreshDocList();
  }

  addClick(){
    this.document={
      id: 0,
      name:"",
      company_id: 0,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 0,
      signed: false
    };
    this.ModalTitle="Adicionar Documento";
    this.ActivateAddEditDoc=true;
    this.service.getUserList().subscribe(users => this.users = users);
    this.service.getCompanyList().subscribe(companies => this.companies = companies);
  };

  editClick(item: any){
    this.document=item;
    this.ModalTitle="Editar Documento";
    this.ActivateAddEditDoc=true;
  }

  sign(document: any) {
    this.service.updateDocList(document).subscribe(res => {
      this.ActivateAddEditDoc=false;
    });
  }

  delete(document: any) {
    document.deleted = true;
    this.service.updateDocList(document).subscribe(res => {
      this.ActivateAddEditDoc=false;
      this.refreshDocList();
    });
  }

  updateDocument() {
    let val = {signed: this.document };
    this.service.updateDocList(val).subscribe(res => {
      this.ActivateAddEditDoc=false;
    });
  }
  

  refreshDocList(){
    this.service.getDocList().subscribe(data=>{
      this.DocumentList=data.filter((item) => !item.deleted);
    });
  }

  closeClick(){
    this.ActivateAddEditDoc=false;
    this.refreshDocList();
  }
}
