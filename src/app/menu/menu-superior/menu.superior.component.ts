import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService, MenuItem } from '../../menu/menu.service/menu.service';

@Component({
  selector: 'app-menu-superior',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.superior.component.html',
  styleUrls: ['./menu.superior.component.css'],
})
export class MenuComponent {
  menuItems: MenuItem[];

  constructor(private menuService: MenuService) {
    this.menuItems = this.menuService.getSuperiorMenu();
  }
}
