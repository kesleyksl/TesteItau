import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfig } from '../interfaces/snackbar.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly snackbar: MatSnackBar) { }

  async confirm(message: string){
    if(!message || message.trim() === '')
      throw new Error('Empty message');

    return await window.confirm(message);
  }

  showSnackbar(config: SnackbarConfig){
    if(!config || ! config?.message)
      return

    this.snackbar.open(config.message, config?.action, config?.config)
  }
}
