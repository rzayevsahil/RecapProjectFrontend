import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]=[]
  currentColor:Color;
  dataLoaded=false;

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.gerColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true; 
    })
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  
  getCurrentAllColorClass(){
    if(!this.currentColor || this.currentColor.colorId==0 || this.currentColor.colorName==""){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  nullCurrentColor(){
    this.currentColor={colorName:"",colorId:0};
  }
}
