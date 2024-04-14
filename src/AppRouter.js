import { HashRouter, Routes, Route } from "react-router-dom";
import Template from "./modules/Template";
import Camera from "./modules/Camera";
import Photo from "./modules/Photo";
import AiPhoto from "./modules/AiPhoto";
import Error from "./modules/Error";

function AppRouter() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					{/* 模板选择 */}
					<Route
						path="template"
						caseSensitive={true}
						element={<Template />}
					/>
					{/* 摄像头拍照 */}
					<Route
						path="camera"
						caseSensitive={true}
						element={<Camera />}
					/>
					{/* 照片 */}
					<Route
						path="photo"
						caseSensitive={true}
						element={<Photo />}
					/>
					{/* ai照片 */}
					<Route
						path="aiPhoto"
						caseSensitive={true}
						element={<AiPhoto />}
					/>
					{/* 异常 */}
					<Route
						path="error"
						caseSensitive={true}
						element={<Error />}
					/>
					<Route
						path=""
						caseSensitive={true}
						element={<Template />}
					/>
					<Route
						path="*"
						caseSensitive={true}
						element={<Template />}
					/>
				</Route>
			</Routes>
		</HashRouter>
	);
}
export default AppRouter;
