import { getGlobal, setGlobal } from "./global";
import photoCover from "../assets/photo-cover.svg";
import maike from "../assets/maike.png";

// 获取摄像头视频数据
export const getCameraStream = () => {
	let params = {
		width: 0,
		height: 0,
		facingMode: "user",
	};

	/* 这里本来想对摄像头最大分辨率进行采集，以达到做大分辨率，现在看没必要了 */
	// portrait 竖屏 |
	// landscape 横屏 ——
	// const isPortrait = window.matchMedia("(orientation: portrait)").matches;

	// 前后摄像头分辨率不一样
	if (getGlobal("cameraIsFront")) {
		// 前置摄像头
		params = {
			// width: isPortrait ? 2320 : 3088,
			// height: isPortrait ? 3088 : 2320,
			facingMode: "user",
		};
	} else {
		// 后置摄像头
		params = {
			// width: isPortrait ? 3024 : 4032,
			// height: isPortrait ? 4032 : 3024,
			facingMode: "environment",
		};
	}

	try {
		// 获取流
		setGlobal({
			cameraMedia: navigator.mediaDevices
				.getUserMedia({
					video: {
						// width: { ideal: params.width },
						// height: { ideal: params.height },
						facingMode: params.facingMode,
					},
				})
				.catch((error) => {
					if (error.name === "NotAllowedError") {
						alert("请允许访问摄像头");
					} else {
						alert("获取摄像头视频流失败!");
						console.error("get carmera stream failed: ", error);
					}
				}),
		});
	} catch (err) {
		console.error("get carmera failed: ", err);
	}
};

// 面部蒙层
export const drawCustomFaceShape = (canvasRef) => {
	const canvas = canvasRef?.current;
	if (canvas) {
		if (window.matchMedia("(orientation: portrait)").matches) {
			// 竖屏
			canvas.width = "1024";
			canvas.height = "1366";
		} else if (window.matchMedia("(orientation: landscape)").matches) {
			// 横屏
			canvas.width = "1366";
			canvas.height = "1024";
		}
		// 基准 X Y 坐标
		const baseX = canvas.width / 2;
		const baseY = Math.floor(canvas.height / 2.5);

		const ctx = canvas.getContext("2d");
		// 清除画布
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "rgba(0, 0, 0, 0.83)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// 开始绘制人脸轮廓
		ctx.beginPath();

		// 绘制头部轮廓，顶部宽、下巴处窄
		ctx.moveTo(baseX + 233, baseY); // 起点
		// 头顶
		ctx.bezierCurveTo(
			baseX + 271,
			baseY - 356,
			baseX - 271,
			baseY - 356,
			baseX - 233,
			baseY,
		);
		// 左耳
		ctx.bezierCurveTo(
			baseX - 253,
			baseY,
			baseX - 263,
			baseY + 5,
			baseX - 253,
			baseY + 25,
		);
		ctx.bezierCurveTo(
			baseX - 248,
			baseY + 65,
			baseX - 243,
			baseY + 55,
			baseX - 228,
			baseY + 86,
		);
		ctx.bezierCurveTo(
			baseX - 214,
			baseY + 110,
			baseX - 214,
			baseY + 110,
			baseX - 195,
			baseY + 118,
		);

		// 下巴
		ctx.bezierCurveTo(
			baseX - 135,
			baseY + 365,
			baseX + 135,
			baseY + 365,
			baseX + 195,
			baseY + 118,
		);
		// 右耳
		ctx.bezierCurveTo(
			baseX + 214,
			baseY + 110,
			baseX + 214,
			baseY + 110,
			baseX + 228,
			baseY + 86,
		);
		ctx.bezierCurveTo(
			baseX + 243,
			baseY + 55,
			baseX + 248,
			baseY + 65,
			baseX + 253,
			baseY + 25,
		);
		ctx.bezierCurveTo(
			baseX + 263,
			baseY + 5,
			baseX + 253,
			baseY,
			baseX + 233,
			baseY,
		);
		ctx.closePath();

		// 清除人脸形状区域
		ctx.globalCompositeOperation = "destination-out";
		ctx.fill();

		// 恢复绘制模式
		ctx.globalCompositeOperation = "source-over";

		// 绘制人脸形状的轮廓
		ctx.strokeStyle = "white";
		ctx.lineWidth = 5;
		ctx.setLineDash([15, 15]);
		ctx.stroke();
	}
};

