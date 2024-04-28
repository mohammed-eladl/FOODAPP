// @ts-ignore
import noData from "../../../../assets/image/no-data.png";
export default function DeleteData({ deleteItem }) {
  return (
    <>
      <div className="my-3 mx-5">
        <div className="text-center">
          <img src={noData} alt="" />
          <h5 className="fw-bold mt-2">Delete This {deleteItem} ?</h5>
          <p>are you sure you want to delete this item ?</p>
          <p>if you are sure just click on delete it</p>
        </div>
       
      </div>
    </>
  );
}
