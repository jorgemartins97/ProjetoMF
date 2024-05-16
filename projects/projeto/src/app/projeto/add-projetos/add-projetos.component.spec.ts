import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetosComponent } from './add-projetos.component';
import { HttpClientModule } from '@angular/common/http';

describe('AddProjetosComponent', () => {
  let component: AddProjetosComponent;
  let fixture: ComponentFixture<AddProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProjetosComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    const formElement = fixture.nativeElement.querySelector('.project-add');
    const labelElements = fixture.nativeElement.querySelectorAll('label');
    const inputElements = fixture.nativeElement.querySelectorAll('input[type="date"]');
    const buttonElement = fixture.nativeElement.querySelector('#buttonAdd');
  
    expect(formElement).toBeTruthy();
    expect(labelElements[0].textContent).toContain('Project Name:');
    expect(labelElements[1].textContent).toContain('Start Date:');
    expect(labelElements[2].textContent).toContain('End Date:');
  
    expect(inputElements.length).toBe(2);
    expect(buttonElement).toBeTruthy();
  });

});
