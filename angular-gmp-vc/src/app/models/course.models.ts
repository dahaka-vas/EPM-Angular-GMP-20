export interface IAuthors {
    id: number;
    name: string;
}

export interface ICourseItem {
    id: number;
    name: string;
    date: Date;
    length: number;
    description: string;
    topRated: boolean;
    authors?: IAuthors[];
}
