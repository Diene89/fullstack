import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentComponent } from './document.component';
import { ShowDocumentComponent } from './show-document/show-document.component'

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DocumentComponent,
        ShowDocumentComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ShowDocumentComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-show-document')).toBeTruthy();
  });
});
