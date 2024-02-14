import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-white.png";
import useMediaQuery from "../Hooks/useMediaQuery";
import { IoIosClose } from "react-icons/io";
import { useUser } from "../Context/UserContext";

const SideBarNav = ({ isOpen, setIsOpen }) => {
	const navigate = useNavigate();
	const { logoutUser, user } = useUser();

	const isAboveSmallScenes = useMediaQuery("(min-width:768px)");
	const [showside, setShowSide] = useState(true);
	const { pathname } = useLocation();
	const navLinkStyle = ({ isActive }) => {
		return {
			background: isActive ? "#0057AE " : "",
			color: isActive ? "#fafafa" : "#111111",
			borderRadius: isActive ? "0.125rem " : "",
		};
	};
	return (
		<aside
			className={`${
				isOpen ? "" : "hidden "
			}sticky md:block  md:me-2  z-100 first-letter:sticky top-0 self-start min-h-screen md:col-span-2 col-span-8 bg-[rgb(4,47,4,0.90)]`}>
			<div className="h-screen flex flex-col min-w-[12vw]">
				<div
					className={`flex  align-top ${
						!isAboveSmallScenes ? "justify-between" : "justify-center h-[20vh]"
					}`}>
					<div className="flex justify-center flex-1 my-3 text-white ">
						<div className="flex w-full my-1 text-black">
							<div onClick={() => navigate("")} className="cursor-pointer">
								<img src={Logo} className="block w-20 h-20" />
							</div>
						</div>
					</div>
					{!isAboveSmallScenes && (
						<div>
							<button
								className="p-2 mt-2 text-gray-900 hover:text-gray-600"
								onClick={() => {
									setIsOpen(false);
									setShowSide(false);
								}}>
								<IoIosClose className="w-6 h-6 text-slate-400" />
							</button>
						</div>
					)}
				</div>

				<div className="mb-2 h-[80vh]">
					<ul>
						<li>
							<NavLink
								style={
									pathname.includes("/admin") && !pathname.includes("/products")
										? navLinkStyle
										: { color: "#111111" }
								}
								className="flex items-center p-2 "
								onClick={() => (!isAboveSmallScenes ? setIsOpen(false) : null)}
								to="">
								{({ isActive }) => (
									<React.Fragment>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className={`${
												isActive &&
												pathname.includes("/admin") &&
												!pathname.includes("/products")
													? "text-white"
													: "text-gray-900"
											} w-5 h-5`}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
											/>
										</svg>
										<span className="text-xs ps-2">Plots</span>
									</React.Fragment>
								)}
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="h-[20vh] bg-slate-900 p-2">
					<p to="user" className="flex items-center px-4 py-2 text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="block w-4 h-4 ">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>

						<p className="px-1 text-xs font-medium">{user.fullname}</p>
					</p>
					<Link
						to=""
						className="flex items-center px-4 py-2 rounded-md "
						onClick={() => {
							logoutUser();
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-4 h-4 text-white">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
						<span className="px-1 text-xs text-white align-middle">Logout</span>
					</Link>
				</div>
			</div>
		</aside>
	);
};

export default SideBarNav;
