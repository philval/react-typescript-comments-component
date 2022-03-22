import "./styles.css";
import Comments from "./components/Comments";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <h1>Comments Component</h1>
      <Comments />
    </div>
  );
}
