# Rest APIs

## Get all tasks
```
URL:  /api/tasks
Type: GET

Response:
{
    data: [
        {
            _id: string, // String representation of _id key
            name: string,
            priority: int,
            deadline: date
        },
        ...
    ]
}

```

## Add new task
```
URL: /api/tasks/add
Type: POST

Request:
{
    name: string,
    priority?: int,
    deadline?: date
}

Response:
{
    status: int, // either 200 (success) or 400 (fail)
    message: 'Task added!'
}
```

## Delete task
```
URL: /api/tasks/delete
Type: POST

Request:
{
    _id: string // String representation of _id key
}

Response:
{
    status: int, // either 200 (success) or 400 (fail)
    message: 'Task deleted!'
}
```