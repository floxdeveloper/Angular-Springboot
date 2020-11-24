import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: any;
  error = false;
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  login(): void {
    this.apiService.login(this.loginForm.value).
      subscribe(res => {
        if (res.status == "200") {
          this.apiService.storeToken(res.auth_TOKEN, "customer");
          this.router.navigate(['/home']);
          this.error = false;
        } else if (res.status == "500") {
          this.router.navigate(['/login']);
        }
      },
        err => {
          console.log(err);
        });
  }
}
