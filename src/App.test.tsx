import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

describe('Todo list', () => {
  beforeEach(() => {
    render (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  })

  test('Checking existance of  all items', () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const addButton = screen.getByRole("button", {name: "Add"});
    expect(addButton).toBeInTheDocument();

    const radioAll = screen.getByRole("radio", {name: "All"});
    expect(radioAll).toBeInTheDocument();

    const radioActive = screen.getByRole("radio", {name: "Active"});
    expect(radioActive).toBeInTheDocument();

    const radioDone = screen.getByRole("radio", {name: "Done"});
    expect(radioDone).toBeInTheDocument();
  });

  test('Adding new todo item in empty list', () => {
    const input = screen.getByRole("textbox");
    userEvent.type(input, "Todo-1");

    const addButton = screen.getByRole("button", {name: "Add"});
    userEvent.click(addButton);

    const list = screen.getAllByRole("checkbox");
    expect(list.length).toEqual(1);

    const firstTodo = screen.getByText("Todo-1");
    expect(firstTodo).toBeInTheDocument();
    expect(firstTodo).not.toBeChecked();
  });

  test('Adding new todo item in non-empty list', () => {
    const input = screen.getByRole("textbox");
    userEvent.type(input, "Todo-2");

    const addButton = screen.getByRole("button", {name: "Add"});
    userEvent.click(addButton);

    const list = screen.getAllByRole("checkbox");
    expect(list.length).toEqual(2);

    const secondTodo = screen.getByText("Todo-2");
    expect(secondTodo).toBeInTheDocument();
    expect(secondTodo).not.toBeChecked();
  });

  test('All current todos should be in active list, not in done list', () => {
    const radioActive = screen.getByRole("radio", {name: "Active"});
    userEvent.click(radioActive);

    const activeList = screen.getAllByRole("checkbox");
    expect(activeList.length).toEqual(2);

    const radioDone = screen.getByRole("radio", {name: "Done"});
    userEvent.click(radioDone);

    const doneList = screen.queryAllByRole("checkbox");
    expect(doneList.length).toEqual(0);
  })

  test('Check first todo as done (it should be in done list, not in active list)', () => {
    const list = screen.getAllByRole("checkbox");
    const firstTodo = list[0];
    userEvent.click(firstTodo);
    expect(firstTodo).toBeChecked();

    // Expecting to see only Todo-2 in active list
    const radioActive = screen.getByRole("radio", {name: "Active"});
    userEvent.click(radioActive);

    const activeList = screen.getAllByRole("checkbox");
    expect(activeList.length).toEqual(1);
    const secondTodo = screen.getByText("Todo-2");
    expect(secondTodo).toBeInTheDocument();

    // Expecting to see only Todo-1 in done list
    const radioDone = screen.getByRole("radio", {name: "Done"});
    userEvent.click(radioDone);

    const doneList = screen.getAllByRole("checkbox");
    expect(doneList.length).toEqual(1);
    const fistTodo = screen.getByText("Todo-1");
    expect(fistTodo).toBeInTheDocument();
  })

  test('Remove todos from list one by one', () => {
    // Removing first todo
    const removeButtons = screen.getAllByRole("button", {name: "Remove"});
    userEvent.click(removeButtons[0]);

    expect(screen.queryAllByRole("checkbox").length).toEqual(1);

    const firstTodo = screen.queryByText("Todo-1");
    expect(firstTodo).not.toBeInTheDocument();

    const secondTodo = screen.getByText("Todo-2");
    expect(secondTodo).toBeInTheDocument();

    // Removing second todo
    userEvent.click(screen.getByRole("button", {name: "Remove"}));
    expect(screen.queryAllByRole("checkbox").length).toEqual(0);
    expect(firstTodo).not.toBeInTheDocument();
    expect(secondTodo).not.toBeInTheDocument();
  })
})
