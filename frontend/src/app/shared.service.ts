import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Call } from '@angular/compiler';
import { User } from './interfaces/interface';

const jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  updateDocument(document: any) {
    throw new Error('Method not implemented.');
  }
  readonly APIUrl = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  //Document

  getDocList():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/docs/`);
  }

  addDocList(val:any){
    const req = {
      name: val.name,
      signed: val.signed,
      created_by: val.created_by,
      company: val.company
    }
    return this.http.post(`${this.APIUrl}/docs/`, req);
  }

  updateDocList(val:any){
    return this.http.put(`${this.APIUrl}/docs/${val.id}/`, val);
  }

  deleteDocList(val:any){
    return this.http.delete(val.url ,val);
  }

  //User

  getUserList():Observable<User[]>{
    return this.http.get<User[]>(this.APIUrl + '/users/');
  }  

  addUserList(val:any){
    const req = {
      name: val.name,
      company: val.company
    }
    return this.http.post(this.APIUrl + '/users/', req);
  }  

  updateUserList(val:any){
    return this.http.put(`${this.APIUrl}/users/${val.id}/`, val);
  }

  deleteUserList(val:any){
    return this.http.delete(val.url ,val);
  }

  //Company

  getCompanyList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/companies/');
  }

  addCompanyList(val:any){
    return this.http.post(this.APIUrl + '/company/' + val, val);
}

updateCompanyList(val:any){
    return this.http.put(this.APIUrl + '/company/' + val, val);
}

deleteCompanyList(val:any){
    return this.http.delete(this.APIUrl + '/company/' + val);
}


}
