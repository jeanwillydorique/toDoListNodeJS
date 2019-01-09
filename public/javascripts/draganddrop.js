

var el = document.querySelector('.container');
var sortable = Sortable.create(el, {
    onUpdate: function (/**Event*/evt) {

        let newPosition = evt.newIndex
        let oldPosition = evt.oldIndex
        let element = event.target.parentElement
        
        debugger
        // same properties as onEnd
    },
});