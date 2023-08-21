import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from 'src/app/shared.service';
import { of } from 'rxjs';
import { ShowUserComponent } from './show-user.component';

describe('ShowUserComponent', () => {
  let component: ShowUserComponent;
  let fixture: ComponentFixture<ShowUserComponent>;
  let mockSharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    mockSharedService = jasmine.createSpyObj(['getUserList', 'getCompanyList', 'updateUserList']);

    await TestBed.configureTestingModule({
      declarations: [ ShowUserComponent ],
      providers: [{ provide: SharedService, useValue: mockSharedService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set ActivateAddEditUser to true when addClick is called', () => {
    mockSharedService.getUserList.and.returnValue(of([]));
    mockSharedService.getCompanyList.and.returnValue(of([]));

    component.addClick();

    expect(component.ActivateAddEditUser).toBeTrue();
  });
});
