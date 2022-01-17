import React from "react";
import {useState,useEffect} from 'react';
import firebase from "../firebase"
import { useParams } from "react-router-dom";


function Article(){
    
    const { article_name } = useParams();
    const db=firebase.firestore()
    const [articleInfo, setArticleInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    const fetcharticles=async()=>{
        const articlesRef = db.collection('Articles');
        const snapshot = await articlesRef.get();
        snapshot.forEach(item=>{
           if (item.data().nom===article_name){
              setArticleInfo(item.data())             
           }          
        })
        const commentsRef = db.collection('Commentaires');
        const snapshot2 = await commentsRef.get();
        snapshot2.forEach(item=>{
            setComments((prevcomments)=>([...prevcomments,item.data()]))
            
        })
    }
    useEffect(() => {
        fetcharticles();
    }, [])

    function writeData() {
        db.collection('Commentaires').add( {
                nom: username,
                texte: commentText,
                article:articleInfo.nom,
                    
            }

        );
    }
    
    return(
        <>
            <h1 className="text-center m-4">{articleInfo.titre}</h1>
            <div className="row justify-content-md-center ">
           <div className="col-8  text-center">
            <p className="text-center">{articleInfo.contenu}</p>
            </div>

           <div className="col-8  border-top border-dark border-1 ">
            <h3 className="  mt-3 text-center">Espace Commentaire</h3>
            {comments.filter(comment => comment.article===articleInfo.nom ).map(comment=>{ return(
                <div className="m-4">
                    <p>{comment.nom}</p>
                    <p>{comment.texte}</p>                
                </div>
            
           
            )})}
            </div>
            <div className="col-8 border-top border-dark border-1 text-center">
                <h3 className="m-4">Ajouter un commentaire</h3>
                <form id="add-comment-form" onSubmit={writeData}>
                    <div className="form-floating mb-1">
                        <input type="text" className="form-control" id="floatingInput" placeholder="nom" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        <label htmlFor="floatingInput">Nom:</label>

                    </div>   
                    <div className="form-floating">
                        <textarea className="form-control" id="floatingTextarea2" placeholder="commentaire" value={commentText} onChange={(event) => setCommentText(event.target.value)} required/>         
                        <label htmlFor="floatingTextarea2">Commentaire:</label>
                        
                        <input type="submit" class="btn btn-primary" value="Envoyer" />
                    </div>
                
                
                </form>
                </div>
            </div>
        </>
    )
}

export default Article
