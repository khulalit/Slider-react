import "./App.css";
import Slider from "./components/Slider";

function App() {
  return (
    <div>
      <Slider
        type="Continuous"
        subtype="Single"
        handleSize="Size_24"
        min={10}
        max={130}
        steps={20}
      />
    </div>
  );
}

export default App;
