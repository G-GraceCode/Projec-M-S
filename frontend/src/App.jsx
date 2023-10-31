import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import {Container} from "react-Bootstrap"
import {Outlet} from "react-router-dom"

const App = () => {
  return (
    <>
      <Header />
      <HomePage />
    <COntainer><Outlet /> </Container>
    </>
  );
};

export default App;
