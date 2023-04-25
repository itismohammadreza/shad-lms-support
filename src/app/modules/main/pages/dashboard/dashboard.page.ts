import {Component, OnInit} from '@angular/core';
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MomentService, UtilsService} from "@ng/services";
import {District, Item, Province, Usage} from "@core/models";

@Component({
  selector: 'ng-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  form = new FormGroup({
    province_id: new FormControl(),
    major: new FormControl(),
    school_type: new FormControl(),
    school_id: new FormControl(),
    gender_id: new FormControl(),
    grade: new FormControl(),
    stage: new FormControl(),
    field: new FormControl(),
  });
  countBar: any = {};
  provinces: Province[] = [];
  fields: Item[] = [];
  grades: Item[] = [];
  filterEnabled: boolean = false;
  schoolTypes = this.dataService.schoolTypes;
  genders = this.dataService.genders;
  schoolGenders = this.dataService.schoolGenders;

  constructor(private dataService: DataService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.provinces = await this.dataService.getProvinces();
    this.fields = await this.dataService.getFields();
    this.grades = await this.dataService.getGrades();
  }

  async onSubmitFilter() {
    // const filters = this.utilsService.getDirtyControls(this.usageForm);
    // if (!filters) {
    //   return;
    // }
    // this.usage = await this.dataService.getUsage(filters)
    // this.usageFilterEnabled = true;
  }

  async clearFilter() {
    // this.usage = await this.dataService.getUsage()
    // this.usageForm.reset();
    // this.usageFilterEnabled = false;
  }
}
