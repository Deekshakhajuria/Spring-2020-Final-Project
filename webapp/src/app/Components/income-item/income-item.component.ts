import { Component, OnInit, Inject, Input} from '@angular/core';
import { Income } from "../../models/income";
import { IncomeService } from "../../services/income.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-item',
  templateUrl: './income-item.component.html',
  styleUrls: ['./income-item.component.scss']
})

export class IncomeItemComponent implements OnInit {
  formDataIncome : Income = new Income();
  public key: any;
  public incomes: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<IncomeItemComponent>,
    private incomeService : IncomeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(!isNullOrUndefined(this.data.index))
    {
      this.formDataIncome = Object.assign({}, this.incomeService.incomes[this.data.index]);
      this.incomeService.getAllIncome().subscribe((response) => {
        this.incomes = response;
      })
 
    }
  }

  close()
  {
    this.dialogRef.close();
  }

  onSubmit(form:NgForm){


    if(!isNullOrUndefined(this.data.index))
    {   
        const id = this.incomes[this.data.index]._id;
        console.log(id);
        // if the income item index exists, update the chosen income item.
        this.incomeService.updateIncome(id, form.value).subscribe();
        this.toastr.success("Item update success!", "Income Update",{
          timeOut:2000
        } );
    }
    // Else add new income item.
    else {
      this.incomeService.addIncome(form.value);
      this.toastr.success("Item add success!","Income Add ",{
        timeOut:2000
      })
      }
    
    console.log("After Save");
   
    // After submit, close the dialog.
    this.close();

}


}

