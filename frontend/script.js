const notes=document.getElementById("noteForm");

// notes.addEventListener("submit",async(e)=>{
//     e.preventDefault()
//     const title=document.querySelector("#title").value
//     const content=document.querySelector("#content").value
//         try{
//     const response=await fetch("https://notes-saver-frontend.vercel.app/note-saver",{
//         method:"POST",
//         headers:{
//             "Content-type":"application/json"
//         },

//         body:JSON.stringify({
//             title:title,
//             content:content
//         })
//     })

//     const result=await response.json()
//     console.log(result);
//     if(result.success){
//         alert("Notes Saved Successfully")
//         form.reset()
//     }
    
// }catch(error){
//     console.log("Error:", error);
// }
// })



const API_URL = "https://notes-saver-frontend.vercel.app";

notes.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    const response = await fetch(`${API_URL}/note-saver`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to save note");
    }

    alert("Note saved successfully!");
    form.reset();
    getNotes();
  } catch (error) {
    console.error("Error saving note:", error);
    alert("Could not save note. Please try again.");
  }
});


