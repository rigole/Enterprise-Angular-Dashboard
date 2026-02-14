import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../../../shared/utils/model/Employee";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
     private readonly baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}
    
    addEmployee(employee: Employee) {
        return this.http.post(`${this.baseUrl}/add/employee`, employee);
    }
}
