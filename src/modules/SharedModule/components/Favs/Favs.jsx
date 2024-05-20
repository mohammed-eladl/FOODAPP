import Header from "../Header/Header";
// @ts-ignore
import recipesImg from "../../../../assets/image/header.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../ContextApi/ContextApi";
import NoData from "../NoData/NoData";

export default function Favs() {
  const [favsList, setFavsList] = useState([]);

  const getFavsList = async () => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/userRecipe",
        `${baseUrl}/userRecipe`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setFavsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFavsList();
  }, []);
  return (
    <>
      <Header
        title={`Favs Items`}
        describeion={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={recipesImg}
      />
      <div className="container-fluid">
        <div className="row ">
          {favsList.length > 0 ? (
            <div className="col-md-4">
              <div>
                <h4>Favs</h4>
              </div>
            </div>
          ) : (
           <NoData/>
          
          )}
        </div>
      </div>
    </>
  );
}
