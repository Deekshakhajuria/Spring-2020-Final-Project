import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadIncomeComponent } from './download-income.component';

describe('DownloadIncomeComponent', () => {
  let component: DownloadIncomeComponent;
  let fixture: ComponentFixture<DownloadIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
