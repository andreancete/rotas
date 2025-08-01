import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormTemplateComponent } from './usuario.form-template.component';

describe('UsuarioFormTemplateComponent', () => {
  let component: UsuarioFormTemplateComponent;
  let fixture: ComponentFixture<UsuarioFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
