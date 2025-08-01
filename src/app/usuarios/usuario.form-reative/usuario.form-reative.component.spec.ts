import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormReativeComponent } from './usuario.form-reative.component';

describe('UsuarioFormReativeComponent', () => {
  let component: UsuarioFormReativeComponent;
  let fixture: ComponentFixture<UsuarioFormReativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormReativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioFormReativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
