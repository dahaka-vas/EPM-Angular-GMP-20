import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthors, ICourseItem } from '../models/course.models';
import { IAuthorizationResponse } from '../models/http.models';
import { IUser } from '../models/user.models';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    protected baseUrl = 'http://localhost:3004';

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
    ) { }

    public login(login: string, password: string): Observable<IAuthorizationResponse> {
        const request = this.http.post<IAuthorizationResponse>(`${this.baseUrl}/auth/login`, {
            login,
            password,
        });
        return this.loadingService.loadingUp(request);
    }

    public getUser(token: string): Observable<IUser> {
        const request = this.http.post<IUser>(`${this.baseUrl}/auth/userinfo`, {
            token,
        });
        return this.loadingService.loadingUp(request);
    }


    // TODO: find out why the ICoursesRequest doesn't work
    public getCourses(params?: any): Observable<ICourseItem[]> {
        const request = this.http.get<ICourseItem[]>(`${this.baseUrl}/courses`, { params });
        return this.loadingService.loadingUp(request);
    }

    public getCourseById(id: number): Observable<ICourseItem> {
        const request = this.http.get<ICourseItem>(`${this.baseUrl}/courses/${id}`);
        return this.loadingService.loadingUp(request);
    }

    public updateCourse(course: ICourseItem): Observable<ICourseItem> {
        const request = this.http.patch<ICourseItem>(`${this.baseUrl}/courses/${course.id}`, course);
        return this.loadingService.loadingUp(request);
    }

    public createCourse(course: ICourseItem): Observable<ICourseItem> {
        const request = this.http.post<ICourseItem>(`${this.baseUrl}/courses`, course);
        return this.loadingService.loadingUp(request);
    }

    public deleteCourse(id: number): Observable<void> {
        const request = this.http.delete<void>(`${this.baseUrl}/courses/${id}`);
        return this.loadingService.loadingUp(request);
    }


    // TODO: Implement authors list in the app
    public getAuthors(params: { textFragment: string }): Observable<IAuthors> {
        const request = this.http.get<IAuthors>(`${this.baseUrl}/auth/login`, { params });
        return this.loadingService.loadingUp(request);
    }


    public getErrors(params: { code: number }): Observable<any> {
        const request = this.http.post<any>(`${this.baseUrl}/auth/login`, { params });
        return this.loadingService.loadingUp(request);
    }
}
