import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RecipesListHeader() {
  const navigate = useNavigate();
  const goToRecipesList = () => {
    navigate("/dashboard/recipes");
  };

  return (
    <>
      <div className="recipeheader-container p-5 m-3">
        <div className="row">
          <div className="col-md-6">
            <h2 className="fw=bold">
              Fill The <span style={{ color: "#009247" }}>Recipes</span> !
            </h2>
            <p className="fw-bold">
              you can now fill the meals easily using the table and form ,<br />{" "}
              click here and sill it with the table !
            </p>
          </div>
          <div className="col-md-6 text-end align-items-center ">
            <Button
              onClick={() => {
                goToRecipesList();
              }}
              style={{
                border: "none",
                backgroundColor: "#009247",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              All Recipes <i className="fa fa-arrow-right"></i>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
