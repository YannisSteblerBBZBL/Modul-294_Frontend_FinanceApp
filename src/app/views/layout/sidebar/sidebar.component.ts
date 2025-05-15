import { DOCUMENT, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterLinkActive, RouterLink } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import MetisMenu from 'metismenujs';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { FeatherIconDirective } from '../../../core/feather-icon/feather-icon.directive';
import { KeycloakService } from '../../../services/auth/keycloak.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgScrollbar,
    NgClass,
    FeatherIconDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;
  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private keycloakService: KeycloakService  // Inject KeycloakService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });
  }

  ngOnInit(): void {
    // Filter the menu items based on the user's roles
    this.menuItems = this.filterMenuBasedOnRole(MENU);
    
    const desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar(desktopMedium);
    });
    this.iconSidebar(desktopMedium);
  }

  ngAfterViewInit() {
    // activate menu items
    new MetisMenu(this.sidebarMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add("open-sidebar-folded");
    }
  }

  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  resetMenuItems() {
    const links = document.getElementsByClassName('nav-link-ref');
    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }
      }
    }
  }

  activateMenuItems() {
    const links: any = document.getElementsByClassName('nav-link-ref');
    let menuItemEl = null;
    for (let i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];
        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('mm-active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }
      }
    }
  }

  /**
   * Filters menu items based on the user's roles
   * @param menuItems
   * @returns Filtered menu items
   */
  private filterMenuBasedOnRole(menuItems: MenuItem[]): MenuItem[] {
    const userHasAdminRole = this.keycloakService.hasRole('ROLE_admin');

    return menuItems.filter(item => {
      if (item.label === 'Admin' && !userHasAdminRole) {
        return false;
      }
      if (item.label === 'User Overview' && !userHasAdminRole) {
        return false;
      }
      // You can add additional logic to handle subItems or other dynamic filtering
      return true;
    });
  }

}
