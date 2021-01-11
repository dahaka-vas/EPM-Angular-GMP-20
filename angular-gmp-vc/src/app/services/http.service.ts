import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthors, ICourseItem } from '../models/course.models';
import { IAuthorizationResponse } from '../models/http.models';
import { IUser } from '../models/user.models';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    protected baseUrl = 'http://localhost:3004';

    constructor(
        private http: HttpClient,
    ) { }

    public login(login: string, password: string): Observable<IAuthorizationResponse> {
        return this.http.post<IAuthorizationResponse>(`${this.baseUrl}/auth/login`, {
            login,
            password,
        });
    }

    public getUser(token: string): Observable<IUser> {
        return this.http.post<IUser>(`${this.baseUrl}/auth/userinfo`, {
            token,
        });
    }


    // TODO: find out why the ICoursesRequest doesn't work
    public getCourses(params?: any): Observable<ICourseItem[]> {
        return this.http.get<ICourseItem[]>(`${this.baseUrl}/courses`, { params });
    }

    public getCourseById(id: number): Observable<ICourseItem> {
        return this.http.get<ICourseItem>(`${this.baseUrl}/courses/${id}`);
    }

    public updateCourse(course: ICourseItem): Observable<ICourseItem> {
        return this.http.patch<ICourseItem>(`${this.baseUrl}/courses/${course.id}`, course);
    }

    public createCourse(course: ICourseItem): Observable<ICourseItem> {
        return this.http.post<ICourseItem>(`${this.baseUrl}/courses`, course);
    }

    public deleteCourse(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/courses/${id}`);
    }


    // TODO: Implement authors list in the app
    public getAuthors(params: { textFragment: string }): Observable<IAuthors> {
        return this.http.get<IAuthors>(`${this.baseUrl}/auth/login`, { params });
    }


    public getErrors(params: { code: number }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth/login`, { params });
    }
}
