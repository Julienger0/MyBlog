import React from "react";
import {useState,useEffect} from 'react';
import firebase from "../firebase"
import { useParams } from "react-router-dom";


function Article(){
    
    const { article_name } = useParams();
    const db=firebase.firestore()
    const [articleInfo, setArticleInfo] = useState([]);
    const [comments, setComments] = useState([]);


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
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');
    return(
        <>
            <h1>{articleInfo.titre}</h1>
            
            <p>{articleInfo.contenu}</p>

            <p>espace commentaire</p>
            {comments.filter(comment => comment.article===articleInfo.nom ).map(comment=>{ return(
                <div>
                    <p>{comment.nom}</p>
                    <p>{comment.texte}</p>                
                </div>
            
           
            )})}
        
            <p>formulaire commentaire</p>
            <form id="add-comment-form" onSubmit={writeData}>
                
                <label>
                    Name:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
                </label>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} required/>
                </label>
                <label>
                    
                <input type="submit" value="Envoyer" />

                </label>
            
            </form>
        </>
    )
}

export default Article
