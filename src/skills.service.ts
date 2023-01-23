import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISkill } from './interfaces/skill';
import { IUserSkill } from './interfaces/userSkill';
import { IUser } from './interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skillsUrl = 'api/skills';
  private usersUrl = "api/users";
  private userSkillsUrl = "api/userSkills";


  constructor(private http: HttpClient) { }


    
  // This method returns a skill
  getSkills(): Observable<ISkill[]>  {
    return this.http.get<ISkill[]>(this.skillsUrl) .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  getUserSkills(): Observable<ISkill[]>  {
    return this.http.get<ISkill[]>(this.userSkillsUrl) .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }


  // This method returns a UserSkill
  getUserSkill(id: number): Observable<IUserSkill> {
    if (id === 0) {
      return of(this.initializeUserSkill());
    }
    const url = `${this.skillsUrl}/${id}`;
    return this.http.get<IUserSkill>(url)
      .pipe(
        tap(data => console.log('getUserSkill: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<IUser> {
    if (id === 0) {
      return of(this.initializeUser());
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(
      tap((data) => console.log("getUser: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

    // This updates a UserSkill
  updateUserSkill(userSkill: IUserSkill): Observable<IUserSkill> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.skillsUrl}/${userSkill.id}`;
        return this.http.put<IUserSkill>(url, userSkill, { headers })
          .pipe(
            tap(() => console.log('updateSkill: ' + userSkill.id)),
            // Return the skill on an update
            map(() => userSkill),
            catchError(this.handleError)
          );
      }

  // This method creates a Skill
  createSkill(skill: ISkill): Observable<ISkill> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        skill.id = 0;
        return this.http.post<ISkill>(this.skillsUrl, skill, { headers })
          .pipe(
            tap(data => console.log('createSkill: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

        // This method creates a UserSkill
  createUserSkill(userSkill: IUserSkill): Observable<IUserSkill> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        userSkill.id = 0;
        return this.http.post<IUserSkill>(this.skillsUrl, userSkill, { headers })
          .pipe(
            tap(data => console.log('createUserSkill: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

  // This method deletes a UserSkill
  deleteUserSkill(id: number): Observable<IUserSkill> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.skillsUrl}/${id}`;
        return this.http.delete<IUserSkill>(url, { headers })
          .pipe(
            tap(data => console.log('deleteSkill: ' + id)),
            catchError(this.handleError)
          );
      }


  // Error handling
  private handleError(err: HttpErrorResponse):  Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }


    // Return an initialized object
   private initializeUserSkill(): IUserSkill {
  return {
    id: 0,
    skill: { id: 0, skillName: '', skillCategory: '' },
    user: { id: 0, userName: '', description: '' },
    experienceLevel: 0
  };
}


private initializeUser(): IUser {
  // Return an initialized object
  return {
  id: 0,
  userName: '',
  description: ''
  };
}

}