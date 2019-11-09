import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XfsysprintComponent } from './xfsysprint.component';

describe('XfsysprintComponent', () => {
  let component: XfsysprintComponent;
  let fixture: ComponentFixture<XfsysprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XfsysprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XfsysprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
