//articulos
let moreArticles = document.querySelector('.fa-circle-plus');


let seletc = document.querySelector('#cars')
let form = document.querySelector('form');
let btnForm = document.querySelector('#send-form');
let file = document.querySelector('#img-file');

let btnnuevaVariante = document.querySelector('#nueva-variante');
let precios = document.querySelector('.precios');

let btnnuevaIngredienteAdicional = document.querySelector('#nuevo-ingrediente-adicional');
let inputsIngredientesAdicionales = document.querySelector('.Ingredientes-adicionales');



btnForm.addEventListener('click',(e)=>{
    e.preventDefault();
    let id = new Date();

    // let resp = createImg();

    // console.log( resp );


    let articulo = {
        img: getImg(), 
        nombre: articuloNombre(),
        categoria: seletc.value,
        precio: articuloPrecios(),
        ingredientesAdicionales: ingredientesAdicionales(),
        id: id.getTime(),
    }
    // console.log( document.querySelector('img').currentSrc )
    // console.log( articulo.img)
    if( localStorage.getItem('articulos') == null){
        localStorage.setItem('articulos', '[]');
    }

    // let data = document.querySelector('img');

    // console.log( {data} )

    // localStorage.setItem('articulos', JSON.stringify( [articulo] ) );


    let db = JSON.parse( localStorage.getItem('articulos') );
    db.push(articulo);
    localStorage.setItem('articulos',JSON.stringify( db ) );		


    location.reload();

});

const articuloNombre = () =>{
    return document.querySelector('#nombre').value;
}
const articuloCategoria = () =>{
    seletc.innerHTML = '';
    let categories =  JSON.parse( localStorage.getItem('categories') );
    for(let i = 0; i  < categories.length; i++){
        seletc.innerHTML += `<option value="${categories[i]}">${categories[i]}</option>`;
    }
}
const articuloPrecios = () =>{

    let precios = {}
    let variantes_ = [];
    let variantePrecios_ = [];
    let variantes_YvariantePrecios_ = [];

    
    let variantes = document.querySelectorAll('#variante');
    const nodelistToArray = Array.apply(null, variantes);
    let variantePrecios = document.querySelectorAll('#precio');
    const nodelistToArray2 = Array.apply(null, variantePrecios);

    nodelistToArray.map(variante =>{
        variantes_.push(variante.value);
    });
    nodelistToArray2.map(variantePrecio =>{
        variantePrecios_.push(variantePrecio.value);
    });

    // console.log( variantes_,variantePrecios_ );

    for( let i = 0; i <variantes_.length;i++){
        variantes_YvariantePrecios_.push([variantes_[i],variantePrecios_[i]]);
    }

    let obj = Object.fromEntries( variantes_YvariantePrecios_ );

    return obj;
}

const ingredientesAdicionales = () =>{

    let ingredienteAdicional = [];
    let precioDelIngredienteAdicional = [];
    let ingredienteAdicionalYPrecio = [];

    
    let ingredientesAdicionales = document.querySelectorAll('#adicional');
    const nodelistToArray = Array.apply(null, ingredientesAdicionales);
    let preciosIngredientesAndicionales = document.querySelectorAll('#adicional-precio');
    const nodelistToArray2 = Array.apply(null, preciosIngredientesAndicionales);

    nodelistToArray.map(ingrediente =>{
        ingredienteAdicional.push(ingrediente.value);
    });
    nodelistToArray2.map(ingredientePrecio =>{
        precioDelIngredienteAdicional.push(ingredientePrecio.value);
    });

    // console.log( variantes_,variantePrecios_ );

    for( let i = 0; i <ingredienteAdicional.length;i++){
        ingredienteAdicionalYPrecio.push([ingredienteAdicional[i],precioDelIngredienteAdicional[i]]);
    }

    let obj = Object.fromEntries( ingredienteAdicionalYPrecio );

    return obj;
}


// const createImg = () =>{
//     let imagen = file.files[0];
//     let fileReader = new FileReader();
//     fileReader.readAsDataURL(imagen);
//     fileReader.onload = function(){
//         // document.querySelector('img').src = fileReader.result;
//         let res = fileReader.result.split(',')[1];
//        localStorage.setItem('img', JSON.stringify( res ) );

//        return res;

//     } 
//     // let imagen = file.files[0];
//     // return imagen;

// }
const getImg = () =>{
    return document.querySelector('#img-file').value;
}





btnnuevaVariante.addEventListener('click',(e)=>{
    e.preventDefault();

    precios.innerHTML += `
        <input type="text" id="variante" placeholder="Variante del producto">
        <input type="number" id="precio" placeholder="Precio de la Variante">
    `;
});

btnnuevaIngredienteAdicional.addEventListener('click',(e)=>{
    e.preventDefault();

    inputsIngredientesAdicionales.innerHTML += `
    <input type="text" id="adicional" placeholder="Ingredientes adicionales">
    <input type="number" id="adicional-precio" placeholder="precio del ingrediente adicional">
    `;
})






articuloCategoria();


console.log( document.querySelector('select').value )