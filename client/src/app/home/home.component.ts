import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];
  // reqAuth = {id: "", name: ""};
  authId ="";

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllAuthors()
  }

  getAllAuthors(): void {
    console.log("get all authors")
    let auths = this._httpService.getAuthors();
    auths.subscribe(data => {
      this.authors = data['data'];
      console.log("authors: ", this.authors)
    });
  }

  deleteAuthor(event): void {
    this.authId = event.target.value;
    let Obs = this._httpService.deleteAuthor(this.authId);
    Obs.subscribe(data => {
    if (data['message'] == 'Success') {
      console.log("Successfully deleted Author", this.authId);
    } else {
      console.log("Error: deleting Author", data['error']);
    }
    });
    this.getAllAuthors();
  }


}
