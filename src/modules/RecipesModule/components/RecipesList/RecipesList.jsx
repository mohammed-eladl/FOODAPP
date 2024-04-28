import Header from "../../../SharedModule/components/Header/Header";
// @ts-ignore
import recipesImg from "../../../../assets/image/header.png";
import { baseUrl } from "../../../ContextApi/ContextApi";
import NoData from "../../../SharedModule/components/NoData/NoData";
// @ts-ignore
import noImgRecipes from "../../../../assets/image/male_avatar.svg";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Button } from "react-bootstrap";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);



  const [recipesId, setRecipesId] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setRecipesId(id);
    setDeleteShow(true);
  };

  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        // "https://upskilling-egypt.com:3006/api/v1/Recipe/id",
        `${baseUrl}/Recipe/${recipesId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteClose();
      getRecipesList();
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipesList = async () => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        `${baseUrl}/Recipe/?pageSize=10&pageNumber=1`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipesList();
  }, []);
  return (
    <>
      <Header
        title={`Recipes Items`}
        describeion={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={recipesImg}
      />

      

      {/* Table recipes */}
      <div className="container-fluid p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4>Recipes Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6 d-flex justify-content-end p-0 ">
            <button
              style={{
                backgroundColor: "#009247",
                color: "#fff",
                fontWeight: "500",
              }}
              className="btn"
            >
              Add New Recipes
            </button>
          </div>
        </div>

        <div className="table-container text-center mx-4">
          {recipesList.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Image </th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  {/* <th scope="col">Category</th> */}
                  <th scope="col">Tag</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {recipesList.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      {item.imagePath ? (
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                          src={
                            "https://upskilling-egypt.com:3006/" +
                            item.imagePath
                          }
                          alt={item.name}
                        />
                      ) : (
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                          src={noImgRecipes}
                          alt={item.name}
                        />
                      )}
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    {/* <td>{item.category[0].name}</td> */}
                    <td>{item.tag.name}</td>
                    <td>
                      <i
                        className="fa fa-edit text-warning mx-2"
                        aria-hidden="true"
                      ></i>

                      <i
                        onClick={() => handleDeleteShow(item.id)}
                        className="fa fa-trash text-danger mx-2"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>


      {/* For Delete Recipe */}
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Recipe</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Recipe"} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger fw-bold" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
