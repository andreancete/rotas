import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu-superior/menu.superior.component';
import { MenuLateralComponent } from './menu/menu-lateral/menu.lateral.component';
import { LogoComponent } from './menu/logo/logo.component';
import { Subscribable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    MenuLateralComponent,
    LogoComponent,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'rotas';
  protected mostraMenu: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.mostrarMenuEmit.subscribe((mostrar) => {
      this.mostraMenu = mostrar;
    });
  }

  ngOnDestroy() {
    // this.inscricao.unsubscribe();
  }
}
