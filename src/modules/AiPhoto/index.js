import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../../component/Stars";
import { mixImg } from "../../utils";
import axiosInstance from "../../utils/axios";
import { getGlobal } from "../../utils/global";
import generating from "../../assets/generating.png";
import "./index.css";

const Photo = () => {
	const navigate = useNavigate();
	const [activeVersion, setActiveVersion] = useState(null);
	const [versionList, setVersionList] = useState([
		{
			type: 0,
			versionName: "Realistic Version",
			img: generating,
			ready: false,
		},
		{
			type: 1,
			versionName: "Comic Version",
			img: generating,
			ready: false,
		},
	]);

	useEffect(() => {
		if (!getGlobal("snapDataURL") || !getGlobal("templateId")) {
			console.error("snapDataURL or templateId is empty!");
			navigate("/error");
			return;
		}

		// 发送真实照片请求获取图片
		const controller = new AbortController();
		axiosInstance
			.post(
				"/mic-mamian/mamian",
				{
					template: getGlobal("templateId"),
					image: getGlobal("snapDataURL").replace(
						/^data:image\/[a-z]+;base64,/,
						"",
					),
				},
				{
					signal: controller.signal,
				},
			)
			.then((res) => {
				const { status, data } = res;
				if (status === 200 && data) {
					const { xieshi_image, dongman_image } = data;

					if (!xieshi_image || !dongman_image) {
						// 写实照和动漫照 至少一个失败了
						console.error("image generating failed!");
						navigate("/error");
					} else {
						// 写实照和动漫照 都成功
						setVersionList([
							{
								type: 0,
								versionName: "Realistic Version",
								img: xieshi_image
									? `data:image/png;base64,${xieshi_image}`
									: "",
								ready: !!xieshi_image,
							},
							{
								type: 1,
								versionName: "Comic Version",
								img: dongman_image
									? `data:image/png;base64,${dongman_image}`
									: "",
								ready: !!dongman_image,
							},
						]);
					}
				} else {
					console.error("response status_code error!");
					navigate("/error");
				}
			})
			.catch((error) => {
				if (error?.code === "ERR_CANCELED") {
					console.error("request voluntary canceled: ", error);
				} else {
					console.error("request error: ", error);
					navigate("/error");
				}
			});

		return () => {
			// 页面卸载时，取消请求
			controller.abort();
		};
	}, [navigate]);

	return (
		<>
			<div className="ai-photo">
				<p className="ai-photo-title">Please select a photo to print</p>
				<div className="ai-photo-container">
					{versionList.map((item) => (
						<div
							className={`ai-photo-content ${
								item.ready ? "ready" : "noReady"
							} ${item.img ? "" : "failed"} ${
								item.type === activeVersion ? "checked" : ""
							}`}
							onClick={() => {
								if (!item.ready) return;
								setActiveVersion(item.type);
							}}
							key={item.type}
						>
							<div className="photo">
								<div className="version-img">
									<span className="ai-img-loading-outter">
										<span className="ai-img-loading"></span>
									</span>
									<span className="ai-img-txt">
										Crafting your photo magic! Hang tight, a
										dazzling display is just moments away.
									</span>
									<img
										/* 这里应该是 item.img || 报错图片，但是没必要了，直接到 error 页了 */
										src={item.img || generating}
										alt={`version_${item.type}`}
									/>
								</div>
								<div className="version-other">
									<span
										className={`check-input ${
											item.type === activeVersion
												? "checked"
												: ""
										}`}
									></span>
									{item.versionName}
								</div>
							</div>
							<div className="photo-shadow"></div>
						</div>
					))}
				</div>
				<div className="ai-photo-footer">
					<button
						type="button"
						className="common-transparent-btn"
						onClick={() => {
							navigate("/template");
						}}
					>
						Take another one
					</button>
					<button
						type="button"
						className={`print-photo-btn common-red-btn ${
							activeVersion === null ? "disabled" : ""
						}`}
						disabled={activeVersion === null}
						onClick={async () => {
							try {
								if (activeVersion === null) return;
								const base64 = await mixImg(
									versionList[activeVersion].img,
									840,
									1200,
								);
								document.getElementById("print-img").src =
									base64;
								document.getElementById("print-img").onload =
									() => {
										window.print();
									};
							} catch (err) {
								console.error("print error: ", err);
							}
						}}
					>
						Print
					</button>
				</div>
			</div>
			<Stars />
		</>
	);
};

export default Photo;
