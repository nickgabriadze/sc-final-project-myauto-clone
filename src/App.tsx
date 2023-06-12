import Header from "./components/header/Header";
import CarSearch from "./components/search/CarSearch";
import CarProducts from "./components/products/CarProducts";

function App() {
  document.title = "ავტომობილები";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          paddingTop: "20px",
        }}
      >
        <CarSearch />
        <CarProducts />
      </div>
    </div>
  );
}

export default App;
