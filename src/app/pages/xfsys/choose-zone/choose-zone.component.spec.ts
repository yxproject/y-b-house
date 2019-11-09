import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseZoneComponent } from './choose-zone.component';

describe('ChooseZoneComponent', () => {
  let component: ChooseZoneComponent;
  let fixture: ComponentFixture<ChooseZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
