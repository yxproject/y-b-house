import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseHouseComponent } from './choose-house.component';

describe('ChooseHouseComponent', () => {
  let component: ChooseHouseComponent;
  let fixture: ComponentFixture<ChooseHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
