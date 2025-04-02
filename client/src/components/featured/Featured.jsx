import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/hostel/countByGender?gender=Boys,Girls`);

  return (
    <div className="featured">
      {!data ? (
        "Loading please wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="university-friends-walking-on-the-street.jpeg"
              alt="Boys Hostel"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Boys Hostel</h1>
              <h2>{data[0] ?? 0} properties</h2> 
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="adult-student-in-library-stock-photo.jpeg"
              alt="Girls Hostel"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Girls Hostel</h1>
              <h2>{data[1] ?? 0} properties</h2> 
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
