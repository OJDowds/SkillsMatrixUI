// Possibly extract error handling into own service


// import { Injectable } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ErrorHandlerService {
//   handleError(err: HttpErrorResponse): Observable<never> {
//     let errorMessage = '';
//     if (err.error instanceof ErrorEvent) {
//       errorMessage = `An error occurred: ${err.error.message}`;
//     } else {
//       errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }