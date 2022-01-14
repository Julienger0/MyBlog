import React from "react";
import firebase from "../firebase"
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

function ArticlesList(){

    const db=firebase.firestore()
    const [articles,setArticles]=useState([])

    const fetcharticles=async()=>{
        // const response=db.collection('Articles');
        // const data=await response.get();
        // data.docs.forEach(item=>{
        // setArticles((prevarticle)=>([...prevarticle,item.data()]))
        const articlesRef = db.collection('Articles');
        const snapshot = await articlesRef.get();
        snapshot.forEach(item=>{
           setArticles((prevarticle)=>([...prevarticle,item.data()]));
        })
        
        // })
    }
    useEffect(() => {
        fetcharticles();
    }, [])
    // console.log(articles )
  return (
      
    <div className="App">
      {
      articles.map(article=>{ return(
           <>
           <Link key={article.id} to={`/article/${article.nom}`}><h1>{article.titre}</h1>         
            <p>{article.contenu.substring(0, 150)}...</p>
            </Link>  
           </>

       )
          
        })
      }
    </div>
  );
}

export default ArticlesList