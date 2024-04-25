

export default function Header({ title, describeion, imgUrl }) {
  return (
    <div className="container-fluid p-5 header-container">
      <div className="row align-items-center">
        <div className="col-md-8">
          <div className="content">
            <h2>{title}</h2>
            <p>
            {describeion}
            </p>
          </div>

          
        </div>
        <div className="col-md-4">
            <div className="content text-center">
              <img src={imgUrl} />
            </div>
          </div>
      </div>
    </div>
  );
}
