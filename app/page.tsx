import Details from "@/components/details";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="pt-10">
        <Details />
      </div>
    </>
  );
}
