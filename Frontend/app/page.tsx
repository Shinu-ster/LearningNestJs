import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Input type={"email"} placeholder="Email" />
      <Button variant={"outline"}>Button</Button>
    </div>
  );
}
