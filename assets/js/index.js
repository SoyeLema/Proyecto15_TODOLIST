//arreglo inicial//
let tasks = [
    { id: getRandom(), name: "Hacer Mercado", checked: true },
    { id: getRandom(), name: "Estudiar para la prueba", checked: false },
    { id: getRandom(), name: "Sacar a pasear a Tobby", checked: false },
];

//arreglos vacios para tareas pendientes y realizadas//
let pending = []
let readys = []


//SE DECLARAN LAS VARIABLES
const form = document.querySelector("#form");
const newTask = document.querySelector("#newTask");
const total = document.querySelector("#total");
const pendientes = document.querySelector("#pending");
const done = document.querySelector("#done");
const terminadas = document.querySelector("#ready");
const totalP = document.querySelector("#tpending")

//--------------------------------------------------------------------------------//

//SE ESTABLECE LA FUNCION RENDER PARA GUARDAR EL CODIGO DE ACTUALIZACIÓN DE LA LISTA

function renderList() {
    pendientes.innerHTML = "";
    terminadas.innerHTML = "";
    pending = tasks.filter(f => f.checked == false);
    readys = tasks.filter(f => f.checked == true);
    listP = "";

    for (let task of pending) {
        listP +=
            `
    <tr class="list">
        <td class="identif">${task.id}</td>
        <td class="descr">${task.name}</td>
        <td class="realiz"><i class="fa-regular fa-square" id="boxx" onclick="check(${task.id})"></i></td>
        <td class="eliminar"><i class="fa-solid fa-x" id="iconox" onclick="borrar(${task.id})"></i></td>
        </tr>
        `;
    };
    pendientes.innerHTML = listP;
    listR = "";

    for (let task of readys) {
        listR +=
            `
            <tr class="list">
            <td class="identif">${task.id}</td>
            <td class="descr">${task.name}</td>
                <td class="realiz"><i class="fa-regular fa-square-check" id="boxx" onclick="check(${task.id})"></i></td>
                <td class="eliminar"><i class="fa-solid fa-x" id="iconox" onclick="borrar(${task.id})"></i></td>
            </tr>
        
        `;
    };
    terminadas.innerHTML = listR;
    totalP.innerHTML = pending.length;
    done.innerHTML = readys.length;
    total.innerHTML = pending.length + readys.length;
};

//--------------------------------------------------------------------------------//

//SE DEFINE LA FUNCIÓN NECESARIA PARA GENERAR ID RANDOM//
function getRandom(min, max) {
    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//SE DEFINE EL EVENTO PARA EL BOTÓN "AGREGAR TAREA"//
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (newTask.value != "") {
        tasks.push({
            id: getRandom(),
            name: newTask.value,
            checked: false //las tareas se agregan por defecto con el valor de la propiedad checked en false//
        });
        renderList();//se actualiza la lista nuevamente por medio del render//
        newTask.value = "";
    } else {
        alert("Debes ingresar una tarea para agregar a la lista.")
    }
});
//--------------------------------------------------------------------------------//

// AHORA SE ESTABLECEN LAS FUNCIONES PARA LOS BOTONES DENTRO DE LA LISTA //

//ICONO CHECKBOX TAREA REALIZADA//
function check(id) {
    let revisar = tasks.findIndex(task => task.id == id); //se crea una variable para guardar la búsqueda por id de la tarea específica a la que se hace click dentro del arreglo de tareas//
    done.innerHTML = "";
    //se valida si aquella tarea específica obtenida por id presenta la propiedad checked con valor false y de ser así, cambia a true//
    if (tasks[revisar].checked == false) {
        tasks[revisar].checked = true;
    } else {
        tasks[revisar].checked = false;
    };
    renderList(); //se corre nuevamente el render de la lista completa para actualizar los cambios en la página//
};


//BOTON ELIMINAR TAREA//
const borrar = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderList();
};

//--------------------------------------------------------------------------------//

// SE ACTUALIZA LA LISTA PARA LA PRIMERA VEZ AL CARGAR LA PÁGINA//
//ESTO OCURRE LUEGO DE CARGAR LAS FUNCIONES Y CONSTANTES POR PRIMERA VEZ//
renderList();