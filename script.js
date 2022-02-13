console.log("Wellcome to our notes taking website");
showNotes();
let addBtn = document.querySelector("#addBtn");
//console.log(addBtn);
addBtn.addEventListener("click",function(){
    let addTitle = document.querySelector('#addTitle');
    let addNotes = document.querySelector("#addNotes");
    
    //console.log(addNotes);
    let notes = localStorage.getItem("notes");
    //console.log(notes);

    if(notes == null)
    {
        notesObj = [];//notesObj is empty array
    }
    else
    {
        notesObj = JSON.parse(notes);//now notesobj is object array
    }
    myObj = {
        title:addTitle.value,
        text:addNotes.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addNotes.value="";
    showNotes();
});
function showNotes()
{
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){

        html += `
        <div class="card notesCard my-5 mx-2" style="width:25%;">
        <div class="card-body">
            <h3>${element.title}</h3>
            <p>${element.text}</p>
            <center><button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style='width:100%;'>Delete</button></center>
        </div>
    </div>
        `
    });
    let notesElem = document.querySelector("#notes");
    if(notesObj.length!=0)
    {
        notesElem.innerHTML = html;
    }
    else 
    {
        notesElem.innerHTML = `You don't write anything in the note! Please Add a note`;
    }
}
function deleteNote(index)
{
    console.log("I'm delete",index)
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let searchBar = document.querySelector("#serachBar");

searchBar.addEventListener("input",function()
{
    
    let inputValue = searchBar.value;
    //console.log(inputValue);
    let notesCard = document.querySelectorAll(".notesCard"); 
    Array.from(notesCard).forEach(function(element){
        let cardtxt = element.getElementsByTagName("p")[0].innerHTML;
        if(cardtxt.includes(inputValue))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none"; 
        }
    });

});


