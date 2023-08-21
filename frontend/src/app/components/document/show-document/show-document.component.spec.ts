import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDocumentComponent } from './show-document.component';
import { SharedService } from 'src/app/shared.service';
import { of } from 'rxjs';

describe('ShowDocumentComponent', () => {
  let component: ShowDocumentComponent;
  let fixture: ComponentFixture<ShowDocumentComponent>;
  let mockSharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    mockSharedService = jasmine.createSpyObj(['getDocList', 'getUserList', 'getCompanyList', 'updateDocList']);
    mockSharedService.getDocList.and.returnValue(of([]));
    mockSharedService.getUserList.and.returnValue(of([]));
    mockSharedService.getCompanyList.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ ShowDocumentComponent ],
      providers: [
        { provide: SharedService, useValue: mockSharedService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addClick', () => {
    it('should set ActivateAddEditDoc to true and set document to a new document', () => {
      component.addClick();
      expect(component.ActivateAddEditDoc).toBeTrue();
      expect(component.document.id).toEqual(0);
      expect(mockSharedService.getUserList).toHaveBeenCalled();
      expect(mockSharedService.getCompanyList).toHaveBeenCalled();
    });
  });

  describe('editClick', () => {
    it('should set document to the provided item and set ActivateAddEditDoc to true', () => {
      const testItem = { id: 1, name: "Test Document" };
      component.editClick(testItem);
      expect(component.document).toBe(testItem);
      expect(component.ActivateAddEditDoc).toBeTrue();
    });
  });

  describe('closeClick', () => {
    it('should set ActivateAddEditDoc to false and refresh the document list', () => {
      component.closeClick();
      expect(component.ActivateAddEditDoc).toBeFalse();
      expect(mockSharedService.getDocList).toHaveBeenCalled();
    });
  });
});
