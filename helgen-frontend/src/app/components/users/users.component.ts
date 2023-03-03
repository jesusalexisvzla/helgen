import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UserComponent } from './user/user.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface userElement {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit  {
  private onDestroy = new Subject<void>();

  public isLoading = false;
  public displayedColumns: string[] = ['name', 'email', 'role', 'isActive','edit','delete'];
  public dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private _builder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  public searchbar = new FormControl({ value: '', disabled: false });

  onChanges(): void {    
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getUsers();
    this.setListeners();
  }

  async getUsers(isQuery?, filter?) {
    this.isLoading = true;

    this.apiService.getDataObject('users').then(data=> {
      this.isLoading = false;
      this.dataSource = data;
    })
  }

  setListeners() {
    this.searchbar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(250)).subscribe((data => {
      if (data) {
        this.apiService.getDataObjectFiltered('users', {
          properties: ['name', 'email'],
          value: data,
          options: {
            like: true,
            i: true
          }
        }).then(data => {
          this.isLoading = false;
          this.dataSource = data;
        })
      } else {
        this.getUsers()
      }
    }))
  }

  addEditUser(isNew, data?) {
    const dialogRef = this.dialog.open(UserComponent, {
      data: {
        title: (isNew ? 'Create ' : 'Edit ') + 'User',
        isNew: isNew,
        user: data
      },
      autoFocus: false,
      width: '800px',
      panelClass: 'modal'
    })

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(async (data) => {
      if ( data?.hasChanges ) this.getUsers();
    })
  }

  async deleteUser(id) {
    try {
      await this.apiService.deleteDataObject('users', id).then(data=> {
        this.getUsers();
      })      
      // this.presentToast('Discount succesfully registered', 'green-snackbar');
    } catch (err) {
      console.log(err);
      this.getUsers();
      // this.presentToast('Conection Rejected', 'red-snackbar');
    }
  }

}
