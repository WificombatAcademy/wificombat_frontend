import Navbar from "./components/general/navbar";
import { Hero } from "./components/Home/hero";

export default function Home() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <Navbar />
      <Hero />
    </div>
  );
}
