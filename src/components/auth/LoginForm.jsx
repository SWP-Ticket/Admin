import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const data = await loginUser(values);
      console.log(data);
      const { role } = data;
      if (role === "Admin") {
        navigate("/admin/user-management");
      }
      if (role === "Staff") {
        navigate("/staff/events");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          {...register("email")}
          placeholder="Enter your email"
          className=" focus-visible:ring-slate-300 "
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className=" focus-visible:ring-slate-300 "
        />
      </div>

      <Button className="w-full" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
