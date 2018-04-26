import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageRegisterControllerComponent } from './auth-page-register-controller.component';

describe('AuthPageRegisterControllerComponent', () => {
  let component: AuthPageRegisterControllerComponent;
  let fixture: ComponentFixture<AuthPageRegisterControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPageRegisterControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageRegisterControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
