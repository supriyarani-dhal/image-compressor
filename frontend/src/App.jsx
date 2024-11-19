import ImageCompressor from "./components/ImageCompressor";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Image Compressor & Converter</h1>
      <ImageCompressor />
    </div>
  );
}

export default App;
