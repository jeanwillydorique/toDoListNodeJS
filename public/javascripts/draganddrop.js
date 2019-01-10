

var el = document.querySelector('.container');
var sortable = Sortable.create(el, {
    onEnd: function (/**Event*/evt) {

        let newPosition = evt.newIndex
        let oldPosition = evt.oldIndex
        let element = event.target.parentElement


        let container = evt.target
        let array =  container.querySelectorAll('.toDo')
        let i = 0


        let val = [];

       array.forEach(element => {
            val.push(element.getAttribute('data-id'));
        });
        //console.log(val)


        makeRequest('order', 'POST', val, function(){
            
        })
        //debugger
        // same properties as onEnd
    },
});






       
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