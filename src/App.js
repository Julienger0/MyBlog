import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ArticlesList from "./components/ArticlesList";
import {BrowserRouter,Route,Routes,} from 'react-router-dom';
import Article from "./components/Article";
import './style/style.css'


function App() {
  return (
    
    <BrowserRouter>
      <div className="container">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/articleslist" element={<ArticlesList />}  />
        <Route path="/article/:article_name" element={<Article/>}/>
        

        {/* <Route component={NotFoundPage} /> */}



      </Routes>
        
        
        
      </div>
    </BrowserRouter>
    );
}

export default App;
