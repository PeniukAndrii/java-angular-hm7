import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  cars: any[];
  car = {model: '', price: null};
  oneCar = {model: '', price: null};

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/cars').subscribe(value => this.cars = value);
  }

  save(): void {
    console.log(this.car);
    this.http.post<any>('http://localhost:8080/cars/save', this.car)
      .subscribe(() => {
        this.http.get<any[]>('http://localhost:8080/cars').subscribe(value => this.cars = value);
    });
  }

  find(id): void{
    this.http.get<any>('http://localhost:8080/cars/' + id).subscribe(value => this.oneCar = value);
  }


  delete(selectedValue): void{
    this.http.delete<any>('http://localhost:8080/cars/' + selectedValue).subscribe( () => {
      this.http.get<any[]>('http://localhost:8080/cars').subscribe(value => this.cars = value);
    });
  }
}
