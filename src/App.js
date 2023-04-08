import './App.css';
import { Auth } from './components/auth';
import { auth, db, storage } from './config/firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';



function App() {
  const [movieList, setMovieList] = useState();
  const moviesCollectionRef = collection(db,"movies");

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieRatings, setNewMovieRatings] = useState("");
  const [isNewMovieHit, setIsNewMovieHit] = useState("");

  // edit state
  const [editTitle, setEditTitle] = useState("");

  // file upload state
  const [fileUpload, setFileUpload] = useState(null);


  const getMovieList = async ()=>{
    const data = await getDocs(moviesCollectionRef);
    const dataFiltered = data.docs.map((doc)=>{
      return({...doc.data(), 
              id: doc.id})
    });
    setMovieList(dataFiltered);
    console.log(movieList)
  };

  useEffect( ()=>{

    getMovieList();
  }, []);

  // handle movie submit

 const handleNewMovieSubmit = async ()=>{
    try{
      await addDoc(moviesCollectionRef,{
        title: newMovieTitle,
        ratings: newMovieRatings,
        isHit: isNewMovieHit,
        userId: auth.currentUser.uid,
      })
      getMovieList();
   
      
    }
    catch(err){
      console.log(err);
    }
  }

  // handle movie delete
   const handleMovieDelete = async (id)=>{
    const movieDoc = doc(db,"movies",id);
    deleteDoc(movieDoc)

    getMovieList()
   }

  //  handle movie edit
const handleMovieEdit = async (id)=>{
  const movieDoc = doc(db,"movies",id);
  await updateDoc(movieDoc, {title: editTitle});

  getMovieList()
}

// handle upload file
const uploadFile = async ()=>{
  if(!fileUpload) return;
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`); 
  try{
  await uploadBytes(filesFolderRef, fileUpload);
  }
  catch(err){
    console.error(err);
  }
}

  return (
    <div className="App">
      <Auth />
      {/* create new movie form */}
      
      <div>
        <input onChange={(e)=>setNewMovieTitle(e.target.value)} placeholder='Enter new movie...' />
        <input onChange={(e)=>setNewMovieRatings(Number(e.target.value))} type="number" placeholder='ratings...' />
        <input onChange={(e)=>setIsNewMovieHit(e.target.checked)} 
        checked={isNewMovieHit}
        type="checkbox" />
        <label>Is Hit?</label>
        <button onClick={handleNewMovieSubmit}>Create Movie</button> 
      </div>
        
      {/* show movies */}
     <div>
      {movieList.map(movie=>{
        return<div> <h1 style={{color: movie.isHit?"green":"red"}}> 
        {movie.title} </h1>
        <p>ratings: {movie.ratings}</p> 
        <button onClick={()=>handleMovieDelete(movie.id)}>Delete</button>
        {/* edit title */}
        <input type='text' onChange={(e)=>setEditTitle(e.target.value)} />
        <button onClick={()=>handleMovieEdit(movie.id)}>Edit title</button>

        {/* // file upload */}
        <div> 
          {/* From the uploaded files we will get the first file for now, so thats why files[0] */}
          <input type='file' onChange={(e)=> setFileUpload(e.target.files[0])} /> 
          <button onClick={uploadFile}>Upload File</button>
        </div>


        </div>;
        
      
      })}
     </div>
    </div>
  );
}

export default App;
