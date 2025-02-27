import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DempartmentsComponent } from './dempartments.component';

describe('DempartmentsComponent', () => {
  let component: DempartmentsComponent;
  let fixture: ComponentFixture<DempartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DempartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DempartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
