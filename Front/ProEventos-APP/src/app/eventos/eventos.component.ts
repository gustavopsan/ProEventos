import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];

  widthImg: number = 150;
  marginImg: number = 3;
  showImg: boolean = true;
  private _listFilter: string = '';

  public set listFilter(value: string) {
    this._listFilter = value;
    this.eventosFiltrados = this.listFilter ? this.filterEventos(this.listFilter) : this.eventos;
  }

  filterEventos(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 || evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  public get listFilter(): string {
    return this._listFilter;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public toggleImage(): void {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {

    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }
}
