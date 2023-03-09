import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import users from "../assets/carousel/img.png";
import { data } from "../utils/constants";
import { BsArrowDownCircleFill } from "react-icons/bs";

function getOffsets(
	position: number,
	width: number,
	height: number
): { x: number; y: number } {
	switch (position) {
		case 0:
			return {
				x: 0,
				y: -height / 2,
			};
		case 1:
			return {
				x: width / (2 * Math.sqrt(2)),
				y: -height / (2 * Math.sqrt(2)),
			};
		case 2:
			return {
				x: width / 2,
				y: 0,
			};
		case 3:
			return {
				x: width / (2 * Math.sqrt(2)),
				y: height / (2 * Math.sqrt(2)),
			};
		case 4:
			return {
				x: 0,
				y: height / 2,
			};
		case 5:
			return {
				x: -width / (2 * Math.sqrt(2)),
				y: height / (2 * Math.sqrt(2)),
			};
		case 6:
			return {
				x: -width / 2,
				y: 0,
			};
		case 7:
			return {
				x: -width / (2 * Math.sqrt(2)),
				y: -height / (2 * Math.sqrt(2)),
			};
	}

	return {
		x: 0,
		y: 0,
	};
}

function UserCarousel({
	current,
	setCurrent,
}: {
	current: number;
	setCurrent: (current: any) => number;
}) {
	const ref = useRef(null);
	const [size, setSize] = React.useState({ width: 0, height: 0, x: 0, y: 0 });

	useEffect(() => {
		if (ref.current) {
			const element: HTMLElement = ref.current;
			const { width, height, x, y } = element.getBoundingClientRect();
			console.log(width, height, x, y);
			setSize({ width, height, x, y });
		}
	}, [ref]);

	console.log(current);

	return (
		<AnimatePresence>
			<React.Fragment>
				<motion.div
					className="bg-primary/40 absolute"
					initial={{
						x: "0vw",
						width: "100vw",
						height: "100vh",
						zIndex: 0,
					}}
					id="clip"
				/>
				<motion.div
					className="bg-white absolute"
					initial={{
						x: "00vw",
						width: "100vw",
						height: "100vw",
						WebkitMaskImage: `radial-gradient(circle 60px at 1000px -150px, transparent 0, transparent 600px, black 81px)`,
						zIndex: 2,
					}}
					id="mask"
				/>
				<motion.div
					initial={{
						zIndex: -1,
					}}
					animate={{
						transformOrigin: `${size.x + size.width / 2}px ${
							size.y + size.height / 2
						}px`,
						rotate: current * -45,
					}}>
					<motion.div
						ref={ref}
						className="absolute rounded-full border-2 bg-transparent border-primary border-dotted"
						initial={{
							x: "45vw",
							y: "4vw",
							width: "45vw",
							height: "45vw",
							scale: 0.9,
						}}
					/>
					{data.map((user, i) => (
						<motion.img
							src={user.image}
							alt={user.name}
							style={{
								position: "absolute",
								width: `${size.width / 4}px`,
								height: `${size.width / 4}px`,
								top: `${
									size.y +
									size.height / 2 -
									size.width / 8 +
									getOffsets(i, size.width, size.height).y
								}px`,
								left: `${
									size.x +
									size.width / 2 -
									size.width / 8 +
									getOffsets(i, size.width, size.height).x
								}px`,
								rotate: current * 45,
							}}
						/>
					))}
				</motion.div>
				<motion.img
					key={current}
					className="absolute"
					initial={{
						opacity: 0,
						rotate: 45,
						scale: 0,
						width: 300,
						height: 300,
						x: size.x + 150,
						y: size.y + 150,
					}}
					animate={{
						scale: 1,
						rotate: 0,
						opacity: 1,
						width: 300,
						height: 300,
						x: size.x + 150,
						y: size.y + 150,
						marginTop: 20,
						zIndex: 3,
						position: "absolute",
					}}
					exit={{
						opacity: 0,
						rotate: 45,
						scale: 1.5,
					}}
					src={data[current].image}
				/>

				<motion.h1
					key={current}
					initial={{
						opacity: 0,
						x: size.x + 300,
						y: size.y + 480,
						width: 300,
					}}
					animate={{
						width: 300,
						x: size.x + 150,
						y: size.y + 480,
						marginTop: 20,
						zIndex: 3,
						position: "absolute",
						opacity: 1,
					}}
					exit={{
						opacity: 0,
						x: size.x + 0,
						y: size.y + 480,
					}}
					className="text-2xl font-bold text-center bg-primary/40 p-4 rounded-xl">
					{data[current].name}
				</motion.h1>
				{/* <img src={data[0].image} alt={data[0].name} /> */}
				<div>
					<button
						className="absolute"
						style={{
							left: size.x,
							top: size.y + size.height / 1.5 + 50,
							zIndex: 2,
						}}
						title="Previous">
						<BsArrowDownCircleFill
							className="w-10 h-10 text-primary"
							onClick={() => {
								console.log("clicked");
								setCurrent(
									(current: number) => (current - 1 + data.length) % data.length
								);
							}}
						/>
					</button>
					<button
						className="absolute"
						style={{
							left: size.x + size.width,
							top: size.y + size.height / 1.5 + 50,
							zIndex: 2,
						}}
						onClick={() => {
							console.log("clicked");
							setCurrent(
								(current: number) => (current + 1 + data.length) % data.length
							);
						}}
						title="Next">
						<BsArrowDownCircleFill className="w-10 h-10 rotate-180 text-primary" />
					</button>
				</div>
			</React.Fragment>
		</AnimatePresence>
	);
}

export default UserCarousel;
