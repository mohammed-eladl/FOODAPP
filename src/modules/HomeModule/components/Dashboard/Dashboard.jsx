import Header from "../../../SharedModule/components/Header/Header";
// @ts-ignore
import headerImg from "../../../../assets/image/home-avatar1.svg";
export default function Dashboard() {
  return (
    <>
      <Header
        title={`Welcome Upskilling !`}
        describeion={`This is a welcoming screen for the entry of the application , you
              can now see the options`}
        imgUrl={headerImg}
      />
    </>
  );
}
