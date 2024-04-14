import React from "react";
import ReactDOM from "react-dom/client";
// import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";

// 阻止左滑返回
window.addEventListener(
	"touchstart",
	function (event) {
		if (event.touches.length > 0 && event.touches[0].clientX < 20) {
			event.preventDefault();
		}
	},
	{ passive: false },
);
window.addEventListener(
	"touchmove",
	function (event) {
		if (event.touches.length > 0 && event.touches[0].clientX < 20) {
			event.preventDefault();
		}
	},
	{ passive: false },
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals(console.log);
