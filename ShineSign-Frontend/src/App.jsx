import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditPage from "./Pages/EditPage.jsx";

export default function App () {
	return <BrowserRouter>
		<Routes>
			<Route index element={<Navigate to={"edit"} replace/>}/>
			<Route path="edit" element={<EditPage/>}/>
		</Routes>
	</BrowserRouter>;
};