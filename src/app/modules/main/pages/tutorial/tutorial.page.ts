import {Component, OnInit} from '@angular/core';
import {GradeCount, TutorialCount} from "@core/models";
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss']
})
export class TutorialPage implements OnInit {
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
  count: TutorialCount = {};
  filterEnabled: boolean = false;
  genders = this.dataService.genders;

  constructor(private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.count = await this.dataService.getTutorialCount()
  }

  async clearFilter() {
    this.count = await this.dataService.getTutorialCount();
    this.form.reset();
    this.filterEnabled = false;
  }

  async onSubmitFilter() {
    const filters = this.utilsService.getDirtyControls(this.form);
    if (!filters) {
      return;
    }
    this.count = await this.dataService.getTutorialCount(filters)
    this.filterEnabled = true;
  }
}
