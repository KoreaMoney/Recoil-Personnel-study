import React from "react";
import GlobalStyle from "./GlobalStyle";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <TodoList />
    </div>
  );
};

export default App;
