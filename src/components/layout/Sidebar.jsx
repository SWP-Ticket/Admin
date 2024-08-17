import { Link, useLocation } from "react-router-dom";
import { EventOperatorLinks, AdminLinks } from "@/constants/index";

function Sidebar() {
  const location = useLocation();
  let LinkRouter = location.pathname.startsWith("/admin")
    ? AdminLinks
    : EventOperatorLinks;

  return (
    <div className="h-screen bg-white md:w-72">
      <div className="p-4 w-full flex justify-center  h-full">
        <div>
          <span className="ml-4 text-gray-600 text-sm font-medium "></span>
          <div className="mt-3 flex flex-col gap-2">
            {LinkRouter.map((item) => (
              <Link
                to={item.route}
                key={item.label}
                className={`${
                  location.pathname.startsWith(item.route)
                    ? "text-blue-700 bg-blue-100 "
                    : "text-gray-600"
                } p-4 flex gap-2 items-center text-sm  hover:text-blue-700 font-medium hover:bg-blue-50 rounded-md`}
              >
                <span>{item.icon}</span>

                <span className="hidden md:block">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
