import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    exports: [
        MatIconModule,
        MatMenuModule
    ]
})
export class MaterialModule { }
