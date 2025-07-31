import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada.component',
  imports: [],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css',
})
export class PaginaNaoEncontradaComponent {
  constructor(private router: Router) {}

  // Método para redirecionar ou executar alguma ação quando a página não for encontrada
  voltarParaHome() {
    // Implementar lógica de redirecionamento ou ação desejada
    console.log('Página não encontrada. Redirecionando...');
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    // Lógica de inicialização, se necessário
  }
}
