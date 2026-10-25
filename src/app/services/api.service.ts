import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API de terceros para prueba de productos
  private apiTercerosUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  // Consumo de API de Terceros
  getProductosTerceros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTercerosUrl);
  }

  // Simulación de Web Service Propio con Autenticación Remota (JWT)
  loginUsuario(credenciales: { user: string; pass: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer TOKEN_JWT_MOCK_123456' // Mecanismo de seguridad / Token
    });

    // Retorna una respuesta simulada de backend propio
    return new Observable(observer => {
      if (credenciales.user === 'admin' && credenciales.pass === '123456') {
        observer.next({ status: 200, token: 'TOKEN_JWT_MOCK_123456', message: 'Autenticación Exitosa' });
      } else {
        observer.error({ status: 401, message: 'Credenciales Inválidas' });
      }
      observer.complete();
    });
  }
}