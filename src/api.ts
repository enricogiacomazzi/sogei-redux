import axios from "axios";
import { TodoModel } from "./features/Todo/models/todo.model";

const BASEURL = 'http://localhost:3001/todos';


const wait = (delay: number) => {
    return new Promise<void>((res, rej) => {
        setTimeout(() => res(), delay);
    })
}


export const getTodos = () => axios.get<Array<TodoModel>>(BASEURL).then(x => x.data);
export const addTodo = (todo: Omit<TodoModel, 'id'>) => axios.post<TodoModel>(BASEURL, todo).then(x => x.data);
type TodoModelEdit = Partial<TodoModel> & Pick<TodoModel, 'id'>;
export const editTodo = (todo: TodoModelEdit) => axios.patch<TodoModel>(BASEURL + '/' + todo.id, todo).then(x => x.data);
export const deleteTodo = (todo: TodoModelEdit) => axios.delete(BASEURL + '/' + todo.id);
