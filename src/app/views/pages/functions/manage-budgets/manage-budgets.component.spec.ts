import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBudgetsComponent } from './manage-budgets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManageBudgetsComponent', () => {
  let component: ManageBudgetsComponent;
  let fixture: ComponentFixture<ManageBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBudgetsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
