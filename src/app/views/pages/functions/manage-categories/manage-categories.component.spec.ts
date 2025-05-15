import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoriesComponent } from './manage-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManageCategoriesComponent', () => {
  let component: ManageCategoriesComponent;
  let fixture: ComponentFixture<ManageCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCategoriesComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
