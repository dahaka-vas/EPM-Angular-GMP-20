export interface IAuthorizationResponse {
    token: string;
}

export interface ICoursesRequest {
    start?: number;         // Courses from index (if empty start will be 0).
    count?: number;         // Appropriate count of courses (if empty count will be length of courses array).
    sort?: string;          // Sorting key.
    textFragment?: string   // Text fragment for searching.
}
