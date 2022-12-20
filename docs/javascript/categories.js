//categoris.html

let newCategory = document.querySelector('#nombre');
let btnSaveCategory = document.querySelector('#save-category');
let btnCrearArticulo = document.querySelector('#btn-crear-articulo');

btnSaveCategory.addEventListener('click',(e)=>{
    e.preventDefault();
    saveCategories();

});
btnCrearArticulo.addEventListener('click',(e)=>{
    e.preventDefault();
    saveCategories();
})


let saveCategories = () =>{
    if( localStorage.getItem('categories') == null){
        localStorage.setItem('categories','[]');
    }
    if( newCategory.value.length >= 3){
        let db = JSON.parse( localStorage.getItem('categories') );
        db.push(newCategory.value);
        localStorage.setItem('categories',JSON.stringify( db ) );
        newCategory.value = '';		
    }
}

window.onload = ()=>{
    const db = JSON.parse( localStorage.getItem('categories') );
};