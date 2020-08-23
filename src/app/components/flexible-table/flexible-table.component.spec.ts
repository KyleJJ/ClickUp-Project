import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexibleTableComponent } from './flexible-table.component';

describe('FlexibleTableComponent', () => {
  let component: FlexibleTableComponent;
  let fixture: ComponentFixture<FlexibleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexibleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexibleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
