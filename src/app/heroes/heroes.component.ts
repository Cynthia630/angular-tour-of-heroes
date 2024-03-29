import { MessageService } from './../message.service';
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  // hero = 'Windstorm'
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }
  // heroes = HEROES
  // selectedHero?: Hero;
  heroes: Hero[] = []

  constructor(private heroService: HeroService) { }



  ngOnInit(): void {
    this.getHeroes()
  }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero
  //   this.messagesService.add(`HeroesComponent:Selected hero id=${hero.id}`)
  // }
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes()
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
