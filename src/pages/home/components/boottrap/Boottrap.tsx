import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.scss";

const Boottrap = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide carousel-container" // Add the new CSS class here
      data-ride="carousel"
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active" data-interval="3000">
            <img
              src="https://hcm.fstorage.vn/images/2024/03/rmnxwinmart_867x400-20240305103334.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-interval="3000">
            <img
              src="https://hcm.fstorage.vn/images/2024/02/new_867x400-20240229142946.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-interval="3000">
            <img
              src="https://hcm.fstorage.vn/images/2024/02/kao_banner_web_biore_867x400-2-2--20240229150231.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Boottrap;
