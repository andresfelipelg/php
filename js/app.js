//variables
const d = document;
const carrito = d.querySelector('#carrito');
const contenedorCarrito = d.querySelector('#lista-carrito tbody');
const vaciarCarrito = d.querySelector('#vaciar-carrito');
const listaCursos = d.querySelector('#lista-cursos');
let articulosCarrito = [];

//eventos

cargarEventListeners();
function  cargarEventListeners () {
    listaCursos.addEventListener('click',agregarCurso);
}

carrito.addEventListener('click',eliminarCarrito);

vaciarCarrito.addEventListener('click', () =>{
    articulosCarrito = [];

    limpiarHTML();
}); 

//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCarrito(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //eliminar del arreglo articulo dle carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    }
    
    carritoHTML();
}

//leer contenido del HTML a lo que le damos click y extraer la informacionde l curso

function leerDatosCurso(curso) {
    //crear objeto con el curso actual
    const infoCurso = { 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }

    //revisar si un elemento existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
     if(existe){
         //actaulizamos la cantidad

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso;
            
            }else{
                return curso;
            } 
        })
     }else{
         //Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
     }
    carritoHTML(); 
     
}


function carritoHTML(){
    //limpiar el carritoHTML
    limpiarHTML();

    //recorre el carrito
    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = d.createElement('tr');
         row.innerHTML = `
         <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>  
          <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
          </td>         
        `;     
        
        //Agrega el HTML al carito

        contenedorCarrito.append(row);
    });
    
}



//eliminar curso del tbody

function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML= '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        
    }
}

