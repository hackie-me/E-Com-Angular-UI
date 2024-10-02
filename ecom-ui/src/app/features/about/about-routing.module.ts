import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
    {
        path: '',
        component: AboutComponent,
        pathMatch: 'full' 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        provideRouter(routes, withComponentInputBinding())
    ]
})
export class AboutRoutingModule { }
