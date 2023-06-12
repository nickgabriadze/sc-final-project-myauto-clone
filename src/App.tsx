import Header from "./components/header/Header";
import CarSearch from "./components/search/CarSearch";
import CarProducts from "./components/products/CarProducts";

function App() {
  document.title = "ავტომობილები";

  const padding:string = window.innerWidth <=375 ? '0':'20px';

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
          padding: padding,
        }}
      >
        <CarSearch />
        <CarProducts />
      </div>
    </div>
  );
}

export default App;
