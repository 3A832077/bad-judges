import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JudicialComponent } from './judicial.component';

describe('DempartmentsComponent', () => {
  let component: JudicialComponent;
  let fixture: ComponentFixture<JudicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JudicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
