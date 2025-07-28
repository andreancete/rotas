// Update the path below to the correct location of menu.service.ts
import { MenuService } from '../../menu/menu.service/menu.service';
import { MenuItem } from '../../menu/menu.service/menu.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.lateral.component.html',
  styleUrls: ['./menu.lateral.component.css'],
})
export class MenuLateralComponent {
  menuItems: MenuItem[];

  constructor(private menuService: MenuService) {
    this.menuItems = this.menuService.getLateralMenu();
  }
}
