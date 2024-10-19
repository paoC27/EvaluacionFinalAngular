import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../../services/tareas.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  tareasForm: FormGroup;
  editMode = false;
  tareaEditandoIndex: number | null = null;

  constructor(private fb: FormBuilder, private tareasService: TareasService) {
    this.tareasForm = this.fb.group({
      tarea: ['', Validators.required]
    });
  }

  //obtiene todas las tareas desde el servicio
  get tareas() {
    return this.tareasService.getTareas();
  }

  //maneja la accion de agregar o actualizar una tarea
  onSubmit() {
    if (this.tareasForm.invalid) {
      this.tareasForm.markAllAsTouched();
      return;
    }

    //obtiene el valor de la tarea desde el formulario
    const tarea = this.tareasForm.value.tarea;

    if (this.editMode && this.tareaEditandoIndex !== null) {
      this.tareasService.updateTarea(this.tareaEditandoIndex, tarea);
      this.editMode = false;
      this.tareaEditandoIndex = null;
    } else {
      this.tareasService.addTarea(tarea);
    }

    this.tareasForm.reset();
  }

  onDelete(index: number) {
    this.tareasService.deleteTarea(index);
  }

  //inicia la edicion de una tarea cargando su valor en el formulario
  onEdit(index: number) {
    this.editMode = true;
    this.tareaEditandoIndex = index;
    const tarea = this.tareas[index];
    this.tareasForm.patchValue({ tarea });
  }
}
