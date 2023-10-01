
// Inicializa EmailJS
emailjs.init("ADIHRDij4Prttf7fB");

// Función para enviar el formulario de manera asincrónica
async function enviarFormulario() {
    try {
        // Obtiene los valores del formulario
        const nombre = document.querySelector("[name='nombre']").value;
        const apellido = document.querySelector("[name='apellido']").value;
        const email = document.querySelector("[name='email']").value;
        const telefono = document.querySelector("[name='telefono']").value;
        const formControl = document.querySelector("[name='form-control']").value;

        // Prepara los datos para enviar en el correo electrónico
        const emailData = {
            nombre,
            apellido,
            email,
            telefono,
            "form-control": formControl,
        };

        // Envia el formulario utilizando EmailJS y la plantilla de correo electrónico
        const response = await emailjs.send("service_68gss55", "template_pmt8n5m", emailData);

        console.log("Correo electrónico enviado con éxito", response);
        /* alert("Correo electrónico enviado con éxito"); */
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Correo enviado con éxito'
        })

        // Limpia los campos del formulario
        document.querySelector("[name='nombre']").value = "";
        document.querySelector("[name='apellido']").value = "";
        document.querySelector("[name='email']").value = "";
        document.querySelector("[name='telefono']").value = "";
        document.querySelector("[name='form-control']").value = "";
    } catch (error) {
        console.log("Error al enviar el correo electrónico", error);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Error al enviar el correo electrónico'
        })
    }
}

// Agrega un listener para el formulario
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Llama a la función para enviar el formulario de manera asincrónica
    enviarFormulario();
});


