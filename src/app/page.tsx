// import Login  from "@/app/login/page";
// import Signup from "@/app/signup/page";
import LandingPage from "@/app/Hero";


export default function Home() {
  return (
    <div>
      {/* <p>Hello World</p>
       */}
       {/* <Login /> */}
       {/* <Signup /> */}
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LandingPage />
        </div>
      </div>
    </div>
  );
}
