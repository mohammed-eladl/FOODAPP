// @ts-ignore
import noData from "../../../../assets/image/no-data.png";
export default function NoData() {
  return (
    <>
      <div className="text-center">
        <img src={noData} alt="no data" className="mb-2" />
        <h5 className="fw-bold">No Data !</h5>
        <p>
          There is no data to display.
        </p>
      </div>
    </>
  );
}
