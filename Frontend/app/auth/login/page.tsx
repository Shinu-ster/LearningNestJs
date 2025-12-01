import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="Enter your email" className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" placeholder="Enter your password" className="rounded-xl" />
          </div>

          <Button className="w-full mt-2 rounded-xl" variant="default">Login</Button>

          <div className="text-center mt-4">
            <Link href="/change-password" className="text-sm text-blue-600 hover:underline">
              Change Password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
