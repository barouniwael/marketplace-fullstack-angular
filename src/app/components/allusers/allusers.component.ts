import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit,AfterViewInit {
  users:MatTableDataSource<any>;



displayedColumns = ["username", "phone", "email", "action"];

@ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
@ViewChild(MatSort,{static: true})sort:MatSort;
  constructor(private userservice:AuthService) { }

  ngOnInit() {

this.users = new MatTableDataSource(this.userservice.getAllusers());

  }
  ngAfterViewInit(): void {
    this.users.paginator= this.paginator
    this.users.sort= this.sort;
  }
 
  deleteUser(id){
    this.userservice.deleteUser(id);
    // const item = this.users.find(item => item.id === id);
    // this.users.splice(this.users.indexOf(item),1);
  this.ngOnInit()
  }
}
