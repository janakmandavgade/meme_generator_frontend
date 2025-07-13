// import { SignupForm } from "@/components/signup-form"
import { Button } from "@/components/ui/button"

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* <SignupForm /> */}
        <h1 className="text-2xl font-bold mb-6">Sign Up Not Supoorted Pls Login</h1>
          <Button variant="outline" className="w-full" asChild>
            <a href="/login">Login</a>
          </Button>
      </div>
    </div>
  )
}
