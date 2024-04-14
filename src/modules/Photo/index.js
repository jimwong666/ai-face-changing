import { useNavigate } from "react-router-dom";
import { getGlobal } from "../../utils/global";
import logo from "../../assets/logo.svg";
import redStar from "../../assets/red-star.svg";
import Stars from "../../component/Stars";
import "./index.css";

const Photo = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="red-star">
				<img src={redStar} alt="red_star" />
			</div>
			<div className="reality-photo">
				<div className="reality-photo-container">
					<div className="photo">
						<img src={getGlobal("snapDataURL")} alt="" />
					</div>
					<div className="photo-logo">
						<img src={logo} alt="logo" />
					</div>
				</div>
				<div className="reality-photo-shadow photo-shadow"></div>
				<div className="reality-photo-footer">
					<button
						type="button"
						className="reshoot-photo-btn common-transparent-btn"
						onClick={() => {
							navigate(-1);
						}}
					>
						Reshoot
					</button>
					<button
						type="button"
						className="commit-photo-btn common-red-btn"
						onClick={() => {
							navigate("/aiPhoto");
						}}
					>
						Confirm
					</button>
				</div>
			</div>
			<Stars />
		</>
	);
};

export default Photo;
