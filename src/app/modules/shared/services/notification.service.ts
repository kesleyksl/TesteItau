import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfig } from '../interfaces/snackbar.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly snackbar: MatSnackBar) { }

  showSnackbar(config: SnackbarConfig){
    if(!config || ! config?.message || config?.message.trim() === '')
      throw new Error('Empty message');

    this.snackbar.open(config.message, 
                       config?.action || 'X', 
                       {duration: config.config?.duration || 3000, ...config});
    return true;
  } 
}
