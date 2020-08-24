import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { FlexibleTableComponent } from './components/flexible-table/flexible-table.component';

import { DataReducer } from './store/data.reducer';
import { DataEffects } from './store/data.effects';
import { MatIconModule } from '@angular/material/icon';
import { FormatPlayerPipe } from './components/flexible-table/format-player.pipe'


@NgModule({
  declarations: [
    AppComponent,
    FlexibleTableComponent,
    FormatPlayerPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ data: DataReducer }),
    EffectsModule.forRoot([DataEffects]),
    DragDropModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
