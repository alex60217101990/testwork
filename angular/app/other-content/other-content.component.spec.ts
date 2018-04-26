import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherContentComponent } from './other-content.component';

describe('OtherContentComponent', () => {
  let component: OtherContentComponent;
  let fixture: ComponentFixture<OtherContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
