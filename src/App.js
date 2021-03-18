import React from 'react';
import axios from 'axios';
import Movie from "./Movie";

// movie compoent 구성하기 
// ES6  코스 동영상을 보자
// npm install axios (fech보다 좋아)
class App extends React.Component {
  state = {
      isLoading: true,
      movies: []

  }

  // 비동기 async + await
  // api 통해서 데이터를 얻기위해서 조금의 시간이 걸린다는 걸 알려줘야 함.
  getMovies = async () => {
    // normal javascript
    //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json")
    //console.log(movies.data.data.movies)
 
    //ㄴ>> es6 version 
    const {data: {data:{movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    this.setState({movies, isLoading: false});
    //console.log(movies)

  }
 
  componentDidMount(){
    //fetch data 
    //API로 부터 data fetching 완료되면 
    //데이터를 Render ~ 
    
    /*setTimeout(() => {
      this.setState({ isLoading: false });
    }, 6000)
    */

    //axios.get("https://yts-proxy.now.sh/list_movies.json")
    //const movies = axios.get("https://yts-proxy.now.sh/list_movies.json")
    this.getMovies();
  }

  render() {
    const {isLoading, movies} = this.state;

    //return <div>{isLoading ? "Loading....": "We are ready"}</div>;
    return (
      <div>
        {isLoading 
          ? "Loading...."
          : movies.map(movie => (
            //console.log(movie);
            //return <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} />
            <Movie key={movie.id} 
                    id={movie.id} 
                    year={movie.year} 
                    title={movie.title}
                    summary={movie.summary} 
                    poster={movie.medium_cover_image}
             />
            ))
        }
    </div>
    );
  }

}
export default App;
