import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  public banks = new FormArray([]);
  public bankDataArr: any = [];
  public bankData: any;
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.bankDataArr = [];
    this.bankData = null;
    this.dataSharingService.formData.subscribe(
      data => {
        if (data.hasOwnProperty('data')) {
          console.log("if");
          this.assignData(data);
        } else {
          console.log("else");
          this.getData();
        }
      }
    )
  }
  addBank(count) {
    const group = new FormGroup({
      "minSlab": new FormControl(this.bankDataArr[count].slab_min),
      "maxSlab": new FormControl(this.bankDataArr[count].slab_max),
      "amount": new FormControl(this.bankDataArr[count].value),
      "fixed": new FormControl(this.bankDataArr[count].is_fixed),
    });
    this.banks.push(group);

  }
  public getName(index) {
    return Object.keys(this.bankData)[index];
  }
  getData() {
    var formData = new FormData();
    formData.append("token", "e090c25187ee2b3f9f1f8a02747356641");
    formData.append("authToken", "e090c25187ee2j890890skjb3f9f1f8a027r7kjd99");
    this.spinner.show();
    this.apiService.postMethodWithHeadWithUrl("https://paysprint.in/service-api/testangular/api/TestAngular/getDynamicform", formData).subscribe(
      data => {
        this.spinner.hide();
        this.dataSharingService.formData.next(data);

      },
      err => {
        this.spinner.hide();
      }
    )
  }
  assignData(data) {
    this.bankData = data.data[0];
    Object.keys(this.bankData).forEach((key) => {
      this.bankDataArr.push(this.bankData[key])
    });
    let count = 0;
    // loop through each key/value
    for (let key in this.bankData) {

      this.addBank(count);
      ++count;
    }
  }
  save() {
    let count = 0;
    let body = {};
    for (let key1 in this.bankData) {
      const key = Object.keys(this.bankData)[count];
      let subBody = {
        "slab_min": this.banks.controls[count].value.minSlab,
        "slab_max": this.banks.controls[count].value.maxSlab,
        "value": this.banks.controls[count].value.amount,
        "is_fixed": this.banks.controls[count].value.fixed
      }
      body[key] = subBody;
      ++count;
    }
    var formData = new FormData();
    formData.append("token", "e090c25187ee2b3f9f1f8a02747356641");
    formData.append("authToken", "e090c25187ee2j890890skjb3f9f1f8a027r7kjd99");
    formData.append("json", JSON.stringify(body));
    this.spinner.show();
    this.apiService.postMethodWithHeadWithUrl("https://paysprint.in/service-api/testangular/api/TestAngular/createDynamicform", formData).subscribe(
      data => {
        this.spinner.hide();
        if (data.statuscode == 200) {
          alert("Data Updated Successfully");
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }
}
