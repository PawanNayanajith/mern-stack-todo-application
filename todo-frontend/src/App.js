import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TodoList from './components/TodoList';
import LandingPage from './components/LandingPage';
import AddTodoPage from './components/AddTodoPage';
import ViewTodosPage from './components/ViewTodosPage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/todos" component={TodoList} /> */}
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/add-todo" component={AddTodoPage} />
      <Route path="/view-todos" component={ViewTodosPage} />
    </BrowserRouter>
  );
}

export default App;
