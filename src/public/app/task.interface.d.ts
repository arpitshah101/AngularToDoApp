export interface ITask {
    name: string;
    priority: number;
    deadline: Date;
    [prop: string]: any; // any additional properties are allowed
}
