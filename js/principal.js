window.addEventListener('load', function(){
    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const alogout = this.document.getElementById('logout');
    // recuperar nombre de usuario
    const result = JSON.parse(localStorage.getItem('result'));
    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.usuario}`);

    alogout.addEventListener('click', function(e) {
        e.preventDefault();
        ocultarAlerta()
        confirmarLogout();
    });
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}
function ocultarAlerta() {
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}

function confirmarLogout() {
    Swal.fire({
        title: "¿Desea Cerrar Sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Exito!",
                text: "Cerrando Sesión",
                icon: "success"
            });
            logout();
        }
    });
}

async function logout() {
    const result = JSON.parse(localStorage.getItem('result'));
    //Probamos que la variable result cuente con los datos necesarios
    console.log(result);
    if (!result || !result.tipoDocumento || !result.numeroDocumento) {
        mostrarAlerta('Error: No hay datos de sesión iniciada');
        return;
    }
    const url = 'http://localhost:8082/login/logout-async';
    const request = {
        tipoDocumento: result.tipoDocumento,
        numeroDocumento: result.numeroDocumento,
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        });
        if (!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema al cerrar sesion');
            throw new Error('Error al momento de cerrar sesión');
        }
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);
        if (result.resultado) {
            localStorage.removeItem('result');
            mostrarAlerta('Redirigiendo a inicio de sesión');
            setTimeout(() => {
                window.location.replace('index.html');
            }, 3000);
        } else {
            mostrarAlerta(`Error: ${result.mensaje}`);
        }
    } catch (error) {
        console.error('Error durante el logout:', error);
        mostrarAlerta('Error en la respuesta del servidor. Vuelva a intentarlo');
    }
}