const addBtn = document.querySelector('.add-btn');
const poppupBox = document.querySelector('.poppup-box');
const poppup = document.querySelector('.poppup');
const container = document.querySelector('.container');
const addNoteDiv = document.querySelector('.add-note');
const header = document.querySelector('header p');

let notes = JSON.parse(localStorage.getItem("notes") || "[]");

const x = document.querySelector('.bx-x');
const addNoteBtn = document.getElementById('add-note-btn');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const months = ["January", "February", "March", "April", "May",
    "June", "Jully", "Auguest", "September", "October", "November", "December"];
let isUpdated = false , updateId;

function showNotes(){
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach( (note,index) =>{
        let divTag = `  <div class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description}</span>
                            </div>
                            <div class="btn-content">
                                <span>${note.date}</span>
                                <button onclick = "updateNote(${index}, '${note.title}', '${note.description}')" ><i class='bx bxs-edit-alt'></i></button>
                                <button onclick = "deleteNote(${index})" ><i class='bx bxs-trash'></i></button>
                            </div>
                        </div>`;
        addNoteDiv.insertAdjacentHTML("afterend", divTag);
    });
}
showNotes();

addBtn.addEventListener('click',()=>{
    titleInput.value = "";
    descriptionInput.value = "";
    header.innerText = "Add New Note";
    addNoteBtn.innerText = "Add Note";
    titleInput.focus();
    poppupBox.style.opacity = 1;
    poppup.style.opacity = 1;
    poppupBox.style.pointerEvents = "auto";
    poppup.style.pointerEvents = "auto";
});

function deleteNote(noteId){
    let confirmation = confirm("Are you sure you want to delete this note?");
    if(!confirmation)return;
    notes.splice(noteId,1);
    localStorage.setItem("notes" , JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId , title, description){
    updateId = noteId;
    addBtn.click();
    isUpdated = true;
    header.innerText = "Update Note";
    addNoteBtn.innerText = "Update Note";
    titleInput.value = title;
    descriptionInput.value = description;
}

x.addEventListener('click', () =>{
    isUpdated = false;
    poppupBox.style.opacity = 0;
    poppup.style.opacity = 0;
    poppupBox.style.pointerEvents = "none";
    poppup.style.pointerEvents = "none";
});

addNoteBtn.addEventListener('click' , () => {
    let noteTitle = titleInput.value,
    noteDescription = descriptionInput.value;
    if(noteTitle  || noteDescription){
        let date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear();

        let noteInfo = {
            title: noteTitle , description: noteDescription,
            date: `${month} ${day}, ${year}`
        }

        if(!isUpdated){
            notes.push(noteInfo);
        } else {
            isUpdated = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes" , JSON.stringify(notes));
        
        x.click();
        showNotes();
    }
});