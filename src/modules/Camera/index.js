import "./index.css";
import { useEffect, useRef, useState, useCallback } from "react";
import closeCamera from "../../assets/close.svg";
import cameraSwitch from "../../assets/camera-switch.svg";
import { useNavigate } from "react-router-dom";
import { getGlobal, setGlobal } from "../../utils/global";
import { getCameraStream, drawCustomFaceShape, handleSnap } from "../../utils";

const Camera = () => {
	const navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasCoverRef = useRef(null);
	const [cameraIsFront, setCameraFront] = useState(
		getGlobal("cameraIsFront"),
	);

	const randerPage = useCallback(() => {
		videoHidden();
		getCameraStream();
		// 绘制面部蒙层
		drawCustomFaceShape(canvasCoverRef);
		showMyFace();
		videoShow();
	}, []);

	useEffect(() => {
		randerPage();
		window.addEventListener("resize", randerPage);
		return () => {
			window.removeEventListener("resize", randerPage);
		};
	}, [randerPage, cameraIsFront]);

	const videoHidden = () => {
		// 展开半透明遮罩
		document.getElementsByClassName("glass")[0]?.classList?.add("show");

		setTimeout(() => {
			// 隐藏视频组件
			document
				.getElementsByClassName("cameraVideo")[0]
				?.classList?.add("hidden");
		}, 500);
	};

	const videoShow = () => {
		setTimeout(() => {
			// 隐藏半透明遮罩
			document
				.getElementsByClassName("glass")[0]
				?.classList?.remove("show");
		}, 1000);

		setTimeout(() => {
			// 展开视频组件
			document
				.getElementsByClassName("cameraVideo")[0]
				?.classList?.remove("hidden");
		}, 500);
	};

	// 展示画面
	const showMyFace = () => {
		// 获取摄像头视频
		getGlobal("cameraMedia")
			?.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			})
			.catch((error) => {
				console.error("get carmera failed: ", error);
			});
	};

	// 切换摄像头
	const switchCamera = () => {
		setGlobal({ cameraIsFront: !cameraIsFront });
		setCameraFront(getGlobal("cameraIsFront"));
	};

	return (
		<>
			{/* 业务主体内容 */}
			<div className="face-camera">
				{/* 文字等 */}
				<div className="face-camera-container">
					<button
						type="button"
						className="common-none-btn"
						id="close-camera"
						onClick={() => navigate("/template")}
					>
						<img src={closeCamera} alt="close_camera" />
					</button>
					<p>
						Please align your face with the oval area for the photo
					</p>
					<div className="face-camera-footer">
						{/* 摄像头切换 */}
						<button
							type="button"
							className="camera-switch-btn common-none-btn"
							onClick={() => switchCamera()}
						>
							<img src={cameraSwitch} alt="camera_switch" />
						</button>
						{/* 拍照 */}
						<button
							type="button"
							className="snap-btn common-red-btn"
							onClick={() =>
								handleSnap(videoRef, navigate("/photo"))
							}
						>
							Capture
						</button>
					</div>
				</div>
				{/* 面部蒙层 */}
				<canvas id="canvas-cover" ref={canvasCoverRef}></canvas>
				{/* 毛玻璃 */}
				<div className="glass show"></div>
				{/* 视频展示 */}
				<video
					id="video"
					className={`cameraVideo ${cameraIsFront ? "mirror" : ""}`}
					width="100%"
					height="100%"
					autoPlay
					ref={videoRef}
					// muted
				></video>
			</div>
		</>
	);
};

export default Camera;
