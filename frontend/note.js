// const notesList=document.getElementById("notesList")

// async function getNotes() {
//     const API_URL="https://notes-saver-frontend.vercel.app"
//     try{
//         const response=await fetch(`${API_URL}/note-saver`)
//         const data=await response.json()

//         notesList.innerHTML=""
//         data.forEach(note=>{
//             const card=document.createElement("div")

//             card.className="note-card";
//             card.innerHTML=`
//             <h4>${note.title}</h4>
//             <div class="notes-container">
//             <p>${note.content}</p>
//             </div>
//             <button class="deleteBtn" data-id=${note._id}">
//             Delete </button>`
//             notesList.appendChild(card)

//             const deletBtn=card.querySelector(".deleteBtn");
//             deletBtn.addEventListener("click",async()=>{
//                 try{
//                     const response=await fetch(`/note-saver/${note._id}`,{
//                         method:"DELETE"
//                     });
//                     const result=await response.json()
//                     if(result.success){
//                         card.remove();
//                     }
//                     }catch(error){
//                         console.log("Error Deteting:", error);
//                 }
//             })
//         })
//     }catch(error){
//         console.log("Error:", error);

//         notesList.innerHTML=`
//         <P>Failed to get Notes</p>`
        
//     }
// }
// getNotes()


const API_URL = "https://notes-saver-frontend.vercel.app";

const notesList = document.getElementById("notesList");


// Fetch all notes
async function getNotes() {
  try {
    const response = await fetch(`${API_URL}/note-saver`);

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const data = await response.json();
    notesList.innerHTML = "";

    data.forEach((note) => {
      const card = document.createElement("div");
      card.className = "note-card";

      const title = document.createElement("h4");
      title.textContent = note.title;

      const content = document.createElement("p");
      content.textContent = note.content;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "deleteBtn";
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `${API_URL}/note-saver/${note._id}`,
            { method: "DELETE" }
          );

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error("Failed to delete note");
          }

          card.remove();
        } catch (error) {
          console.error("Error deleting note:", error);
          alert("Could not delete note.");
        }
      });

      card.append(title, content, deleteBtn);
      notesList.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    notesList.textContent = "Failed to get notes.";
  }
}

getNotes()