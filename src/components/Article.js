import React from "react";
import {useState,useEffect} from 'react';
import firebase from "../firebase"


function Article({match}){
    

    const db=firebase.firestore()
    const [articleInfo, setArticleInfo] = useState([]);
    const [comments, setComments] = useState([]);


    const fetcharticles=async()=>{
        const articlesRef = db.collection('Articles');
        const snapshot = await articlesRef.get();
        snapshot.forEach(item=>{
           if (item.data().nom==='article2'){
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


//     const res =(nomForm,textForm,articleInfo)=>{  db.collection('Comments').add({
//     nom: nomForm,
//     texte: textForm,
//     article: articleInfo
// })};
    function writeData() {
        firebase.database().ref("Comments").set( {
                Email: document.getElementById("help").value,
                Price: document.getElementById("price1").value,
                Desc: document.getElementById("Pdesc").value,
            }

        );
    }
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
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter Product name
                    <input type="text" class="form-control" id="help" aria-describedby="emailHelp"/>
                    </label>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Product Price
                    <input type="number" class="form-control" id="price1"/>
                    </label>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Product description
                    <input type="text" class="form-control" id="Pdesc"/>
                    </label>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" id="upProgess" class="form-label">Upload a file
                    <input type="file" class="form-control" id="namebox"/>
                    </label>
                </div>
                <button type="submit" onclick="writeData()" class="btn btn-lg btn-success">Upload</button>
        </form>

        </>
    )
}

export default Article