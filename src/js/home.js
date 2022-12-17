import { consultarContratante } from "./http-providers";
import { crearOpcionesHtml } from "./modulo-cuotas";
import '../css/home.css';

let form_login, login;

const home = () =>{

    const html = `
    <div id="login">
        <div id="contenedor_img">
            <img src="./assets/img/img_pago.jpg" alt="imagen login" id="imagen_logo">
        </div>
        <div id="contenedor_form_login">
            <form id="form_login">
                <h1>Paga Facil</h1>
                <br>
                <h2>¡Bienvenido de vuelta!</h2>
                <label for="usuarioId">Cedula Contratante</label>
                <br>
                <input type="number" class="form-control col-md-8" name="cc" id="cc" placeholder="N° documento del cliente" value="">
                <br>
                <label for="fechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" class="form-control col-md-8" name="fecha_nacimiento" id="fecha_nacimiento" placeholder="Fecha Nacimiento" value="">
                <br>
                <button type="submit" id="btn_consultar">Iniciar sesión</button>
            </form>
        </div>
    </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    mod_sesion.append(div);

    form_login  = document.querySelector('#form_login');
    login       = document.querySelector('#login');
    mod_opcion.style.display = 'none';
    mod_form.style.display = 'none';

}

const eventoInicio = () =>{

    form_login.addEventListener('submit', (event)=>{
        event.preventDefault();
        let cedula              = document.querySelector('#cc').value;
        let fecha_nacimiento    = document.querySelector('#fecha_nacimiento').value;

        consultarContratante(cedula, fecha_nacimiento)
            .then(resul => {
                if (resul.status) {
                    const polizas = resul.Polizas;
                    const contratantes = resul.Contratante;
                    let arrPolizas      = [];
                    let arrContratantes = [];

                    polizas.forEach(pol => {
                        if ( pol.Mensaje !== "Poliza Con mas de 90 días de mora") {
                            contratantes.forEach(con => {
                                if (pol.pol_numero === con.pol_numero) {
                                    arrPolizas.push(pol);
                                    arrContratantes.push(con);
                                }
                            });
                        }
                    });

                    crearOpcionesHtml(arrContratantes, arrPolizas);
                    login.style.display = 'none';

                }else{
                    alert(resul.data_solicitud);
                }
            });

    });
    
}

export const init = () =>{
    home();
    eventoInicio();
}
