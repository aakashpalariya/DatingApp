import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of, take } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  currentUser: any;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.currentUser = user;
        }
      }
    })
    // this.getCurrentUser();
  }


  // getCurrentUser() {
  //   const userString = localStorage.getItem('user');
  //   if (userString) {
  //     var user = JSON.parse(userString);
  //     this.currentUser = user;
  //   }
  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: respose => {
        this.router.navigateByUrl('/members');
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
