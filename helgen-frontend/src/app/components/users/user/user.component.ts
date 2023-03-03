import { Component, OnInit, Inject } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';

export interface dataIn {
  title: string;
  isNew: boolean;
  user: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public hasChanges = false;
  public disableButton = false;
  public isLoading = false;

  public addForm = this.fb.group({
    name: new FormControl({value: '', disabled: false}, Validators.required),
    email: new FormControl({value: '', disabled: false}, Validators.required),
    password: new FormControl({value: '', disabled: false}, Validators.required),
    role: new FormControl({value: '', disabled: false}, Validators.required),
    isActive: new FormControl({value: true, disabled: false}),
  });

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public dataIn: dataIn,
  ) { }

  ngOnInit(): void {
    if (!this.dataIn.isNew) this.setPatch(this.dataIn.user)
  }

  setPatch(user) {
    this.addForm.patchValue({...user});
  }

  async performRequest() {
    this.disableButton = true;
    this.isLoading = true;
    if (this.addForm.valid) {
      if (!this.dataIn.isNew) {
        try {
          const user = this.addForm.value;

          await this.apiService.editDataObject('users', user, this.dataIn.user._id).then(data=> {
            this.isLoading = false;
            this.hasChanges = true
            this.onNoClick();
          })      
        } catch (err) {
          console.log(err);
          this.disableButton = false;
          this.isLoading = false;
        }
      } else {
        try {
          let user = this.addForm.value;
          user['isActive'] = true;

          await this.apiService.addDataObject('users', user).then(data=> {
            this.isLoading = false;
            this.hasChanges = true
            this.onNoClick();
          })      
        } catch (err) {
          console.log(err);
          this.disableButton = false;
          this.isLoading = false;
        }
      }
    } else {
      this.disableButton = false;
      this.isLoading = false;
    }
  }

  onNoClick(): void {
    let data = { hasChanges: this.hasChanges }
    this.dialogRef.close(data);
  }
}
