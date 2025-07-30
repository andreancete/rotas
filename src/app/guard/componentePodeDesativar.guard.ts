import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './canComponentDeactivate.Interface';

export const FormPodeDesativarGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  if (component.podeDesativar()) {
    console.log(`💂‍♀️ [Guarda] - Pode Desativar Guarda - permitido`);
    return true;
  } else {
    console.log(`💂‍♀️ [Guarda] - Pode Desativar Guarda - não permitido`);
    return false;
  }
};
