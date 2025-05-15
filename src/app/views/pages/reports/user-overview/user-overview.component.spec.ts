import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverviewComponent } from './user-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserOverviewComponent', () => {
  let component: UserOverviewComponent;
  let fixture: ComponentFixture<UserOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOverviewComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
