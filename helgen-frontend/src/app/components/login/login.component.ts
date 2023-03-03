import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: new FormControl({value: '', disabled: false}, Validators.required),
    password: new FormControl({value: '', disabled: false}, Validators.required)
  });

  public isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private ApiService: ApiService, 
  ) { }

  ngOnInit(): void {
    this.ApiService.checkAuth();
  }

  performRequest(){
    if (this.loginForm.valid) {
      this.isLoading = true;
      let loginObject: any = {
        password: this.loginForm.get('password').value,
        email: this.loginForm.get('email').value 
      };
  
      this.ApiService.loginUser(loginObject)
        .then((data) => {
          if (data['user']) {
            this.ApiService.saveUser(data);
            this.isLoading = false;
          } else {
            this.isLoading = false;
            console.log(data)
            alert("Usuario y/o contraseña incorrecta")
          }
        })
        .catch((error) => {
          this.isLoading = false;
          alert("Usuario y/o contraseña incorrecta")
        });
    }
  }
}
