import {Injectable, computed, signal } from "@angular/core";
import { AuthService } from "./auth.service";
import { Employee } from "../../../shared/utils/model/Employee";
import { AlertService } from "../../../shared/utils/alert.service";
import { catchError, Observable, of, tap } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class AuthStateService {
    private readonly _loading = signal(false)
    private readonly _employee = signal<Employee[]>([]);
    private readonly _user = signal<any | null>(null);
    private readonly _error = signal<string | null>(null);
    readonly loading = this._loading.asReadonly();
    readonly user = this._user.asReadonly();
    readonly employee = this._employee.asReadonly();
    readonly error = this._error.asReadonly();

    constructor(private api: AuthService, private alertService: AlertService) {}


    addEmployee(employee: Employee): Observable<Employee> {
    this._loading.set(true);
    this._error.set(null);

     return this.api.addEmployee(employee).pipe(
      tap((newEmployee: any) => {
        this._employee.update(employees => [...employees, newEmployee]);
        this._loading.set(false);
      }),
      catchError((error) => {
        this._error.set('Failed to add employee');
        this._loading.set(false);
        return of(error)
      })
     )
    }

    setEmployeePassword(token: string, password: string): Observable<any> {
      this._loading.set(true);
      this._error.set(null);

      return this.api.setEmployeePassword(token, password).pipe(
        tap(() => {
          this._loading.set(false);
        }),
        catchError((error) => {
          this._error.set('Failed to set employee password');
          this._loading.set(false);
          return of(error)
        })
      )
    }

    login(email: string, password: string): Observable<any> {
      this._loading.set(true);
      this._error.set(null);

      return this.api.login(email, password).pipe(
        tap((res: any) => {
          this._employee.set(res.employee);
          this._loading.set(false);
        }),
        catchError((error) => {
          this._error.set('Failed to login');
          this._loading.set(false);
          return of(error)
        })
      )
    }

  logout() {
    this._user.set(null);
  }

  }
