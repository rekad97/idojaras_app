import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NotifyService} from '../shared/auth_and_register/notify.service';
import { AuthService} from '../shared/auth_and_register/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notifyService: NotifyService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/tab']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get field() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.notifyService.clear();
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.field.username.value, this.field.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      },
        error => {
        this.notifyService.error(error);
        this.loading = false;
        });
  }


}
