import FixedNav from "./fixed-nav";
import StaticNav from "./static-nav";

export const GeneralNavbar = () => {

  return (
    <div>
      <StaticNav />
      <FixedNav />
    </div>
  );
};