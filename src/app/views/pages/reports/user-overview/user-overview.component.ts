import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss',
})
export class UserOverviewComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  editingUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      active: [true],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  openEditAlert(): void {
    alert('Editing users is not allowed.');
  }

  openDeleteAlert(): void {
    alert('Deleting users is not allowed.');
  }

  // Removed the modal for editing since editing is not allowed anymore
  // This method now just shows an alert instead
  openEditModal(user: User): void {
    this.editingUserId = user.id;
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      active: user.active,
    });
    this.openEditAlert(); // Show alert instead of opening modal
  }

  // Removed delete user functionality, replaced with an alert
  deleteUser(id: number): void {
    this.openDeleteAlert(); // Show alert instead of performing delete
  }

  private resetForm(): void {
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      active: true,
    });
    this.editingUserId = null;
  }
}
