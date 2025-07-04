import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/app/auth";
import { signupAction } from "@/app/lib/signUpAction";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>SignUp to your account</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={signupAction}
            >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                {/* <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div> */}
                <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Enter Password Here"
                required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    "use server";
                    await signIn("google", {
                      redirect: true,
                      redirectTo: "/welcome",
                    });
                  }}>
                  Sign In with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log In
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
