let buttonMenu = document.querySelector('.fa-bars');
let nav = document.querySelector('.nav-menu-ul');
let secition1 = document.querySelector('.section-1');
let DOMcategories = document.querySelectorAll('.categories');

let categories = JSON.parse( localStorage.getItem('categories') );
let articulos = JSON.parse( localStorage.getItem('articulos') );

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



if( categories != null ){
    if( categories.length > 0){
        for(let i = 0; i < categories.length;i++){
            secition1.innerHTML += `
                <div class="categories" id="div-${categories[i]}">
                    <h1>${categories[i]}</h1>
                    </div>
            `;
        }
    } else secition1.innerHTML += `<p>No hay ninguna categoria,dirijase a <a href="crearCategorias.html">'Categorias'</a></p>`;
}else {
    secition1.innerHTML += `<p>No hay ninguna categoria,dirijase a <a href="crearCategorias.html">'Categorias'</a></p>`;
}

if( articulos != null ){
    if( articulos.length > 0){
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
    }else secition1.innerHTML += `<p>No hay ningun articulo, dirijase a <a href="creararticulos.html">'articulos'</a> para crear su primer articulo </p>`;
}else{
    secition1.innerHTML += `<p>No hay ningun articulo, dirijase a <a href="creararticulos.html">'articulos'</a> para crear su primer articulo </p>`;
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

        console.log(item )
    
        let option = document.querySelector('.option-1');
        let option2 = document.querySelector('.option-2');
        option.innerHTML = '';
        option2.innerHTML = '';

        articleInfo.classList.add('article-info_displaytrue');
        articulos.map( articulo =>{

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

                    // console.error( '-----------aqui---------' )

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
                            countButtons( button );

                            console.log('tal vez --------' +  button )

                            
                            button.classList.remove('create-article-button')
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
                    let cantidadPedido = document.querySelector('#cantidad-pedido').value;
                    let comentario = document.querySelector('#comentario');



                    for(let i = 0; i < Number( cantidadPedido ); i++){
                            if( count + 1 == btnSelected){

                            let nombreIngredienteAdicional = pedido.children[0].innerText;
                            let precioIngredienteAdicional = pedido.children[1].innerText;

                            adicionalesArray.push( nombreIngredienteAdicional, precioIngredienteAdicional );
                            renderPedido(articulo.nombre, nombreIngrediente, precioIngrediente, Number( cantidadPedido ), comentario.value, adicionalesArray);

                        }else {

                            let nombreIngredienteAdicional = pedido.children[0].innerText;
                            let precioIngredienteAdicional = pedido.children[1].innerText;
                            console.log( {pedido} );
                            adicionalesArray.push( nombreIngredienteAdicional, precioIngredienteAdicional );

                        }
                    }

                    

                    

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

let pedidoCliente = [];

const renderPedido = (nombreArticulo, ingrediente, PrecioPedido, cantidadPedido,comentario, adicionalesArray) =>{

    

    pedidoCliente.push({
        cantidadPedido,
        nombreArticulo,
        total:sumaPrecio(adicionalesArray),
        comentario,
        cliente: datosClientes,
        // horaPedido,
    });
    console.warn( pedidoCliente );


    let ingredientesPedido = [];
    for(let i = 0; i < adicionalesArray.length ;i = i + 2){
        ingredientesPedido.push(adicionalesArray[i]);
    }
    let ingredientesPedidoPrecio = [];
    for(let i = 1; i < adicionalesArray.length ;i = i + 2){
        let precio = Number(adicionalesArray[i]);
        console.log( precio );
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
        <li class="list-pedido"><p class="articulo articulo-nombre">${cantidadPedido} - ${nombreArticulo}</p> <p class="articulo articulo-precio">${sumaPrecio(adicionalesArray)}</p></li>
        <p class="articulo articulo-nombre articulo-ingredientes">${ingredientesPedido}</p>

        <p class="articulo">${comentario}</p>
    `;
    // console.log( adicionales )
    // console.error(adicionalesArray);
    adicionalesArray = [];
    articleInfo.classList.remove('article-info_displaytrue');
    sumarTotal();
    
}
let count = 0;

const countButtons = ( button ) =>{
    if( button ) {
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












let totalPedido = document.querySelector('.total-p');

const sumarTotal = () =>{

    let pedidoPrecio = document.querySelectorAll('.articulo-precio');
    let total = 0;
    pedidoPrecio.forEach((precioItem)=>{
        total += Number( precioItem.innerText );
        totalPedido.innerHTML = total;
    })
}



let datosClientes = {};

let agregarCliente = document.querySelector('#agregar-liente');
let divClientes =  document.querySelector('.list-clientes');
let divListAllClientes = document.querySelector('.list-all-clientes');
let userPedido = '';


agregarCliente.addEventListener('click',(e)=>{
    e.preventDefault();
    if( userPedido == '' ){

        divListAllClientes.innerHTML ='';

        let allClientes = JSON.parse( localStorage.getItem('clientes') );
    if( localStorage.getItem("clientes") != null){
        allClientes.map((cliente) =>{
            // console.log( {cliente} )
            divListAllClientes.innerHTML += `<li class="list-all-clientes-item" id="${cliente.id}"><i class="fa-solid fa-circle-user"></i><p class="cliente-nombre">${cliente.nombre}</p></li><p class="cliente-numero">${cliente.numero}</p>`;
        });
    }

    let listAllClientesItem = document.querySelectorAll('.list-all-clientes-item');
    listAllClientesItem.forEach((cliente)=>{
        cliente.addEventListener('click',()=>{
            let clienteSelecionado = buscarCliente(cliente.id);
            let clienteInfo = document.querySelector('.cliente-info');
            clienteInfo.classList.add('cliente-info-display-true');
            let nombreCliente = document.querySelector('.nombre-cliente');
            nombreCliente.innerText = clienteSelecionado.nombre;
            let numeroCliente = document.querySelector('.telefono-cliente');
            numeroCliente.innerText = clienteSelecionado.numero;
            
            
            let btnAgregarAlTicket = document.querySelector('#agregar-al-ticket');
            btnAgregarAlTicket.addEventListener('click',()=>{
                userPedido = clienteSelecionado;
                datosClientes = userPedido;
                console.log( userPedido );
                clienteInfo.classList.remove('cliente-info-display-true');
            })
        })
    })

    let listClientes =``;
    divClientes.classList.add('list-clientes-display-true');

    }else {
        // console.log( {userPedido} );
        console.warn( datosClientes )

        let nombreCliente = document.querySelector('.nombre-cliente');
        nombreCliente.innerText = userPedido.nombre;
        let numeroCliente = document.querySelector('.telefono-cliente');
        numeroCliente.innerText = userPedido.numero;

        let clienteInfo = document.querySelector('.cliente-info');
        clienteInfo.classList.add('cliente-info-display-true');
    }



    let btnClienteInfoAtras = document.querySelector('#cliente-info-atras');
    btnClienteInfoAtras.addEventListener('click',()=>{
        let clienteInfo = document.querySelector('.cliente-info');
        clienteInfo.classList.remove('cliente-info-display-true');
    })
    
    
});





let cerrarClientesList = document.querySelector('#cerrar-clientes-list');
cerrarClientesList.addEventListener('click',()=>{
    divClientes.classList.remove('list-clientes-display-true');
});

let btnAgregarNuevoCliente = document.querySelector('#agregar-nuevo-cliente');
let divNuevoCliente = document.querySelector('.nuevo-cliente')
btnAgregarNuevoCliente.addEventListener('click',()=>{
    divClientes.classList.remove('list-clientes-display-true');
    divNuevoCliente.classList.add('list-clientes-display-true');
});

let volverAListCliente = document.querySelector('#volver-a-list-clientes');
volverAListCliente.addEventListener('click',()=>{
    divNuevoCliente.classList.remove('list-clientes-display-true');
    divClientes.classList.add('list-clientes-display-true');
});




const datosDelCliente = () =>{
   

        let nombre = document.querySelector('.nuevo-cliente-info #nombre-de-cliente').value;
        let numero = document.querySelector('.nuevo-cliente-info #numero-de-cliente').value;
        let dirrecion = document.querySelector('.nuevo-cliente-info #dirrecion-de-cliente').value;
        let nota = document.querySelector('.nuevo-cliente-info #nota').value;
    
        let id = new Date();
    
        datosClientes = {
            id:id.getTime(),
            nombre,
            numero,
            dirrecion,
            nota,
        }
        if( localStorage.getItem('clientes') == null){
            localStorage.setItem('clientes','[]');
        }
        let clientes = JSON.parse( localStorage.getItem('clientes') );
        clientes.push( datosClientes );
        localStorage.setItem('clientes',JSON.stringify(clientes));
        let todosLosClientes = JSON.parse( localStorage.getItem('clientes') );

        
        console.warn( datosClientes );
        // divNuevoCliente.classList.remove('list-clientes-display-true');
        // divClientes.classList.add('list-clientes-display-true');

}

let guardarCliente = document.querySelector('#guardar-cliente');
guardarCliente.addEventListener('click',datosDelCliente);


const buscarCliente = (clienteId) =>{
    let clientes = JSON.parse( localStorage.getItem('clientes') );
    let cliente = clientes.find(cliente=> cliente.id == clienteId);
    return cliente;
}

let btnCobrar = document.querySelector('#cobrar');
btnCobrar.addEventListener('click',(e)=>{
    e.preventDefault();

    

    let clienteACobrar = datosClientes;

    let ingrendientes = [];

    let nombrePedidos = document.querySelectorAll('.articulo-nombre');
    nombrePedidos.forEach((nombrePedido)=>{
        let ingrediente = nombrePedido.innerText;
        // console.warn( ingrediente );
        ingrendientes.push(ingrediente);
    });

    let precios = [];
    
    let preciosPedidos = document.querySelectorAll('.articulo-precio');
    preciosPedidos.forEach((precioPedido)=>{
        let precio = precioPedido.innerText;
        precios.push(precio)
    });
    let lugarComer = document.querySelector('select').value;

    let datosPedidos = {
        nombreArticulo: ingrendientes,
        precios: precios,
        lugarComer: lugarComer,
    };

    cobrar();
    if( !Object.entries(datosClientes).length == 0 ){
        let clienteDiv = document.querySelector('.cobrar-paso-1-content-1 .section-2-cliente-info');
        clienteDiv.classList.add("cliente-display-true");
        let clienteDivNombre = document.querySelector('.cobrar-paso-1-content-1 .cliente-info-nombre');
        let clienteDivNumero = document.querySelector('.cobrar-paso-1-content-1 .cliente-info-numero');
        let clienteDivDireccion = document.querySelector('.cobrar-paso-1-content-1 .cliente-info-direccion');

        clienteDivNombre.innerText += datosClientes.nombre;
        clienteDivNumero.innerText += datosClientes.numero;
        clienteDivDireccion.innerText += datosClientes.dirrecion;
    }
    
});

let pedido;

const cobrar = () =>{

    let cobrarPaso1 = document.querySelector('.cobrar-paso-1');
    let cobrarPaso1Content1 = document.querySelector('.cobrar-paso-1-content-1');

    cobrarPaso1.classList.add('cobrar-paso-1-display-true');
    cobrarPaso1Content1.innerHTML = document.querySelector('.section-2-content').innerHTML;
    pedido = cobrarPaso1Content1.innerHTML;

    let totalAPagar = document.querySelector('.total-a-pagar');
    let totalDefinitivo = document.querySelector('.total-p').innerText;
    totalAPagar.innerText = totalDefinitivo;

    let efectivoRecibido = document.querySelector('#btn-efectivo-recibido');
    efectivoRecibido.value = totalDefinitivo;

    let selectWitdOpstions = document.querySelector('.section-2-content select');
    let selectValue = document.querySelector('.pedido');
    selectValue.innerHTML = selectWitdOpstions.value; 

    // let btnCobrarTotal = document.querySelector('.cobrar-paso-1-content-2 #btn-cobrar-total');
    // btnCobrarTotal.addEventListener('click',()=>{
    //     console.log( 'hola' );
    // })

}




let btnCobrarDefinitivo = document.querySelector('#cobrar-definitivo');
let btnAtrasCobra = document.querySelector('#atras-cobrar');


    btnCobrarDefinitivo.addEventListener('click',() =>{

        let pedidoHtml = document.querySelector('.pedido-html').innerHTML;

        let date = new Date();
        let fecha = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

    pedidoCliente.forEach((pedido)=> {
        pedido.cliente = datosClientes;
        pedido.horaCreacion = horaCreacion();
        pedido.fechaCreacion = fecha;
        pedido.id = date.getTime();
        pedido.html = pedidoHtml;
    });

        

        let cobrarPaso1Content2 = document.querySelector('.cobrar-paso-1-content-2');

        

        cobrarPaso1Content2.classList.add('cobrar-paso-1-content-2-display-none');

        let cobrarPaso1Content3 = document.querySelector('.cobrar-paso-1-content-3');
        cobrarPaso1Content3.classList.add('cobrar-paso-1-content-3-display-true');

        let totalPagado = document.querySelector('.total-pagado');
        let cambio = document.querySelector('.cambio');
        let total = document.querySelector('.total-p');
        totalPagado.innerText = total.innerText;

        let resp = document.querySelector('#btn-efectivo-recibido').value;
        cambio.innerText = resp - total.innerText;

        createRecibos();

        


    } );

const createRecibos = () =>{

    let pedido = {
        cliente: datosClientes,
    }

    let infoPedido = [];

       
        let data = document.querySelectorAll('.cobrar-paso-1-content-1 .articulo');
        let total = document.querySelector('.cobrar-paso-1-content-1 .total-p');
        data.forEach(item => infoPedido.push(item.innerText) );
        infoPedido.push( total.innerText );
        pedido.horaPedido = horaCreacion();
        pedido.pedidos = infoPedido;
        

        console.warn( pedido );

    imprimirRecibo( pedido );

        // document.querySelector('');

        
        

        // console.log( pedidoYCliente )

        // if(localStorage.getItem('recibos') == null ){
        //     localStorage.setItem('recibos','[]');
        // } 
        // let recibos = localStorage.getItem('recibos');
        // recibos.push()
}


    btnAtrasCobra.addEventListener('click',()=>{

        let cobrarPaso1 = document.querySelector('.cobrar-paso-1');
        cobrarPaso1.classList.remove('cobrar-paso-1-display-true');
    });


const imprimirRecibo = ( pedido ) =>{
    // let btnImprimir = document.querySelector('#btn-imprimir');
    // btnImprimir.addEventListener('click',()=>{
    //     let cobrarPaso1 = document.querySelector('.cobrar-paso-1-content-1').innerHTML;
    //     let body = document.body.innerHTML;
    //     document.body.innerHTML = cobrarPaso1;
    //     window.print();
    //     document.body.innerHTML = body;
    // });

    console.warn( pedidoCliente );

    console.log('hola')
    if( localStorage.getItem('pedidos') == null){
        localStorage.setItem('pedidos','[]');
    }
    let pedidos = JSON.parse( localStorage.getItem('pedidos') );
    pedidos.push( pedidoCliente );
    localStorage.setItem('pedidos',JSON.stringify(pedidos) );


}


function horaCreacion() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    // Check whether AM or PM
    var newformat = hours >= 12 ? 'PM' : 'AM'; 
    
    // Find current hour in AM-PM Format
    hours = hours % 12; 
    
    // To display "0" as "12"
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours + ':' + minutes + ' ' + newformat;
}



let btnNuevaCuente = document.querySelector('#btn-nueva-cuente');
btnNuevaCuente.addEventListener('click',()=>{
    console.log('first')

    let pedidoDisplay = document.querySelector('.cobrar-paso-1');
    pedidoDisplay.classList.remove('cobrar-paso-1-display-true');

    document.querySelector('.section-2 .ul-pedido').innerHTML = '';
    document.querySelector('.section-2 .total-p').innerHTML = 0;

    location.reload();
})






















