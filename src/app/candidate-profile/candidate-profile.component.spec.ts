import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CandidateProfileComponent } from './candidate-profile.component';

describe('CandidateProfileComponent', () => {
  let component: CandidateProfileComponent;
  let fixture: ComponentFixture<CandidateProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
