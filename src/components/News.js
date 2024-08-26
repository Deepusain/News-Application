import React,{ useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
// import  from "react";

const News=(props)=>{
   const [articles,setArticles]= useState([]);
   const [loading,setLoading]= useState(true);
   const [page,setPage]= useState(1);
   const [totalResults,setTotalResults]= useState(0);


   const capitalizedFiestLetter =(string)=> {
  return string.charAt(0).toUpperCase()+string.slice(1);
  }
 
  
  const updateNews=async()=> {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${ props.apiKey}&page=${page}&pageSize=${ props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }


  useEffect(() => {
   updateNews();
   // eslint-disable-next-line
  },[])
  
  const fetchMoreData=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${ props.apiKey}&page=${ page+1}&pageSize=${ props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  
    return (
      < >
        <h2
          className={`d-flex justify-content-center mb-5  p-3 bg-danger text-${
             props.mode === "dark" ? "white" : "black"
          }`} style={{marginTop:'90px'}}
        >
          PigeoNews  - Top { capitalizedFiestLetter( props.category)} Headlines
        </h2>
        { loading && <Loading />}
        <InfiniteScroll
          dataLength={ articles.length}
          next={fetchMoreData}
          hasMore={ articles.length!==totalResults}
          loader= { loading && <Loading/>}
        >
        <div className="container">
        <div className="row">
          {
             articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url} >
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 44)
                        : "Title is not available"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 54)
                        : "description is not available"
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://thorntons-investments.co.uk/wp-content/uploads/2017/08/400x200.png"
                    }
                    newsUrl={element.url}
                    modes={ props.mode}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div> 
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
 