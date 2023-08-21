import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDocumentComponent } from './add-edit-document.component';
import { SharedService } from 'src/app/shared.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddEditDocumentComponent', () => {
  let component: AddEditDocumentComponent;
  let fixture: ComponentFixture<AddEditDocumentComponent>;
  let mockSharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    mockSharedService = jasmine.createSpyObj(['getUserList', 'getCompanyList', 'addDocList', 'updateDocList']);

    await TestBed.configureTestingModule({
      declarations: [ AddEditDocumentComponent ],
      providers: [
        { provide: SharedService, useValue: mockSharedService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDocumentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getUserList and getCompanyList from the service', () => {
      let mockCompany = { id: 1, name: 'Test Company' };
      let mockUser = {email: 'test@gmail.com', company: mockCompany, deleted: false};
    
      mockSharedService.getUserList.and.returnValue(of([mockUser]));
      mockSharedService.getCompanyList.and.returnValue(of([mockCompany]));
  
      component.ngOnInit();
  
      expect(mockSharedService.getUserList).toHaveBeenCalled();
      expect(mockSharedService.getCompanyList).toHaveBeenCalled();
    });
  });
  
  describe('addDocument', () => {
    it('should call addDocList from the service', () => {
      let mockCompany = { id: 1, name: 'Test Company' };
      let mockUser = {email: 'test@gmail.com', company: mockCompany, deleted: false};
  
      let doc = { 
          name: 'Test document', 
          signed: true, 
          created_by: mockUser, 
          company: mockCompany 
      };
      component.name = doc.name;
      component.signed = doc.signed;
      component.selectedUser = doc.created_by;
      component.selectedCompany = doc.company; 
  
      mockSharedService.addDocList.and.returnValue(of('Document added!'));
  
      component.addDocument();
  
      expect(mockSharedService.addDocList).toHaveBeenCalled();
    });
  });
  
  describe('updateDocument', () => {
    it('should call updateDocList from the service', () => {
      let mockCompany = { id: 1, name: 'Test Company' };
      let mockUser = {email: 'test@gmail.com', company: mockCompany, deleted: false};
  
      let doc = { 
          id: 1,
          name: 'Test document', 
          signed: true, 
          created_by: mockUser, 
          company: mockCompany 
      };
      component.id = doc.id;
      component.name = doc.name;
      component.signed = doc.signed;
      component.created_by = doc.created_by;
      component.company = doc.company;
  
      mockSharedService.updateDocList.and.returnValue(of('Document updated!'));
  
      component.updateDocument();
  
      expect(mockSharedService.updateDocList).toHaveBeenCalled();
    });
  });
  
  
});
