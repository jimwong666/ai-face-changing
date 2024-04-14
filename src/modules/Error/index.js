import "./index.css";
import error from "../../assets/error.png";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Error = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="error-content">
				<img src={error} alt="error" id="error-img" />
				<p>
					Encountered some minor issues, generation failed.
					<br /> Please try again!
				</p>
				<div className="error-footer">
					<button
						type="button"
						className="restart-btn common-transparent-btn"
						onClick={() => navigate("/template")}
					>
						Restart
					</button>
					<button
						type="button"
						className="common-red-btn"
						onClick={() => navigate("/aiPhoto")}
					>
						Regenerate
					</button>
				</div>
				<img src={logo} alt="logo" className="leftBottom-logo" />
			</div>
		</>
	);
};

export default Error;
