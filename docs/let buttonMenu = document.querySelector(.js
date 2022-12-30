let buttonMenu = document.querySelector('.fa-bars');
let nav = document.querySelector('.nav-menu-ul');
let secition1 = document.querySelector('.section-1');
let DOMcategories = document.querySelectorAll('.categories');

let categories = JSON.parse( localStorage.getItem('categories') );
let articulos = JSON.parse( localStorage.getItem('articulos') );



buttonMenu.addEventListener('click',()=>{
    nav.classList.toggle('hidde-display');
});

for(let i = 0; i < categories.length;i++){
    secition1.innerHTML += `
        <div class="categories" id="div-${categories[i]}">
            <h1>${categories[i]}</h1>
            </div>
    `;
}
for( let i = 0; i < articulos.length;i++){
    for( let j = 0; j < categories.length ; j++){

        if( articulos[i].categoria == categories[j]){
            let category = document.querySelector('#div-'+categories[j]);
            category.innerHTML += `
                <article class="article-1" id="${articulos[i].id}">
                    <img src="${articulos[i].img}" class="img-product">
                    <div class="div-p-product">
                        <p class="p-product">${articulos[i].nombre}</p>
                    </div>
                </article>
            `;
    }
        
    }

}

// for( let j = 0; j < articulos.length ; j++){

//     DOMcategories.forEach((DomCategory)=>{
//         if( DomCategory == articulos[i].categoria ){
//             DOMcategories.innerHTML += `<article class="article-1">
//             <img src="https://dubaitrippackages.files.wordpress.com/2017/11/2-imgdinosaurs_base.jpg" alt="" class="img-product img-product-1">
//             <div class="div-p-product">
//                 <p class="p-product">Familiar 10 Pedazos</p>
//             </div>
//         </article>`
//         }
//     })
    
// }
let btnSelected;





let article = document.querySelectorAll('article');
let articleInfo = document.querySelector('.article-info');

article.forEach((item)=>{
    // console.warn( item );
    item.addEventListener('click',()=>{
    
        let option = document.querySelector('.option-1');
        let option2 = document.querySelector('.option-2');
        option.innerHTML = '';
        option2.innerHTML = '';

        articleInfo.classList.add('article-info_displaytrue');
        articulos.map( articulo =>{
            
            // console.warn( articleInfo );
            // console.warn( articulo )

            let articleInfoP = document.querySelector('.article-info-p');
            articleInfoP.innerText = articulo.nombre;
            let optionP = document.querySelector('.option-p');
            optionP.innerText = 'Ingredientes de: ' + articulo.nombre;

            if( articulo.id == item.id){
                let keys = Object.keys( articulo.precio );
                let precios = Object.values( articulo.precio )
                for(let i = 0; i < keys.length ;i++){
                    option.innerHTML += `
                        <button class="ingrediente option-button"><p class="option-p">${keys[i]}</p> <p class="option-p">${precios[i]}</p></button>
                    `;
                } 
                
                
                let adicionales = Object.keys( articulo.ingredientesAdicionales );
                let preciosAdicionales = Object.values( articulo.ingredientesAdicionales );
                let option2P = document.querySelector('.option-2-p');
                option2P.innerText = 'ingrediente adicional de: '+ articulo.nombre;

                for(let i = 0; i< adicionales.length;i++){
                    option2.innerHTML += `
                        <button class="ingrediente-adicional option-button"><p class="option-p">${adicionales[i]}</p> <p class="option-p">${preciosAdicionales[i]}</p></button>
                    `;
                }


                let buttons = document.querySelectorAll('.article-info .option-button');
                buttons.forEach((button)=>{
                    button.addEventListener('click',()=>{
                        button.classList.toggle('create-article-button');
                    });
                });
                let enviarPedido = document.querySelector('#enviar-pedido');
                
                enviarPedido.addEventListener('click',(e)=>{
                    e.preventDefault();

                    console.error( '-----------aqui---------' )

                    btnSelected = document.querySelectorAll('.create-article-button').length;


                    count = 0;

                    buttons.forEach((buttonItem)=>{
                        if( buttonItem.classList.contains('create-article-button') ){
                            let btnHover = buttonItem;
                        }
                    })

                    

                    buttons.forEach((button) =>{
                        if( button.classList.contains('create-article-button')){
                            pedido( button );
                            countButtons( button.value );

                            // console.warn( button )


                        }
                    })

                })
                let adicionalesArray = [];

                console.log( adicionalesArray )

                const pedido = ( pedido ) =>{


                    let adicional = pedido.className.split(' ')[0];
                    

                    let pedidoClasses = pedido.className;
                    let pedidoClass = pedidoClasses.split(' ')[0];

                    let nombreIngrediente = pedido.children[0].innerText;
                    let precioIngrediente = pedido.children[1].innerText;
                    let cantidadPedido = document.querySelector('#cantidad-pedido');
                    let comentario = document.querySelector('#comentario');

                    

                    // console.log( pedidoClass )
                    // console.log( nombreIngrediente )
                    // console.log( precioIngrediente )
                    
                    // console.log( buttons.length )

                    // for(let i = 0;i < buttons.length; i++){
                    //     console.log( buttons.length )
                    // }

                    // console.log()

                    // for( let i = buttons.length ;i == 0;i++){
                    //     console.log( 'hola');
                    // }

                    //     let nombreIngredienteAdicional = pedido.children[0].innerText;
                    //     let precioIngredienteAdicional = pedido.children[1].innerText;

                    //     // console.log( 'yeac ' + pedido.children[0].innerText )
                    //     // console.log( 'aqui: '+precioIngredienteAdicional)


                    //     adicionalesArray.push( nombreIngredienteAdicional, precioIngredienteAdicional );
                    //     console.log( buttons.length )
                        // console.warn( count + 1)
                    // if(buttons.length == count ){
                        
                    //     renderPedido(articulo.nombre, nombreIngrediente, precioIngrediente, cantidadPedido.value, comentario.value, adicionalesArray);
                    // }

                    // console.log( btnSelected.length );
                    
                    // console.warn( count + 1 );
                    // console.warn( btnSelected );
                   
                    
                    if( count + 1 == btnSelected){
                        console.warn( count + 1 , btnSelected )

                        

                        let nombreIngredienteAdicional = pedido.children[0].innerText;
                        let precioIngredienteAdicional = pedido.children[1].innerText;

                        adicionalesArray.push( nombreIngredienteAdicional, precioIngredienteAdicional );
                        renderPedido(articulo.nombre, nombreIngrediente, precioIngrediente, cantidadPedido.value, comentario.value, adicionalesArray);

                    }else {

                        let nombreIngredienteAdicional = pedido.children[0].innerText;
                        let precioIngredienteAdicional = pedido.children[1].innerText;
                        console.log( {pedido} );
                        adicionalesArray.push( nombreIngredienteAdicional, precioIngredienteAdicional );

                    }
                    adicionalesArray = [];

                    

                    // if( pedido.className.split(' ')[0] == 'ingrediente-adicional' ){

                    //     // console.log('si')

                    //     let nombreIngredienteAdicional = pedido.children[0].innerText;
                    //     let precioIngredienteAdicional = pedido.children[1].innerText;

                    //     adicionalesArray.push( nombreIngredienteAdicional, precioIngredienteAdicional );
                    //     renderPedido(articulo.nombre, nombreIngrediente, precioIngrediente, cantidadPedido.value, comentario.value, adicionalesArray);

                    // }else{
                    //     // console.log('no')
                    //     renderPedido(articulo.nombre, nombreIngrediente, precioIngrediente, cantidadPedido.value, comentario.value, adicionalesArray);
                    //     // console.log( adicionales );
                    // }

                    
                }
                


            }

        })
        

    })
});




let salirArticle = document.querySelector('.fa-circle-xmark');
salirArticle.addEventListener('click',()=>{
    articleInfo.classList.remove('article-info_displaytrue');
});







const renderPedido = (nombreArticulo, ingrediente, PrecioPedido, cantidadPedido,comentario, adicionalesArray) =>{


    let ingredientesPedido = [];
    for(let i = 0; i < adicionalesArray.length ;i = i + 2){
        ingredientesPedido.push(adicionalesArray[i]);
    }
    let ingredientesPedidoPrecio = [];
    for(let i = 1; i < adicionalesArray.length ;i = i + 2){
        let precio = Number(adicionalesArray[i]);
        console.log( precio )
    }
    
    // console.warn( ingredientesPedidoPrecio )
    // console.log( adicionalesArray )
    // console.log( nombreArticulo )
    // console.log( ingrediente)
    // console.log(PrecioPedido)
    // console.log( cantidadPedido)
    // console.log( comentario)

    let pedido = document.querySelector('.section-2 ul');
    pedido.innerHTML +=`
        <li class="list-pedido"><p>${cantidadPedido} - ${nombreArticulo}</p> <p>${sumaPrecio(adicionalesArray)}</p></li>
        <p>${ingredientesPedido}</p>

        <p>${comentario}</p>
    `;
    // console.log( adicionales )
    console.error(adicionalesArray);
    adicionalesArray = [];
    articleInfo.classList.remove('article-info_displaytrue');
    
}
let count = 0;

const countButtons = ( button ) =>{
    if( button ) {
        console.warn( button )
        count++;
        console.log('haber ' +  count)
        // console.error( count );
        return count;
    }

}





const sumaPrecio = ( precio ) =>{
    let precios = [];
    for(let i = 1; i < precio.length; i = i + 2){
        precios.push( Number( precio[i] ));
    }
    let total = precios.reduce((a, b) => a + b, 0);


    return(total);
}
































