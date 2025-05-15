import { Component } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss',
})
export class UserOverviewComponent {
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

  openEditModal(user: User, content: any): void {
    this.editingUserId = user.id;
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      active: user.active,
    });
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  submitForm(modal: NgbModalRef): void {
    if (!this.editingUserId) return;

    const updatedData = this.userForm.value;

    this.userService
      .updateUser(this.editingUserId, updatedData)
      .subscribe(() => {
        this.loadUsers();
        modal.close();
        this.resetForm();
      });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
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
