import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XfloginadminComponent } from './xfloginadmin.component';

describe('XfloginadminComponent', () => {
  let component: XfloginadminComponent;
  let fixture: ComponentFixture<XfloginadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XfloginadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XfloginadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
