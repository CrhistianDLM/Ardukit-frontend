import { LoginResponse } from './../services/user/login_response-interface';
import { UserService } from './../services/user/user.service';
import { CategoriesService } from './../services/categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.scss']
})
export class NuevaCategoriaComponent implements OnInit {
  public name: string;
  public description: string;
  constructor(

    public router: Router,
    public route: ActivatedRoute,
    public catService: CategoriesService,
    public userService: UserService) {
    this.name = "";
    this.description = "";
    if(this.userService.getSessionToken() == null){
      this.router.navigateByUrl("/login");
    }

  }

  ngOnInit(): void {
  }
  addToServer(){
    this.catService.addCategory(this.userService.getSessionToken() as string, this.name, this.description).subscribe(d => {
      console.log(d);
      history.back();
    }, err =>{
      alert(err.statusText);

    });
  }
  saveCategory(){
    if(!this.userService.isExpired()){

      this.addToServer();
      return;
    }
    //
    this.userService.refresh(this.userService.getSessionToken() as string).subscribe(d => {
      localStorage.setItem("session_info", JSON.stringify(d));

      this.addToServer();
    });
  }

}
