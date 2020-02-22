import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      query: new FormControl(null)
    });
  }
  

  searchSubmit(){
    let query = this.searchForm.value.query;

    if(query.length > 0){
      this._router.navigate(['/search', query]);
    }
  }
}
