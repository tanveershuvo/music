import { NgModule } from "@angular/core";
import { BarDirective } from '../directives/bar.directive';
import { BottomDirective } from '../directives/bottom.directive';
import { LoadingButtonComponent } from 'src/app/comps/loading-button/loading-button.component';

@NgModule({
    declarations: [
        BarDirective,
        BottomDirective,
        LoadingButtonComponent  
    ],
    exports:[
        BarDirective,
        BottomDirective,
        LoadingButtonComponent
    ]
})
export class SharedModule{

}