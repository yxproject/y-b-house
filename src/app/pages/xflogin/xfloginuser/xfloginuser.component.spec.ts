import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XfloginuserComponent } from './xfloginuser.component';

describe('XfloginuserComponent', () => {
  let component: XfloginuserComponent;
  let fixture: ComponentFixture<XfloginuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XfloginuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XfloginuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
