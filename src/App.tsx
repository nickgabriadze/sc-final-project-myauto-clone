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
        gap: "1rem",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "20px",
        }}
      >
        <CarSearch />
        <CarProducts />
      </div>
    </div>
  );
}

export default App;
