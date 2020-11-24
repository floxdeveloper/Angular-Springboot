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
        if (res.status === '200') {
          const userType = res.object;
          this.apiService.storeToken(res.auth_TOKEN, userType);
          if (userType === 'customer') {
            this.router.navigate(['/home']);
          } else if (userType === 'admin') {
            this.router.navigate(['/admin']);
          }
          this.error = false;
        } else if (res.status === '500') {
          this.router.navigate(['/login']);
        }
      },
        err => {
          console.log(err);
        });
  }
}
