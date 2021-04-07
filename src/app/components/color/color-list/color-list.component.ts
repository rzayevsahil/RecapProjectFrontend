import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors:Color[]=[];

  constructor(
    private colorService:ColorService,
    private toastrService: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe(response => {
      this.toastrService.success("Başarıyla silindi", "Başarılı")
      this.getColors()
      this.router.navigate(["colorOperations"])
    }, responseError => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
        }
      }
    })
  }

}
