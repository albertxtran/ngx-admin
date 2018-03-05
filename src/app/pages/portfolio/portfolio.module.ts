import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { PortfolioComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './portfolio.component';
import { PortfolioService } from './portfolio.service';

import { ThemeModule } from '../../@theme/theme.module';
import { PortfolioRoutingModule, routedComponents } from './portfolio-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    PortfolioRoutingModule,
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
  ],
  declarations: [
    ...routedComponents,
    PortfolioComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe
  ],
  providers: [
    PortfolioService
  ],

})
export class PortfolioModule {}