import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Proyecto Desarrollo Web Integral';
  
  // Datos de login
  usuario = { user: '', pass: '' };
  tokenJwt: string | null = null;
  mensajeAuth: string = '';

  // Datos de API externa
  productos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Web Service Propio / Autenticación
  iniciarSesion() {
    this.apiService.loginUsuario(this.usuario).subscribe({
      next: (res) => {
        this.tokenJwt = res.token;
        this.mensajeAuth = '¡Autenticado con éxito usando JWT!';
      },
      error: (err) => {
        this.mensajeAuth = 'Error de autenticación. Revisa usuario/contraseña.';
      }
    });
  }

  // Web Service Terceros
  cargarProductos() {
    this.apiService.getProductosTerceros().subscribe({
      next: (data) => {
        this.productos = data.slice(0, 4); // Carga los primeros 4 productos
      },
      error: (err) => console.error(err)
    });
  }
}