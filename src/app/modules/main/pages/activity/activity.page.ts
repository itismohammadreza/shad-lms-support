import {Component, OnInit} from '@angular/core';
import {ExamCount, GradeCount} from "@core/models";
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss']
})
export class ActivityPage implements OnInit {
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
  count: ExamCount = {};
  filterEnabled: boolean = false;
  genders = this.dataService.genders;

  constructor(private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.count = await this.dataService.getExamCount()
  }

  async clearFilter() {
    this.count = await this.dataService.getExamCount();
    this.form.reset();
    this.filterEnabled = false;
  }

  async onSubmitFilter() {
    const filters = this.utilsService.getDirtyControls(this.form);
    if (!filters) {
      return;
    }
    this.count = await this.dataService.getExamCount(filters)
    this.filterEnabled = true;
  }
}
