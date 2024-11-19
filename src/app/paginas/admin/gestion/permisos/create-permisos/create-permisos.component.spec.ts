import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermisosComponent } from './create-permisos.component';

describe('CreatePermisosComponent', () => {
  let component: CreatePermisosComponent;
  let fixture: ComponentFixture<CreatePermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePermisosComponent]
    });
    fixture = TestBed.createComponent(CreatePermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
