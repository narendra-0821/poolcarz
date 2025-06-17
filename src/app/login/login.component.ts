import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Login } from "./login.model";
import { RestService } from "../services/rest.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginModel = new Login(); 
  errorMessage = "";
  users: any[] = [];


  constructor(private router: Router, private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error("Error fetching users:", err);
        this.errorMessage = "Unable to load user data. Try again later.";
      },
    });
  }

  onLogin() {
    if (!this.loginModel.username || !this.loginModel.password) {
      this.errorMessage = "Please enter both username and password.";
    } else {
      const isValidUser = this.users.some(
        (user) =>
          user.username === this.loginModel.username &&
          user.password === this.loginModel.password
      );

      if (isValidUser) {
        this.errorMessage = "";
        this.router.navigate(["/book-ride"]);
      } else {
        this.errorMessage = "Invalid username or password.";
      }
    }
  }

  onCancel() {
    this.loginModel = new Login();
    this.errorMessage = "";
  }
}
