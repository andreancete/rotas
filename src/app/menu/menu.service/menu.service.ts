import { Injectable } from '@angular/core';

export interface MenuItem {
  label: string;
  link: string;
  icon?: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  getSuperiorMenu(): MenuItem[] {
    return [
      { label: 'Home', link: '/home' },
      { label: 'Sobre', link: '/sobre' },
      { label: 'Contato', link: '/contato' },
    ];
  }

  getLateralMenu(): MenuItem[] {
    return [
      { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
      { label: 'Usuários', icon: 'person', link: '/usuarios' },
      { label: 'Configurações', icon: 'settings', link: '/configuracoes' },
      { label: 'Sobre', icon: 'info', link: '/sobre' },
      { label: 'Sair', icon: 'exit_to_app', link: '/sair' },
    ];
  }
}
