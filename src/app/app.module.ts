import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { FlexibleTableComponent } from './components/flexible-table/flexible-table.component';
import { FormatPlayerPipe } from './components/flexible-table/format-player.pipe'

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataReducer } from './store/data.reducer';
import { DataEffects } from './store/data.effects';




@NgModule({
  declarations: [
    AppComponent,
    FlexibleTableComponent,
    FormatPlayerPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatPaginatorModule,
    StoreModule.forRoot({ data: DataReducer }),
    EffectsModule.forRoot([DataEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
