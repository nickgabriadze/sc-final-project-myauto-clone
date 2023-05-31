import Header from "./components/header/Header";
import CarSearch from "./components/search/CarSearch";

function App() {
  document.title = "ავტომობილები"
  return (
    <>
      <Header />
      <CarSearch />
    </>
  );
}

export default App;
