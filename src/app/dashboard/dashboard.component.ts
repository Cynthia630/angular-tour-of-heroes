import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { createRequest } from 'tiny-crud';
import axios from 'axios';
import { BaseModel } from "tiny-crud";
import { GithubStorage } from "tiny-crud";



interface UserModel extends BaseModel {
  name: string;
  age: number;
  gender: string;
}






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes()

  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}


