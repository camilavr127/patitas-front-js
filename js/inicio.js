//Se ejcuta cuando la pagina se ha cargado completamente
// document.addEventListener('DOMContentLoaded', {});
// <script type="module" src="js/inicio.js" defer></script>
window.addEventListener('load',function(){
    const tipoDocumento = this.document.getElementById('tipoDocumento');
    const numeroDocumento = this.document.getElementById('numeroDocumento');
    const password = this.document.getElementById('password');
    const msgError = this.document.getElementById('msgError');
    const btnIngresar = this.document.getElementById('btnIngresar');

    btnIngresar.addEventListener('click', function(){
        if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' ||
        numeroDocumento.value.trim() === '' || numeroDocumento.value === '' ||
        password.value.trim() === '' || password.value === null){
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }
        ocultarAlerta();
        });
});

function mostrarAlerta(mensaje){
    msgError.textContent = mensaje;
    msgError.style.display = 'block';
}

function ocultarAlerta(){
    msgError.style.display = 'none';
}