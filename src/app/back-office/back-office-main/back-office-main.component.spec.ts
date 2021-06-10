import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeMainComponent } from './back-office-main.component';

describe('BackOfficeMainComponent', () => {
  let component: BackOfficeMainComponent;
  let fixture: ComponentFixture<BackOfficeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
