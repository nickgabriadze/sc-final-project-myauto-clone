import Header from "./components/header/Header";
import CarSearch from "./components/search/CarSearch";

function App() {
  document.title = "ავტომობილები"
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <Header />
      <CarSearch />
      </div>
  );
}

export default App;
