import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  success: Boolean;
  msg: string;
  token: any;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  OnLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe((data: LoginComponent) => {
      if(data.success) {
        // If authenticate success, store user resource into the local storage and go to dashboard page.
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You are now logged in",{
          cssClass: 'alert-success',
           timeout:3000});
          this.router.navigate(['/dashboard']);
        // Else go bck to the login page.
      } else {
        this.flashMessage.show(data.msg,{
          cssClass: 'alert-danger',
           timeout:3000});
          this.router.navigate(['/login']);
      }

    });
  }

}
