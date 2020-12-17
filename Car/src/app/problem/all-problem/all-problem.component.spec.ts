import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProblemComponent } from './all-problem.component';

describe('AllProblemComponent', () => {
  let component: AllProblemComponent;
  let fixture: ComponentFixture<AllProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
