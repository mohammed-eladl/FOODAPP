import Header from "../../../SharedModule/components/Header/Header";
// @ts-ignore
import recipesImg from "../../../../assets/image/header.png";
export default function RecipesList() {
  return (
    <>
      <Header
        title={`Recipes Items`}
        describeion={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={recipesImg}
      />
    </>
  );
}
