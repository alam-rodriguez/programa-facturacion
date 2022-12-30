let buttonMenu = document.querySelector('.fa-bars');
let nav = document.querySelector('.nav-menu-ul');


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

let pedidos = JSON.parse( localStorage.getItem('pedidos') );
let ulPedidos = document.querySelector('.ul-pedidos');
let fecha;
let horaCreacion;
// console.warn( pedidos )
if( pedidos != null){
    pedidos.forEach(pedido => {
        console.warn(pedido);
        
        let precio = 0;
        
        
        let id;
        document.querySelector
        pedido.forEach(pedidoItem=>{
            console.log(pedidoItem.nombreArticulo )
            precio += pedidoItem.total;
            horaCreacion = pedidoItem.horaCreacion;
            id = pedidoItem.id;
            fecha = pedidoItem.fechaCreacion;
        });
        ulPedidos.innerHTML += `
            <li id="${id}">
            <i class="fa-solid fa-money-bills"></i>
                <div class=""> 
                    <p class="precio">${precio}</p>
                    <p class="hora">${horaCreacion}</p>
                </div>
                <div>
                    <p class="id"></p>
                </div>
            </li>
        `; 
    });
}

let factura = document.querySelector('.factura-div');

let list = document.querySelectorAll('.ul-pedidos li');
list.forEach((item)=>{
    item.addEventListener('click',()=>{
        let pedidoHtml;
        let pedidos = JSON.parse( localStorage.getItem('pedidos') );
        pedidos.forEach(pedido=>{
            pedido.forEach((pedidoItem)=>{
                console.log( pedido.id )
                if(pedidoItem.id == item.id )
                pedidoHtml = pedidoItem.html;
            });

        });
        

        console.log(item.id);

        // let li = document.querySelectorAll('.section-1 li');
        // console.log( {li} );

        let section2 = document.querySelector('.section-2').classList.add('section-2-display-true');
        
        factura.innerHTML = `
            <div class="factura-header">
                <div>
                    <p>Pizza Mia</p>
                </div>
                <div>
                    <p>Pizza mia Suc.guerra</p>
                    <p>Calle Sanchez frente al parque central de guerra. Whatsap 809-230-7294 / 829-637-7294</p>

                    <div>
                        <p>Cajero: Alam Rodriguez</p>
                        <p>TPV: PIZZERIA</p>
                    </div>
                </div>

            </div>` + pedidoHtml +
            `
            <hr>
            <p>Gracias por preferirnos</p>
            <div>
                <p>${fecha}, </p>
                <p>${horaCreacion}</p>
            </div>`;
        // console.warn( pedidoHtml )
    });

});


let atrasPedido = document.querySelector('.section-2 .fa-left-long');
atrasPedido.addEventListener('click',()=>{
    let section2 = document.querySelector('.section-2').classList.remove('section-2-display-true');
})
