import { useState } from "react";
import UserCarousel from "./components/Carousel";
import UserInfo from "./components/Info";
import "./index.css";
import { motion } from "framer-motion";

function App() {
	const [current, setCurrent] = useState(0);

	return (
		<div
			className="font-poppins
      h-screen w-screen overflow-hidden relative
    ">
			<UserInfo current={current} />
			<UserCarousel current={current} setCurrent={setCurrent as any} />
		</div>
	);
}

export default App;
