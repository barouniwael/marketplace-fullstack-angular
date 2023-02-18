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
export class AllusersComponent implements OnInit, AfterViewInit {
  users:MatTableDataSource<any>;


userstab:any;
displayedColumns = ["username", "phone", "email", "action"];

// @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort,{static: true})sort:MatSort;
  constructor(private userservice:AuthService) { }

  ngOnInit() {
this.getAllUsers()

  // this.users.paginator = this.paginator;


  }
  ngAfterViewInit(): void {
    // this.users.paginator= this.paginator
     this.users.sort= this.sort; }


  getAllUsers(){

    
    this.userservice.getAllusers().subscribe((data)=>{
    
      
      this.users = new MatTableDataSource(data.users)
      
    })
  }

 
  deleteUser(id){
    this.userservice.deleteUser(id).subscribe((result)=>{
      if (result.isDeleted) {
        this.getAllUsers();
        alert(result.msg)
      } else {
        alert(result.msg)
      }
    });
    //  const item = this.users.find(item => item.id === id);
    // this.users.splice(this.users.indexOf(item),1);
  this.ngOnInit()
  }
 
}
