export interface Task {
    deadline: Date;
    priority: number;
    task: string;
    [propName: string]: any;
}
