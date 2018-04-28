import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesGroupComponent } from './venues-group.component';

describe('VenuesGroupComponent', () => {
  let component: VenuesGroupComponent;
  let fixture: ComponentFixture<VenuesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
