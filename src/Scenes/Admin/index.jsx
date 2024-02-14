//jshint esversion:9

import { Outlet, useNavigate } from "react-router-dom";
import SideBarNav from "../../Shared/SideBarNav";
import TopBar from "../../Shared/TopBar";
import { useEffect, useState } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { useUser } from "../../Context/UserContext";

function Admin() {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useUser();
	const navigate = useNavigate();
	const isAboveSmallScenes = useMediaQuery("(min-width:768px)");

	useEffect(() => {
		if (!user) {
			navigate("");
		}
	}, [user]);

	return (
		<div className="relative grid-cols-8 md:grid w-100 bg-login-bg">
			<SideBarNav isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="col-span-8 md:col-span-6 ">
				<div
					className={`${
						isOpen ? " hidden " : " "
					} min-h-screen  p-0 bg-[rgb(255,255,255,0.5)]`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Admin;

// import { Outlet } from "react-router-dom";
// import SideBarNav from "../../Shared/SideBarNav";
// import TopBar from "../../Shared/TopBar";
// import { useState } from "react";

// function Admin() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative grid grid-cols-8 w-100 ">
//       <SideBarNav isOpen={isOpen} setIsOpen={setIsOpen} />
//       {/* ... existing code ... */}
//       <TopBar setShowSide={setIsOpen} />
//     </div>
//   );
// }

// export default Admin;
