import React from "react";
import { motion } from "framer-motion";
import starSvg from "../assets/star.svg";
import { data } from "../utils/constants";

function UserInfo({ current }: { current: number }) {
	const variants = {
		hidden: {
			opacity: 0,
			y: -10,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<motion.div
			className="absolute w-1/3 h-screen flex flex-col gap-1"
			initial={{
				paddingTop: "12%",
				x: "15%",
				zIndex: 3,
			}}>
			<h1 className="text-4xl font-bold text-primary pb-5">
				{data[current].stars}
			</h1>
			<motion.div
				className="flex pb-5"
				animate={{
					width: data[current].stars * 22,
					overflow: "hidden",
					display: "inline-flex",
				}}>
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<img className="w-6 h-6" src={starSvg} alt="star" key={i} />
					))}
			</motion.div>
			<motion.h1
				key={current}
				className="text-3xl font-bold"
				variants={variants}
				initial="hidden"
				animate="visible"
				exit="hidden">
				{data[current].name}
			</motion.h1>
			<motion.p
				key={data[current].designation}
				className="text-xl font-semibold"
				variants={variants}
				initial="hidden"
				animate="visible"
				exit="hidden">
				{data[current].designation}
			</motion.p>
			<motion.p
				className="pt-8 text-justify"
				key={data[current].bio}
				variants={variants}
				initial="hidden"
				animate="visible"
				exit="hidden">
				{data[current].bio}
			</motion.p>
			<button
				className="w-1/2 p-3 mt-5 bg-primary text-white text-lg shadow-2xl shadow-primary/40
			hover:bg-primary/80 transition-all
			">
				Book a session
			</button>
		</motion.div>
	);
}

export default UserInfo;
