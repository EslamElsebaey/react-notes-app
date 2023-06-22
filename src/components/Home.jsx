import React, { useEffect, useState , useRef  } from 'react'
import $ from "jquery"
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from '@tinymce/tinymce-react';

function Home() {

    
let [notes , setNotes] = useState([]);
// updated text in textarea saved in this state
const [updatedDescVal, setUpdatedDescVal] = useState("");
const [initialVal, setInitialVal] = useState("");
const [note , setNote] = useState({
    desc : "", 
    id : Math.random()
})
let mynotes ;


// check if language of note is arabic => align text to right , else align text to left
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

    // check if notes array is empty, add class to center (no notes div) in the midddle of the page
    if(notes.length === 0){
        $(".notes-parent").addClass("notesParent-postioned");
    }else{
        $(".notes-parent").removeClass("notesParent-postioned");
    }
} , [note , notes])


// check if notes are existed in local storage or not 
  useEffect(()=>{
    if(localStorage.getItem("notes")){
        setNotes(JSON.parse(localStorage.getItem("notes")))
    }else {
        setNotes([])
    }
  } , [])


  let clearInput = ()=>{
    setInitialVal("");
    console.log(initialVal)
  }


//  Add new note
const addNote = () => {
    if(updatedDescVal !== ""){
    mynotes = JSON.parse(localStorage.getItem('notes')) || [];
    mynotes.push(note)  ;
    setNotes(mynotes);
    localStorage.setItem('notes', JSON.stringify(mynotes));
    setNote({
        title : "", 
        desc : "", 
        id : Math.random()
    });
    setInitialVal("")
    toast.success('Added successfully', {
        position: "bottom-right",
        autoClose: 1200,
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


// Delete single note
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
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }, function(){});
}

// Delete all notes
function DeleteAll(){
    alertify.confirm(   "Delete all notes", 
    "Are you sure you want to delete all notes ?", function(){
        setNotes([]);
        localStorage.removeItem("notes");
        toast.success('All deleted successfully', {
            position: "bottom-right",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }, function(){});
}

// when click on update icon to show update box to edit your note
function showUpdateBox (noteId){
       let newNote = notes.filter((note)=>  {
        return note.id === noteId
       })
       localStorage.setItem("noteId" , JSON.stringify(noteId))
       setInitialVal(newNote[0].desc)
}

// update note 
function updateNote(){
    if(updatedDescVal !== ""){
        let noteId = JSON.parse(localStorage.getItem("noteId"));
        let allNotes = JSON.parse(localStorage.getItem("notes")) ;
         let updatedNote =   allNotes.filter((note)=> {
            return note.id === noteId
        })
        updatedNote[0].desc =  updatedDescVal; 
        localStorage.setItem("notes" , JSON.stringify(allNotes));
        setNotes(allNotes)
       setInitialVal("")
        toast.success('Updated successfully', {
            position: "bottom-right",
            autoClose: 1200,
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
   
        
}



// handle change in textarea
function handleTextareaChange (e){
    setNote({...note , "desc" : e.target.getContent()   }  )
    setUpdatedDescVal(e.target.getContent())
 }



// show and hide (add & update) buttons depends on user click on update or add button 
useEffect(()=>{

    $(".edit").click(function(){
        $(".updateBtn").show()
        $(".addBtn").hide()
    })
    
    $(".add").click(function(){
        setInitialVal("")
        $(".updateBtn").hide()
        $(".addBtn").show()
    })
   
})


const editorRef = useRef(null);




  return (
   <>

   {/* Add new Note */}
   <div className="container mt-4 mb-4">
        <div className="  text-center">
             <button onClick={clearInput}  className="add btn" data-toggle="modal" data-target="#exampleModal"> Add
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
                    <div className='d-flex justify-content-end align-items-center'>
                    <div className='d-flex align-align-items-center justify-align-content-center'>
                    <button title='edit' onClick={()=>{showUpdateBox(note.id)}} data-toggle="modal" data-target="#exampleModal"  className='edit'>
                    <i className="fas fa-edit   "></i>
                    </button>
                    <button title='delete' onClick={ ()=> {deleteNote(note.id)} }  className='delete'>
                    <i className="fas fa-trash-alt   "></i>
                    </button>
                    </div>
                    </div>

                      <p className="m-0 mt-3" dangerouslySetInnerHTML={{ __html: `${note.desc}` }} />
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
                        <Editor
                            initialValue={initialVal}
                            textareaName='desc'
                            onChange={(e)=>handleTextareaChange(e)}
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                            height: 200,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: '| forecolor backcolor | fontfamily fontsize bold italic underline strikethrough | alignleft aligncenter alignright alignjustify   |  numlist bullist |   | pagebreak |  fullscreen  preview  | ltr rtl',
                            content_style: 'body { font-family: "Poppins", sans-serif; font-size:16px }'
                            }}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button data-dismiss="modal"  onClick={addNote}   className="btn addBtn "> Add Note</button>
                        <button data-dismiss="modal" onClick={()=>{updateNote()}}     className="btn updateBtn "> Update Note</button>
                    </div>
                </div>
            </div>
    </div>
    <ToastContainer />
   </>
  )
}

export default Home
