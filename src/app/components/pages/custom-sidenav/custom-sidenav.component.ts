import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserLoged } from '../../models/auth.model';

export type MenuItem = {
  icon: string;
  label: string;   
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent implements OnInit {
  public user!: UserLoged;

  constructor(private _authService: AuthService) { }

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {icon: 'dashboard', label: 'Dash', route: '/dashboard'},
    {icon: 'person', label: 'Persona', route: '/persona'},
    {icon: 'description', label: 'Solicitud', route: '/solicitud'},
    {icon: 'pan_tool', label: 'Tipo solicitud', route: '/requestType'},
    {icon: 'devices_other', label: 'Dispositivo', route: '/device'},
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  ngOnInit() {
    this.user = this._authService.getUserFromLocalCache();
  }
}
