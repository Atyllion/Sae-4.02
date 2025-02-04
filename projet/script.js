let book;

function getBook() {
    book = document.getElementById('bookModel')
    console.log(book)
}



function Grab() {
    addEventListener('mousedown', () => {
        // code
        console.log('mousedown')
        let objet = book.outerHTML;
        objet = objet.replace('dynamic-body="shape: box; mass: 1;' , 'dynamic-body="shape: box; mass: 0;')
        book.innerHtml = objet;
        console.log(objet)
        Drop()
    }
    )
}
function Drop() {
    addEventListener('mouseup', () => {
        // code
        console.log('mouseup')
        let objet = book.outerHTML;
        objet = objet.replace('dynamic-body="shape: box; mass: 0;' , 'dynamic-body="shape: box; mass: 1;')
        
        console.log(objet)
    }
    )
}

Grab()


getBook()