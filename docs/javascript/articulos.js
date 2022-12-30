let buttonMenu = document.querySelector('.fa-bars');
let nav = document.querySelector('.nav-menu-ul');
if( localStorage.getItem('articulos') == null){
    localStorage.setItem('articulos', JSON.stringify( [] ));
}
if( localStorage.getItem('categories') == null){
    localStorage.setItem('categories', JSON.stringify( [] ));
}


let click = 0;

buttonMenu.addEventListener('click',()=>{

    if( !nav.classList.contains('hidde-display') ){
        nav.classList.add('hidde-display');
        click = 0;
    }
});
let body = document.querySelector('body'); 
        body.addEventListener('click',()=>{
            // console.log(click)
            click++;
            if( click == 2){
                nav.classList.remove('hidde-display');
            }
});






let articulosList = document.querySelector('.section-2 ul');


    let articuloLocalStorage = JSON.parse( localStorage.getItem('articulos') );

    console.log( articuloLocalStorage.length );



        if( articuloLocalStorage.length > 0 ){
            for(let i = 0; i < articuloLocalStorage.length ; i++){
                articulosList.innerHTML += `
                    <li class="item-article">
                        <img class="img-article" src="${articuloLocalStorage[i].img}"> 
                        <p class="name-article">${articuloLocalStorage[i].nombre}</p>
                        
                        <p class="precio-article">0</p>
                        
                    </li>
                `;
            }
        }else {
            articulosList.innerHTML = `
                    <p class="parrafo">Aun no hay ningun articulo agregado</p>
                `;
        }

        


    


    let articulosHtml = document.querySelector('.articulos-html');
    let categoriasHtml = document.querySelector('.categorias-html');
    let section2 = document.querySelector('.section-2');
    let section3 = document.querySelector('.section-3');

    let addCategory = document.querySelector('#addCategory');
    let categoriesUl;

    // section2.classList.add('section-2-display-true');
    

    articulosHtml.addEventListener('click',()=>{

        // section2.classList.remove('section-2-display-none');
        section2.classList.add('section-2-display-true');

        section3.classList.remove('section-3-display-true');



    });
    categoriasHtml.addEventListener('click',()=>{
        // section2.classList.add('section-2-display-none');
        section3.classList.add('section-3-display-true');
        section2.classList.remove('section-2-display-true');

        

        

        categoriesUl = document.querySelector('.section-3 ul');

        categoriesUl.innerHTML = '';
        
        let categoriesLocalStorage = JSON.parse( localStorage.getItem('categories') );
        if( categoriesLocalStorage.length > 0){
            categoriesLocalStorage.forEach(categoria => {
                categoriesUl.innerHTML += `
                <li>
                    <p class="category-name">${categoria}</p>
                    <p class="category-length">x articulos</p>
                </li>
            `;
            });
        }else {
            categoriesUl.innerHTML = `
                    <p class="parrafo">Aun no hay ninguna categoria agregada</p>
                `;
        }
        
    });

    
    addCategory.addEventListener('click',()=>{
        console.log('first');
        
    });



    let atrasArticulo = document.querySelector('.section-2-header .fa-left-long');
    atrasArticulo.addEventListener('click',()=>{
        console.log('first')
        document.querySelector('.section-2').classList.remove('section-2-display-true');
    });

    let atrasCategoria = document.querySelector('.section-3-header .fa-left-long');
    atrasCategoria.addEventListener('click',()=>{
        document.querySelector('.section-3').classList.remove('section-3-display-true');
    });
    