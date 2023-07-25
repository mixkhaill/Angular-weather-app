import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainForecastComponent } from "./main-forecast/main-forecast.component";
import { FutureComponent } from "./future/future.component";

const routes: Routes = [
  { path: "", component: MainForecastComponent },
  {
    path: "future/:cityName",
    component: FutureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
