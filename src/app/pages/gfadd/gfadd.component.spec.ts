import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GfaddComponent } from './gfadd.component';

describe('GfaddComponent', () => {
  let component: GfaddComponent;
  let fixture: ComponentFixture<GfaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GfaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GfaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
