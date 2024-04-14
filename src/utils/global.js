let globalData = {
	cameraMedia: null, // 摄像头视频流
	cameraIsFront: true, // 是否是前置摄像头
	snapDataURL: "", // 截图后的图片
	templateId: "female_template1", // 模板id
};

const getGlobal = (key) => {
	return globalData[key];
};

const setGlobal = (data, value) => {
	if (typeof data === "object") {
		globalData = {
			...globalData,
			...data,
		};
	} else if (typeof data === "string") {
		globalData = {
			...globalData,
			[data]: value,
		};
	}
};

export { getGlobal, setGlobal };
