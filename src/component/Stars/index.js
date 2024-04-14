import whiteStar from "../../assets/white-star.svg";
import "./index.css";
import { useEffect } from "react";

const Stars = () => {
	useEffect(() => {
		document.querySelectorAll(".white-star img").forEach((star, index) => {
			// 星星位置随机
			star.style.marginLeft = `${Math.random() * 5 + index * 5 + 50}vw`;
			star.style.marginTop = `${Math.random() * 20}vh`;
			// 星星大小随机
			star.style.width = `${Math.random() * 2}rem`;
			// 星星随机闪动效
			star.style.animationDelay = `0.5s`;
			star.style.animationDuration = `${Math.random() * 4 + 2}s`;
			star.style.animationName = "star1";
			star.style.animationIterationCount = "infinite";
			star.style.animationTimingFunction = "linear";
			star.style.animationDirection = "alternate";
			star.style.animationFillMode = "both";
			star.style.animationPlayState = "running";
		});
	}, []);

	return (
		<>
			<div className="stars">
				{/* {
					new Array(10).map((_, index) => {return <></>})
				} */}
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
				<span className="white-star">
					<img src={whiteStar} alt="white_star" />
				</span>
			</div>
		</>
	);
};

export default Stars;
