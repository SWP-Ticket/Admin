import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import { Tabs } from "@/components/ui/tabs";

function LoginPage({ isOpen, setOpen }) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent className="w-max">
          <DialogHeader> </DialogHeader>
          <Tabs defaultValue="account" className="min-w-[400px]">
            <Card className="border-none">
              <CardHeader className="pb-3 pt-0 px-0">
                <CardTitle className="text-4xl">Login</CardTitle>
                <CardDescription>
                  Please enter your username and password to access your
                  account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 py-0 px-0">
                <LoginForm />
              </CardContent>
            </Card>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginPage;
