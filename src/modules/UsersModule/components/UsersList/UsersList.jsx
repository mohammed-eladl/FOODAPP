import Header from "../../../SharedModule/components/Header/Header";
// @ts-ignore
import recipesImg from "../../../../assets/image/header.png";
export default function UsersList() {
  return (
    <>
    <Header
      title={`User List`}
      describeion={`This is a welcoming screen for the entry of the application , you
            can now see the options`}
      imgUrl={recipesImg}
    />
  </>
  )
}
