import { MatSnackBarConfig } from "@angular/material/snack-bar";

export interface SnackbarConfig{
    message: string,
    action?: string,
    config?:  MatSnackBarConfig
}