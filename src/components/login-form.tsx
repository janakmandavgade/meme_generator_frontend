import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { redirect } from "next/navigation";
// import { AuthError } from "next-auth";
// import { error } from "console";
// import { GoogleLoginButton } from "@/components/login_with_google_button";
import { signIn } from "@/app/auth";
// import { useState } from "react"
// import { signIn } from "next-auth/react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form
            action={async (formData) => {

                                          "use server";
  
                                          const { email, password } = Object.fromEntries(formData.entries()) as {
                                            email: string;
                                            password: string;
                                          };

                                          try {
                                            const result = await signIn("credentials", {
                                              email,
                                              password,
                                              redirect: false,
                                            });

                                            console.log("SignIn result:", result);

                                            if (result?.error) {
                                              console.log("Auth error:", result.error);
                                              redirect("/login?error=invalid-credentials");
                                            }
                                            
                                            // Success case
                                            redirect("/welcome");
                                          } catch (error) {
                                            console.log("Caught error:", error);
                                            // Only redirect on actual errors, not NEXT_REDIRECT
                                            if (error?.message?.includes('NEXT_REDIRECT')) {
                                              throw error; // Re-throw redirect errors
                                            }
                                            redirect("/login?error=invalid-credentials");
                                          }
                                        }}
                                                                              >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email Id Here"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password Here"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                </div>
              </div>
            </form> */}
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
              Login with Google
            </Button>
            {/* <GoogleLoginButton /> */}
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          
        </CardContent>
      </Card>
    </div>
  );
}
