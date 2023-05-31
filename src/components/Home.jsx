import React, { useEffect, useState } from 'react'
import $ from "jquery"
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {


    

let [notes , setNotes] = useState([])
const [note , setNote] = useState({
    title : "", 
    desc : "", 
    id : Math.random()
})

useEffect(()=>{
    setTimeout(() => {
        let notesDiv = document.querySelectorAll(".note ") ; 
        var arabic = /[\u0600-\u06FF]/;
        for(let i =0 ; i< notesDiv.length ; i++){
           if(arabic.test(notesDiv[i].textContent)){
            notesDiv[i].setAttribute("dir" , "rtl");
            notesDiv[i].style.textAlign = "right";
            notesDiv[i].style.fontFamily = "El Messiri";
           }
        }
    }, 0);
} , [note])

useEffect(()=>{
    if(notes.length === 0){
        $(".notes-parent").addClass("notesParent-postioned");
    }else{
        $(".notes-parent").removeClass("notesParent-postioned");
    }

} , [notes])





  useEffect(()=>{
    if(localStorage.getItem("notes")){
        setNotes(JSON.parse(localStorage.getItem("notes")))
       
    }else {
        setNotes([])
    }
  } , [])


   
function handleInputChange ({target}){
   setNote({...note , [target.name] : target.value  }  )
}


let mynotes ;

const addNote = () => {
    if($(".modal-body textarea").val() !== ""){
    mynotes = JSON.parse(localStorage.getItem('notes')) || [];
    mynotes.push(note)  ;
    setNotes(mynotes);
    localStorage.setItem('notes', JSON.stringify(mynotes));
    setNote({
        title : "", 
        desc : "", 
        id : Math.random()
    });
    toast.success('Added successfully', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }else{
        alertify.alert('Alert','You should enter the note content');
    }
  };


  function deleteNote(noteId) {
    alertify.confirm(   "Delete Note", 
    "Are you sure you want to delete this note?", function(){
       let newNotes = notes.filter((note)=>  {
        return note.id !== noteId
       })
       notes = [...newNotes];
       setNotes(notes);
       localStorage.setItem('notes', JSON.stringify(notes));
        toast.success('Deleted successfully', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }, function(){});
}

function DeleteAll(){
    alertify.confirm(   "Delete all notes", 
    "Are you sure you want to delete all notes ?", function(){
        setNotes([]);
        localStorage.removeItem("notes");
        toast.success('All deleted successfully', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }, function(){});

}


function showUpdateBox (noteId){
       let newNote = notes.filter((note)=>  {
        return note.id === noteId
       })
       localStorage.setItem("noteId" , JSON.stringify(noteId))
       $(".modal-body input").val(newNote[0].title)
       $(".modal-body textarea").val(newNote[0].desc) 
}

function updateNote(){ 
    let noteId = JSON.parse(localStorage.getItem("noteId"));
    let allNotes = JSON.parse(localStorage.getItem("notes")) ;
     let updatedNote =   allNotes.filter((note)=> {
        return note.id === noteId
    })
    updatedNote[0].title = $(".modal-body input").val();
    updatedNote[0].desc = $(".modal-body textarea").val();
    localStorage.setItem("notes" , JSON.stringify(allNotes));
    setNotes(allNotes)
    toast.success('Updated successfully', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    $(".modal-body input").val("")
    $(".modal-body textarea").val("") 
}


useEffect(()=>{
    $(".add").click(function(){
        $(".modal-body input").val("")
        $(".modal-body textarea").val("") 
        $(".updateBtn").hide()
        $(".addBtn").show()
    })
        
    $(".edit").click(function(){
    $(".updateBtn").show()
    $(".addBtn").hide()
    })
})






  return (
   <>

   {/* Add new Note */}
   <div className="container mt-4 mb-4">
        <div className="  text-center">
             <button  className="add btn" data-toggle="modal" data-target="#exampleModal"> Add
             New
             <i className="fas fa-plus-circle"></i>
             </button> 
        </div>
    </div>
   {/* Notes */}
   <div className="container">
                <div className="notes-parent padding-bottom">
                <div className="notes-container">
                {notes.length > 0 ? notes.map((note , index)=>   <div key={index} className="note ">
                    <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='m-0'>{note.title} </h3>
                    <div className='d-flex align-align-items-center justify-align-content-center'>
                    <button title='edit' onClick={()=>{showUpdateBox(note.id)}} data-toggle="modal" data-target="#exampleModal"  className='edit'>
                    <i className="fas fa-edit   "></i>
                    </button>
                    <button title='delete' onClick={ ()=> {deleteNote(note.id)} }  className='delete'>
                    <i className="fas fa-trash-alt   "></i>
                    </button>
                    </div>
                    </div>
                    <p className='m-0 mt-3'> {note.desc} </p>
                </div>) : <h2 className='text-center  noNotesText'>There are no notes</h2>}
                </div>
                {notes.length === 0 ? "" :      <div className='deleteAll-holder'>
                    <button onClick={DeleteAll} className='deleteAllBtn'>Delete All</button>
                </div>}
           
                </div>
    </div>


    {/* <!-- add note  Modal --> */}
    <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                        <input placeholder="Title" onChange={handleInputChange} name="title" className="form-control" type="text" />
                        <textarea className="form-control my-2" onChange={handleInputChange} placeholder="Note content" name="desc" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button data-dismiss="modal"  onClick={addNote}   className="btn addBtn btn-info"> Add Note</button>
                        <button data-dismiss="modal" onClick={()=>{updateNote()}}     className="btn updateBtn btn-info"> Update Note</button>
                    </div>
                </div>
            </div>
    </div>
    <ToastContainer />
   </>
  )
}

export default Home
