// Función para crear un libro
function crearLibro(titulo, autor) {
    return {
        titulo,
        autor,
        prestado: false,
    };
}

// Función para agregar un libro a la biblioteca
function agregarLibro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    if (titulo && autor) {
        const nuevoLibro = crearLibro(titulo, autor);
        biblioteca.push(nuevoLibro);
        guardarEnLocalStorage();
        mostrarBiblioteca();
    } else {
        Swal.fire({
            title: "Error",
            text: "Por favor ingrese todos los datos correspondientes",
            icon: "error"
        });
    }
}

// Mostrar todos los libros en la biblioteca
function mostrarBiblioteca() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "<h2>Biblioteca:</h2>";

    biblioteca.forEach((libro, index) => {
        const infoLibro = document.createElement('p');
        infoLibro.textContent = `${index + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}, Prestado: ${libro.prestado ? 'Sí' : 'No'}`;
        
        //  Botón para cambiar el estado 
        const cambiarEstadoButton = document.createElement('button');
        cambiarEstadoButton.textContent = libro.prestado ? 'Devolver' : 'Prestar';
        cambiarEstadoButton.addEventListener('click', function () {
            cambiarEstadoLibro(index);
        });

        infoLibro.appendChild(cambiarEstadoButton);

        resultadoDiv.appendChild(infoLibro);
    });
}

// Mostrar libros según su estado de préstamo
function mostrarLibrosPorEstado(morstrarlibros) {
        
    const estadoSeleccionado = document.getElementById('filtrarEstado').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "";

    let librosFiltrados = [];

    switch (estadoSeleccionado) {
        case 'prestados':
            librosFiltrados = biblioteca.filter(libro => libro.prestado);
            break;
        case 'disponibles':
            librosFiltrados = biblioteca.filter(libro => !libro.prestado);
            break;
        default:
            librosFiltrados = biblioteca;
    }

    librosFiltrados.forEach((libro, index) => {
        const infoLibro = document.createElement('p');
        infoLibro.textContent = `${index + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}`;
        resultadoDiv.appendChild(infoLibro);
    });
}

// Función para cambiar el estado de un libro (prestado/devuelto)
function cambiarEstadoLibro(indiceLibro) {
    const libro = biblioteca[indiceLibro];

    if (libro) {
        libro.prestado = !libro.prestado; // Cambia el estado

        guardarEnLocalStorage();
        mostrarBiblioteca();
    } else {
        alert("No se encontró el libro en la biblioteca.");
    }
}

function cargarDesdeLocalStorage() {
    const bibliotecaGuardada = localStorage.getItem('biblioteca');
    if (bibliotecaGuardada) {
        biblioteca = JSON.parse(bibliotecaGuardada);
        mostrarBiblioteca();
    }}

// Función para guardar la biblioteca en el almacenamiento local
function guardarEnLocalStorage() {
    localStorage.setItem('biblioteca', JSON.stringify(biblioteca));
}

// Función para cargar la biblioteca desde el archivo JSON local
let biblioteca = [];

fetch('js/libros.json')  
  .then(res => {
    return res.json
  })
  .then(librosJson => {
    librosJson.forEach(libro => {
        biblioteca.push(libro)
    })
    mostrarBiblioteca()
  })


// Inicializar la biblioteca al cargar la página

cargarDesdeLocalStorage();

// Detección de eventos al presionar Enter en los campos de texto
document.getElementById('titulo').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        agregarLibro();
    }
});

document.getElementById('autor').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        agregarLibro();
    }
});

// Detección de eventos al cambiar la opción de filtrado
document.getElementById('filtrarEstado').addEventListener('change', function () {
    mostrarLibrosPorEstado();
});
