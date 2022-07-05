import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./components/rutas/rutas.module').then( m => m.RutasPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./components/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./components/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./components/acercade/acercade.module').then( m => m.AcercadePageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