// canvas 截图
export const handleSnap = (videoRef, callback = () => {}) => {
	const video = videoRef.current;

	if (video) {
		const { videoWidth, videoHeight } = video;

		const canvasDemo = document.createElement("canvas");
		const ctx = canvasDemo.getContext("2d");
		const cameraIsFront = getGlobal("cameraIsFront");

		if (window.matchMedia("(orientation: portrait)").matches) {
			// 竖屏
			canvasDemo.width = videoWidth * 0.8;
			canvasDemo.height = videoHeight * 0.7;
			if (cameraIsFront) {
				// 左右镜像翻转
				ctx.translate(canvasDemo.width, 0);
				ctx.scale(-1, 1);
			}
			// 绘制
			ctx.drawImage(
				video,
				videoWidth * 0.1,
				videoHeight * 0.1,
				canvasDemo.width,
				canvasDemo.height,
				0,
				0,
				canvasDemo.width,
				canvasDemo.height,
			);
		} else if (window.matchMedia("(orientation: landscape)").matches) {
			// 横屏
			canvasDemo.width = videoWidth * 0.6;
			canvasDemo.height = videoHeight * 0.92;
			if (cameraIsFront) {
				// 左右镜像翻转
				ctx.translate(canvasDemo.width, 0);
				ctx.scale(-1, 1);
			}
			// 绘制
			ctx.drawImage(
				video,
				videoWidth * 0.2,
				0,
				canvasDemo.width,
				canvasDemo.height,
				0,
				0,
				canvasDemo.width,
				canvasDemo.height,
			);
		}

		const imageDataUrl = canvasDemo.toDataURL("image/png");
		setGlobal({
			snapDataURL: imageDataUrl,
		});
		callback();
	}
};

// 全屏
export const fullScreen = () => {
	// PWA 用不了
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			/* Safari */
			document.documentElement.webkitRequestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			/* IE11 */
			document.documentElement.msRequestFullscreen();
		}
	}
};

// 合成图片
// 合成需要打印的 AI照片和logo、麦可
export const mixImg = async (base64ImageData, baseWidth, baseHeight) => {
	if (!base64ImageData) {
		alert("图片获取失败！");
		return base64ImageData;
	}

	// logo、麦可图片信息
	const logoImgInfo = { width: 378, height: 56 };
	const maikeImgInfo = { width: 70, height: 70 };

	try {
		const base64ImageDataImg = await exchangeImg(
			base64ImageData,
			baseWidth,
			baseHeight,
		);

		const rate = baseWidth / logoImgInfo.width;
		const logoImg = await exchangeImg(
			photoCover,
			baseWidth,
			rate * logoImgInfo.height,
		);
		const maikeImg = await exchangeImg(
			maike,
			rate * maikeImgInfo.width,
			rate * maikeImgInfo.height,
		);
		const canvasDemo = document.createElement("canvas");
		const ctx = canvasDemo.getContext("2d");
		canvasDemo.width = baseWidth;
		canvasDemo.height = baseHeight;
		// 绘制底图
		ctx.drawImage(base64ImageDataImg, 0, 0);
		// 绘制logo
		ctx.drawImage(
			logoImg,
			0,
			baseHeight - logoImg.height,
			logoImg.width,
			logoImg.height,
		);
		// 绘制麦可
		ctx.drawImage(
			maikeImg,
			baseWidth - maikeImg.width,
			baseHeight - maikeImg.height - 8 * rate,
			maikeImg.width,
			maikeImg.height,
		);
		return canvasDemo.toDataURL("image/png");
	} catch (error) {
		alert("图片合成失败！");
		console.error("image mix failed: ", error);
	}
};

// 转换图片
export const exchangeImg = (url, width = "", height = "") => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		// 对于SVG图像，设置crossOrigin可能导致加载失败，除非服务器支持CORS
		img.crossOrigin = "Anonymous";
		width && (img.width = width);
		height && (img.height = height);
		img.src = url;
	});
};
