import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router) {
    this.initialiazeRegisterForm();
  }

  ngOnInit() {
  }

  private initialiazeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      password: '',
    });
  }

  createUser() {
    const userToCreate: User = this.registerForm.getRawValue() as User;
    console.log(userToCreate);
    this.registerForm.reset();
    this.userService.createUser(userToCreate);
    this.router.navigate(['login']);
  }
}
