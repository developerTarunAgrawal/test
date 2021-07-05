import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean = false;
  public otpBool: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router,
    private spinner: NgxSpinnerService, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      otp: [""],
    })
    this.dataSharingService.isUserLoggedIn.subscribe(
      data => {
        if (data) {
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }
  get fr() {
    return this.loginForm.controls;
  }
  public login() {
    if (this.loginForm.invalid) {
      this.submitted = true;
      alert("Please enter username and password correctly");
      return;
    }
    var formData = new FormData();
    formData.append("token", "e090c25187ee2b3f9f1f8a02747356641");
    formData.append("username", this.loginForm.value.username);
    formData.append("password", this.loginForm.value.password);
    this.spinner.show();
    this.apiService.postMethod("/latest-backup/api/app/task/login/login", formData).subscribe(
      data => {
        this.spinner.hide();
        if (data.response == 2000) {
          this.otpBool = true;
          // alert("Login Successfully");
        } else if (data.response == 2001) {
          alert(data.message)
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }
  public verifyOTP() {
    if (this.loginForm.value.otp == "") {
      alert("Please enter otp");
      return;
    }
    var formData = new FormData();
    formData.append("token", "e090c25187ee2b3f9f1f8a02747356641");
    formData.append("authToken", "e090c25187ee2j890890skjb3f9f1f8a027r7kjd99");
    formData.append("otp", this.loginForm.value.otp);
    this.spinner.show();
    this.apiService.postMethod("/latest-backup/api/app/task/login/verifyOtp", formData).subscribe(
      data => {
        this.spinner.hide();
        if (data.response == 2000) {
          alert("Login Successfull");
          let userObj = {
            "status": true, "response": 2000, "message": "Login Successful!", "userid": 1,
            "username": "Test2341", "name": "RNFITEST", "email": "test@test.com", "phone": "9999999999", "address": "New Delhi", "usertype": "user", "validToken": 99830920
          }
          sessionStorage.setItem('isUserLoggedIn', 'true');
          this.dataSharingService.isUserLoggedIn.next(true);
          this.dataSharingService.userDetails.next(userObj);
          this.router.navigate(['/dashboard']);
        } else if (data.response == 2001) {
          alert(data.message);
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }
}
