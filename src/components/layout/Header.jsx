import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router";
function AccountDropDown() {
  const { t } = useTranslation();
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className="h-10 w-10 rounded-full ring-2 ring-white hover:opacity-75 cursor-pointer"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function Header() {
  return (
    <div className="w-full h-16 px-6 ">
      <div className="flex justify-end h-full items-center">
        <div className="flex gap-3 items-center ">
          <AccountDropDown />
        </div>
      </div>
    </div>
  );
}

export default Header;
