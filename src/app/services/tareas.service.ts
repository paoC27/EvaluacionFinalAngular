import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  
})
export class TareasService {
  private tareas: string[] = []; 

  getTareas() {
    return this.tareas;
  }

  addTarea(tarea: string) {
    this.tareas.push(tarea);
  }

  updateTarea(index: number, tareaActualizada: string) {
    this.tareas[index] = tareaActualizada;
  }

  deleteTarea(index: number) {
    this.tareas.splice(index, 1); 
  }
}
