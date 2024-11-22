import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTrabajadorComponent } from './listar-trabajador.component';

describe('ListarTrabajadorComponent', () => {
  let component: ListarTrabajadorComponent;
  let fixture: ComponentFixture<ListarTrabajadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarTrabajadorComponent]
    });
    fixture = TestBed.createComponent(ListarTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
