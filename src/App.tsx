import "./styles.css";
import Comments from "./components/Comments";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div className="app-container">
        <h1>React Typescript Comments Component</h1>
        <Comments />
      </div>
    </div>
  );
}
