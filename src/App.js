import "./App.css";
import AppRouter from "./AppRouter";
import PrintAIPhoto from "./component/PrintAIPhoto";

function App() {
	return (
		<>
			<div className="App">
				<div className="container">
					<AppRouter />
				</div>
			</div>
			<PrintAIPhoto />
		</>
	);
}

export default App;
