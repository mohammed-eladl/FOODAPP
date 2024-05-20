import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../ContextApi/ContextApi";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
export default function RecipeData() {
  const navigate = useNavigate();

  const [categorisList, setCategorisList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get the list of categories
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

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };
  const onSubmit = async (data) => {
    let recipeFormData = appendToFormData(data);
    console.log(data);
    try {
      let response = await axios.post(
        // "https://upskilling-egypt.com:3006/api/v1/Recipe"
        `${baseUrl}/Recipe`,
        recipeFormData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Tmamm", response.data.message);
      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error("mesh Tmamm", error.data.message);
    }
  };

  useEffect(() => {
    getCategorisList();
    getTagsList();
  }, []);
  return (
    <>
      <RecipesListHeader />
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="input-group mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              {...register("name", {
                required: "name is required",
              })}
            />
          </div>
          {errors.name && (
            <p className="alert alert-danger p-2">{errors.name.message}</p>
          )}

          {/* Tag */}

          <div className="input-group mb-1">
            <select
              className="form-control"
              {...register("tagId", {
                required: "Select Tag is required",
              })}
            >
              <option value="">Tag</option>

              {tagsList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {errors.tagId && (
            <p className="alert alert-danger p-2">{errors.tagId.message}</p>
          )}

          {/* price */}
          <div className="input-group mb-1">
            <input
              type="number"
              className="form-control"
              placeholder="Recipe Price"
              {...register("price", {
                required: "Recipe Price is required",
              })}
            />
          </div>
          {errors.price && (
            <p className="alert alert-danger p-2">{errors.price.message}</p>
          )}

          {/* Select Option */}
          <div className="input-group mb-1">
            <select
              className="form-control"
              {...register("categoriesIds", {
                required: "Select Category is required",
              })}
            >
              <option value="">Category</option>

              {categorisList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {errors.categoriesIds && (
            <p className="alert alert-danger p-2">
              {errors.categoriesIds.message}
            </p>
          )}
          {/* TextArea */}
          <div className="input-group mb-1">
            <textarea
              className="form-control"
              placeholder="Recipe description"
              {...register("description", {
                required: "description is required",
              })}
            />
          </div>
          {errors.description && (
            <p className="alert alert-danger p-2">
              {errors.description.message}
            </p>
          )}

          {/* Image */}
          <div className="input-group mb-1">
           


            <input
              type="file"
              className="form-control"
              placeholder="recipe Image "
              {...register("recipeImage", {
                required: "recipeImage is required",
              })}
            />

           
          </div>
          {errors.recipeImage && (
            <p className="alert alert-danger p-2">
              {errors.recipeImage.message}
            </p>
          )}






















          <button
            className="btn"
            style={{
              border: "none",
              backgroundColor: "#009247",
              color: "#fff",
              fontWeight: "500",
              width: "20%",
              margin:"10px auto"
            }}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
