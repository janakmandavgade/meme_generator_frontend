import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="justify-center items-center text-center">Please Login or Register To Continue</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/login">Register</Link>
            {/* <p>Hallo</p> */}
          </Button>

          <Button asChild>
            <Link href="/login">Login</Link>
            {/* <p>Hallo</p> */}
          </Button>
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
