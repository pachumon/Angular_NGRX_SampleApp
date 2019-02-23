import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../state/app.state';
import * as fromUser from '../user/state/user.reducer';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUserActions from './state/user.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';
  errorMessage: string;
  maskUserName: boolean;
  componentActive = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromUser.getmaskUserName),
        takeWhile(() => this.componentActive)
      )
      .subscribe(maskUserName => (this.maskUserName = maskUserName));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.maskUserName = value;
    this.store.dispatch(new fromUserActions.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
