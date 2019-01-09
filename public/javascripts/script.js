
let done = document.querySelectorAll(".done");
let undone = document.querySelectorAll(".undone");
let del = document.querySelectorAll(".delete");
let addNew = document.querySelectorAll(".addNew");
// const url = "https//localhost:27017/api" //http://192.168.33.30:27017/toDoList/


let setDelete = element => {
    element.addEventListener('click', function(el){

        let todoId = this.dataset.id ;
        let bouton = el.target ;

        makeRequest(todoId, 'DELETE', {} , function(re){
            alert("élement effacé");
            bouton.closest('.toDo').remove();
        })
        //debugger
    });
};

let setDone = element => {
    element.addEventListener('click', function(el){
        let todoId = this.dataset.id
        // transformer un chaine de caractère en boolean 
        let data = this.dataset.state == "false" //(renvoie data = le resultat de la condition (true or false) )
        let parent = el.target ;

        makeRequest(todoId, 'PUT', {"state" : data} , function(res){
            let span = document.createElement("span");
            span.innerHTML = res.response;
            let newDel = span.querySelector(".delete");
            setDelete(newDel);
            //console.log(res.response)
            parent.closest('.toDo').replaceWith(span.firstElementChild)
            alert("Mise à jour");
        }) //data)
        //debugger
    });
};

let setUndone = element => {
    element.addEventListener('click', function(el){
        let todoId = this.dataset.id
        // transformer un chaine de caractère en boolean 
        let data = this.dataset.state == "false" //(renvoie data = le resultat de la condition (true or false) )
        let parent = el.target ;
 
        makeRequest(todoId, 'PUT', {"state" : data} , function(re){
            let span = document.createElement("span")
            span.innerHTML = re.response
            let newDel = span.querySelector(".delete");
            setDelete(newDel);
            parent.closest('.toDo').replaceWith(span.firstElementChild)  
            alert("Mise à jour");
        })
        //debugger
    });
};


done.forEach(element => {
    element.addEventListener('click', function(el){
        let todoId = this.dataset.id
        // transformer un chaine de caractère en boolean 
        let data = this.dataset.state == "false" //(renvoie data = le resultat de la condition (true or false) )
        let parent = el.target ;

        makeRequest(todoId, 'PUT', {"state" : data} , function(res){
            let span = document.createElement("span");
            span.innerHTML = res.response;
            let newDel = span.querySelector(".delete");
            let newUndone = span.querySelector(".undone");
            setDelete(newDel);
            setUndone(newUndone);
            //console.log(res.response)
            parent.closest('.toDo').replaceWith(span.firstElementChild)
            alert("Mise à jour");
        }) //data)
        //debugger
    });
});

undone.forEach(element => {
    element.addEventListener('click', function(el){
        let todoId = this.dataset.id
        // transformer un chaine de caractère en boolean 
        let data = this.dataset.state == "false" //(renvoie data = le resultat de la condition (true or false) )
        let parent = el.target ;
 
        makeRequest(todoId, 'PUT', {"state" : data} , function(re){
            let span = document.createElement("span")
            span.innerHTML = re.response
            let newDel = span.querySelector(".delete");
            let newDone = span.querySelector(".done")
            setDelete(newDel);
            setUndone(newDone);
            parent.closest('.toDo').replaceWith(span.firstElementChild)  
            alert("Mise à jour");
        })
        //debugger
    });
});



del.forEach(setDelete)

// addNew.forEach(element => {
//     element.addEventListener('click', function(el){

//         let content = this.parentElement.parentElement.parentElement.childNodes[1].firstElementChild.value
//         let title = this.parentElement.parentElement.parentElement.childNodes[0].firstElementChild.value
//         let user = this.dataset.user

//         let data = { 
//             "title" : title,
//             "conten" : content
//         }

//         makeRequest(user, 'POST', data)
//         //debugger
//     });
// });

document.querySelector('.form').addEventListener('submit', function(evt){
    evt.preventDefault();

    let form = evt.target; 

    // méthode 1

    let val = {};

    form.querySelectorAll('[name]').forEach(function(el){
        val[el.getAttribute('name')] = el.value
    });

    console.log(val)

    // méthode 2

    let title = form.childNodes[0].firstChild.value;
    let content = form.childNodes[1].firstChild.value;
    let user = form.childNodes[2].firstChild.firstChild.getAttribute('data-user');
    let method = evt.target.method;


    let datas = {
            title : title,
            content : content,
            creation_date : new Date(),
            updated_date : new Date(),
            state : false, 
            user : user,
            deadLine : '',
    };

    makeRequest('', method , datas, function(res){

        let span = document.createElement("span");
        span.innerHTML = res.response;
        let newDel = span.querySelector(".delete");
        let newDone = span.querySelector(".done");

        div = span.firstElementChild

        setDelete(newDel);
        setDone(newDone);

        let container = document.querySelector('.container');
        let form = document.querySelector('.form')

        container.appendChild(div);
        form.before(div);
        form.reset();
    })
})




        
function makeRequest(ID, METHOD, DATA, callback){ //DATA) {

    var httpRequest = false;

    httpRequest = new XMLHttpRequest();


    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }
    httpRequest.onreadystatechange = function() { alertContents(httpRequest, callback); };
    httpRequest.open(METHOD, '/api/' + ID + '');
    httpRequest.setRequestHeader('Content-type', 'application/json');
    httpRequest.send(JSON.stringify(DATA));//( data ? JSON.stringify(DATA) : null ); verifie si la variable est null à lire si data existe envoie JSON... sinon envoie null écriture ternère  
};

function alertContents(httpRequest, callback) {

    if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
            //alert("element supprimé");
            console.log(httpRequest.response)
            //debugger
            callback(JSON.parse(httpRequest.response))
        } else {
            alert('Un problème est survenu avec la requête.');
        };
    };

};


// function doneUndone(el) {

//     let parent = el.target.parentElement.parentElement.parentElement

//     if ( el.target.value === "done" ) {
//         parent.classList.remove("bg-light")
//         parent.classList.add("bg-danger")
//     } else  {
//         parent.classList.remove("bg-danger")
//         parent.classList.add("bg-light")
//     }
// }