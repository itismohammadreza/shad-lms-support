import {AfterContentInit, AfterViewChecked, Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {MenuItem} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit, AfterViewChecked, AfterContentInit {
  @Input() sidebarType = 'push-mask';
  @Input() sidebarVisible: boolean = true;
  @Input() sidebarLock: boolean = true;
  @Input() responsiveThreshold: number = 768;

  tempSidebarType: string;
  sidebarItems: MenuItem[] = [
    {label: 'داشبورد', routerLink: '/dashboard', icon: ''},
    {label: 'آزمون', routerLink: '/exam', icon: ''},
    {label: 'تکالیف', routerLink: '/homework', icon: ''},
    {label: 'محتوای درسی', routerLink: '/activity', icon: ''},
    {label: 'درسنامه', routerLink: '/tutorial', icon: ''},
    {label: '1.0.0'},
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.document.defaultView.innerWidth < this.responsiveThreshold) {
      this.changeSidebarType('overlay');
      this.maskEl?.classList.remove('d-none');
    } else if (this.document.defaultView.innerWidth >= this.responsiveThreshold) {
      this.changeSidebarType(this.sidebarType);
      this.sidebarVisible = true;
      this.sidebarLock = true
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
  }

  ngOnInit() {
    this.tempSidebarType = this.sidebarType;
    if (this.sidebarLock && !this.sidebarVisible) {
      this.sidebarVisible = true;
    }
    this.router.events.subscribe(res => {
      console.log(res)
    })
  }

  ngAfterViewChecked() {
    this.toggleSidebar(this.sidebarVisible);
    this.toggleSidebarLock(this.sidebarLock);
  }

  ngAfterContentInit() {
    if (this.document.defaultView.innerWidth < this.responsiveThreshold) {
      this.changeSidebarType('overlay');
    }
  }

  changeGlobalConfig(config: string, value: any) {
    this[config] = value;
  }

  changeSidebarType(event: any) {
    this.tempSidebarType = event.value || event;
    if (this.tempSidebarType == 'hover') {
      this.toggleSidebar(true);
    } else {
      this.toggleSidebar(false);
    }
    this.toggleSidebarLock(false);
  }

  toggleSidebarClick() {
    this.sidebarVisible = !this.sidebarVisible;
    this.toggleSidebar(this.sidebarVisible);
  }

  toggleLockSidebarClick() {
    this.sidebarLock = !this.sidebarLock;
    this.toggleSidebarLock(this.sidebarLock);
  }

  toggleSidebar(activate: boolean) {
    this.sidebarVisible = activate;
    if (['overlay', 'push'].includes(this.tempSidebarType)) {
      setTimeout(() => {
        if (this.sidebarVisible) {
          this.toggleMaskVisibility(false);
        }
      }, 0);
    }
  }

  toggleSidebarLock(activate: boolean) {
    this.sidebarLock = activate;
    if (this.isModalSidebar && this.sidebarVisible) {
      this.toggleMaskDisplay(!this.sidebarLock);
    }
  }

  toggleMaskDisplay(activate: boolean) {
    const body = this.document.body;
    if (activate) {
      this.maskEl?.classList.remove('d-none');
      body.classList.add('p-overflow-hidden');
    } else {
      this.maskEl?.classList.add('d-none');
      body.classList.remove('p-overflow-hidden');
    }
  }

  toggleMaskVisibility(activate: boolean) {
    if (this.maskEl) {
      if (activate) {
        this.maskEl.style.transitionDuration = '0.2ms';
        this.maskEl.style.opacity = '1';
      } else {
        this.maskEl.style.transitionDuration = '0ms';
        this.maskEl.style.opacity = '0';
      }
    }
  }

  get maskEl() {
    return this.document.querySelector('.p-sidebar-mask') as HTMLDivElement;
  }

  get isModalSidebar() {
    return (this.tempSidebarType == 'overlay' || this.tempSidebarType == 'overlay-mask' || this.tempSidebarType == 'push' || this.tempSidebarType == 'push-mask');
  }
}
