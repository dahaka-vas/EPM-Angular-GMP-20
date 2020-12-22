import { ICourseItem } from 'src/app/models/course-item.models';

export const COURSES: ICourseItem[] = [
    {
        id: 1,
        title: 'Video Course 1. Some course title',
        creationDate: getDate(30),
        duration: 100,
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college\'s classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
        topRated: false,
    },
    {
        id: 2,
        title: 'Video Course 2. Another course title',
        creationDate: getDate(-4),
        duration: 72,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi earum quae nulla sunt est sed deserunt cumque qui perspiciatis! Aspernatur laboriosam qui quidem quas facilis reiciendis nisi consequatur rerum tempora maiores quibusdam, sed aut quae mollitia, ratione quia! Exercitationem commodi vel rerum cumque, possimus mollitia dolor ullam optio laborum sunt.',
        topRated: true,
    },
    {
        id: 3,
        title: 'Video Course 3. One more course title',
        creationDate: getDate(-70),
        duration: 47,
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college\'s classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
        topRated: false,
    },
    {
        id: 4,
        title: 'Video Course 4. One more course title',
        creationDate: getDate(-7),
        duration: 47,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi earum quae nulla sunt est sed deserunt cumque qui perspiciatis! Aspernatur laboriosam qui quidem quas facilis reiciendis nisi consequatur rerum tempora maiores quibusdam, sed aut quae mollitia, ratione quia! Exercitationem commodi vel rerum cumque, possimus mollitia dolor ullam optio laborum sunt.',
        topRated: true,
    },
];

function getDate(difference: number): Date {
    const date = new Date();
    date.setDate(new Date().getDate() + difference);
    return date;
}
