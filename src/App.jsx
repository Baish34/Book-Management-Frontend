import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import BookView from "./components/BookView";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <BookView />
      </div>
    </>
  );
}

export default App;
