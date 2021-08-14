import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDiffDemoComponent } from './scheduler-diff-demo.component';

describe('SchedulerDiffDemoComponent', () => {
  let component: SchedulerDiffDemoComponent;
  let fixture: ComponentFixture<SchedulerDiffDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerDiffDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerDiffDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
