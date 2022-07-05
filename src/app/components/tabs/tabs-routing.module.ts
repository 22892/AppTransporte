import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'rutas',
        loadChildren: () => import('../rutas/rutas.module').then(m => m.RutasPageModule)
      },
      {
        path: 'horarios',
        loadChildren: () => import('../horarios/horarios.module').then(m => m.HorariosPageModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('../reportes/reportes.module').then(m => m.ReportesPageModule)
      },
      {
        path: 'acercade',
        loadChildren: () => import('../acercade/acercade.module').then(m => m.AcercadePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/rutas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/rutas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
