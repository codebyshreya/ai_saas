import { Button } from "@/components/ui/button";
import  Link  from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <h1>Landing page</h1>
      <Link href="/sign-in"><Button>Login</Button></Link>
      <Link href="/sign-up"><Button>Sign-up</Button></Link>
    </div>
  );
}
