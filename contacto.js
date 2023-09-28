// Inicializa EmailJS 
emailjs.init("ADIHRDij4Prttf7fB"); 

// Agrega un listener para el formulario
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Obtiene los valores del formulario
    const nombre = this.querySelector("[name='nombre']").value;
    const apellido = this.querySelector("[name='apellido']").value;
    const email = this.querySelector("[name='email']").value;
    const telefono = this.querySelector("[name='telefono']").value;
    const formControl = this.querySelector("[name='form-control']").value;

    // Prepara los datos para enviar en el correo electrónico
    const emailData = {
        nombre,
        apellido,
        email,
        telefono,
        "form-control": formControl,
    };

    // Envia el formulario utilizando EmailJS y la plantilla de correo electrónico
    emailjs.send("service_68gss55", "template_pmt8n5m", emailData)
        .then(function(response) {
            console.log("Correo electrónico enviado con éxito", response);
            alert("Correo electrónico enviado con éxito");

            // Limpia los campos del formulario
            document.getElementById("myForm").reset();
        }, function(error) {
            console.log("Error al enviar el correo electrónico", error);
            alert("Error al enviar el correo electrónico");
        });
});
