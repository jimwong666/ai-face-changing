import "./index.css";
import takePhoto from "../../assets/take-photo.svg";
import female_template1 from "../../assets/female_template1.png";
import female_template2 from "../../assets/female_template2.png";
import female_template3 from "../../assets/female_template3.png";
import male_template1 from "../../assets/male_template1.png";
import male_template2 from "../../assets/male_template2.png";
import male_template3 from "../../assets/male_template3.png";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setGlobal } from "../../utils/global";
import {
	getCameraStream,
	// fullScreen,
} from "../../utils";

const Template = () => {
	const navigate = useNavigate();
	const [templateId, setTemplateId] = useState("female_template1");
	const cards = [
		{ templateId: "female_template1", img: female_template1 },
		{ templateId: "male_template1", img: male_template1 },
		{ templateId: "female_template2", img: female_template2 },
		{ templateId: "male_template2", img: male_template2 },
		{ templateId: "female_template3", img: female_template3 },
		{ templateId: "male_template3", img: male_template3 },
	];

	useEffect(() => {
		getCameraStream();
	}, []);

	return (
		<>
			<div className="tempalte-selete">
				<div
					className="tempalte-selete-title"
					// onClick={() => {
					// 	// 全屏显示
					// 	if (!document.fullscreenElement) {
					// 		fullScreen();
					// 	}
					// }}
				>
					Unveil a New You with AI! <br />
					Pick a Hanfu template, snap & swap.
					<span> Surprise awaits!</span>
				</div>
				<div className="cards-container">
					{cards.map((item) => (
						<div
							className={`cards-item ${
								templateId === item.templateId ? "checked" : ""
							}`}
							key={item.templateId}
							onClick={() => {
								setTemplateId(item.templateId);
							}}
						>
							<div className="card-img">
								<img src={item.img} alt={item.templateId} />
							</div>
							<div className="card-other">
								<span
									className={`check-input ${
										templateId === item.templateId
											? "checked"
											: ""
									}`}
								></span>
								{item.templateId}
							</div>
						</div>
					))}
				</div>
				<div className="tempalte-selete-footer">
					<button
						type="button"
						className="takePhoto-btn common-red-btn"
						onClick={() => {
							setGlobal("templateId", templateId);
							navigate("/camera");
						}}
					>
						<img src={takePhoto} alt="take_a_photo" width={40} />
						Take a photo
					</button>
				</div>
			</div>

			<img src={logo} alt="logo" className="leftBottom-logo" />
		</>
	);
};

export default Template;
