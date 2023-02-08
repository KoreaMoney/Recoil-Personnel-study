import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FocusEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput} value={category}>
        <option value={Categories.TO_DO}>TODO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateTodo />
      {toDos?.map((toDo) => (
        <Todo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
