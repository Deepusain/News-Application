import React from "react";

const NewsItem =(props)=> {
    let { title, description, imgUrl, newsUrl, author, date,source } =  props;
    return (
      <div className="my-3 ">
        <div
          className="card border border-2 border-secondary"
          style={{ width: "26rem", height: "32rem" }}
        >
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" >
                 {source}
              </span>
          <img
            src={imgUrl}
            className="card-img-top"
            style={{ height: "250px" }}
            alt="..."
          />
          <div
            className="card-body "
            style={{
              backgroundColor:  props.modes === "light" ? "white" : "black",
              color:  props.modes === "dark" ? "white" : "black",
            }}
          >
            <h5 className="card-title">
              {title}...{" "}
              
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="fw-bold fst-italic">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary d-flex justify-content-center mt-4"
            >
              Read More!
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
