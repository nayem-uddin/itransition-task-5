import UserInterface from "./components/display books/UserInterface";
import ContextProvider from "./context/ContextProvider";
function App() {
  return (
    <>
      <ContextProvider>
        <UserInterface />
      </ContextProvider>
    </>
  );
}

export default App;
