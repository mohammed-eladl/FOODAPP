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
import { useNavigate } from "react-router-dom";
export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);

  const [categorisList, setCategorisList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const [nameValue, setNameValue] = useState("");
  const [categoryIdValue, setCategoryIdValue] = useState("");
  const [tagIdValue, setTagIdValue] = useState("");

  const [arryOfPages, setArryOfPages] = useState([]);

  const [recipesId, setRecipesId] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setRecipesId(id);
    setDeleteShow(true);
  };

  const getRecipesList = async (
    name,
    tagId,
    categoryId,
    pageSize,
    pageNumber
  ) => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        `${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
            tagId: tagId,
            categoryId: categoryId,
          },
        }
      );
      setArryOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(response.data.totalNumberOfPages);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
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

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value, tagIdValue, categoryIdValue);
  };

  const getTagIdValue = (tagId) => {
    setTagIdValue(tagId.target.value);
    getRecipesList(nameValue, tagId.target.value, categoryIdValue);
  };
  const getCategoryIdValue = (categoryId) => {
    setCategoryIdValue(categoryId.target.value);
    getRecipesList(nameValue, tagIdValue, categoryId.target.value);
  };

  const goToRecipeData = () => {
    navigate("/dashboard/recipeData");
  };

  const getCategorisList = async () => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        `${baseUrl}/Category/?pageSize=10&pageNumber=1`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setCategorisList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get the Tagslist of categories
  const getTagsList = async () => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        `${baseUrl}/tag`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      //   console.log(response.data);
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipesList();
    getCategorisList();
    getTagsList();
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
              onClick={() => {
                goToRecipeData();
              }}
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
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search By recipe name"
                onChange={getNameValue}
              />
            </div>

            <div className="col-md-3">
              <select className="form-control" onChange={getCategoryIdValue}>
                <option value="" disabled>
                  Search by Category
                </option>
                {categorisList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-control" onChange={getTagIdValue}>
                <option value="" disabled>
                  Search by Tag
                </option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="table-container text-center mx-4">
          {recipesList.length > 0 ? (
            <>
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
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  {arryOfPages.map((pageNum) => (
                     <li
                     className="page-item"
                     onClick={() => {
                       getRecipesList(
                         nameValue,
                         tagIdValue,
                         categoryIdValue,
                         2,
                         pageNum
                       );
                     }}
                   >
                     <a className="page-link">
                       {pageNum}
                     </a>
                   </li>
                  )
                  
                  )}

                  <li className="page-item">
                    <a className="page-link" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </>
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
