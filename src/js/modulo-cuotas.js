import { cargarContratanteConId } from "./http-providers";

const btnSeleccionar    = document.querySelector('#btn_seleccionar');
const opcionSelect      = document.querySelector("#opcionSelect");
const mod_opcion        = document.querySelector('#mod_opcion');
const mod_form          = document.querySelector('#mod_form');
const cuotas            = document.querySelector('#cuotas');
const fecha_desde       = document.querySelector('#fecha_desde');
const fecha_haste       = document.querySelector('#fecha_haste');
const form_cuotas       = document.querySelector('#form_cuotas');
const public_key        = 'pub_test_OD4iM2S55S7xbOEGdl3kCk04R0IryLN8'; 

let valor_cuota, fecha_cubierta, numero_cuotas;

btnSeleccionar.disabled = true;

for (let i = 0; i <= 12; i++) {
    cuotas.innerHTML += `<option value="${i}">${i}</option>`;
}


export const crearOpcionesHtml = ( contratantes ) =>{

    if (contratantes.length > 1) {

        contratantes.forEach(contratante => {
            const { id_contratante, pol_numero } = contratante;
            const htmlOption = `
                <div class="col mr-3">
                    <input type="radio" class="inputRadio" name="inputRadio" value="${id_contratante}">
                    <label for="inputRadio">${pol_numero}</label>
                </div>
            `;
            const div = document.createElement('div');
            div.classList.add('row');
            div.innerHTML += htmlOption;
            opcionSelect.append(div);
        });

        mod_opcion.style.display = 'block';
        mod_form.style.display = 'block';
        
    }else{
        const { id_contratante } = contratantes[0];
        mod_form.style.display = 'block';
        cargarContratanteConId( id_contratante ).then( data => cargardatosForm(data) )
    }

}

opcionSelect.addEventListener('click', (event) =>{
    const btnRadio = event.target.localName;
    if (btnRadio === 'input') {
        let id = event.target.value;
        cargarContratanteConId( id ).then(data => cargardatosForm( data ));
    }
});

const cargardatosForm = ( data ) =>{
    if(data.status){
        const { con_nombre, con_apellido, con_cedula,
                pol_numero, con_celular }   = data.Contratante[0];
        const { pol_mes, pol_cubierta }     = data.Poliza[0];

        document.querySelector('#nombre').value = con_nombre;
        document.querySelector('#apellido').value = con_apellido;
        document.querySelector('#cedula').value = con_cedula;
        document.querySelector('#poliza').value = pol_numero;
        document.querySelector('#total').value = `$ ${pol_mes}`;
        document.querySelector('#celular').value = con_celular;
        valor_cuota     = pol_mes;
        fecha_cubierta  = pol_cubierta;

    }else{
        console.log(data);
    }
}

cuotas.addEventListener('change', (event)=>{
    const num_cuota     = parseInt( event.target.value );
    const val_cuota     = parseInt( valor_cuota );
    const total         = num_cuota * val_cuota;
    numero_cuotas       = num_cuota;

    if (num_cuota !== 0) {
        document.querySelector('#total').value = `$ ${total}`;
        btnSeleccionar.disabled = false;
        fechaCubrimiento( fecha_cubierta, numero_cuotas );
    }else{
        document.querySelector('#total').value = `$ ${val_cuota}`;
        btnSeleccionar.disabled = true;
        fecha_desde.innerHTML = fecha_cubierta;
        fecha_haste.innerHTML = '';
    }
    
});

const fechaCubrimiento = ( dateCubierta, numCuotas ) =>{

    let cubrimiento = new Date(dateCubierta);
    cubrimiento.setMonth(cubrimiento.getMonth() + numCuotas);
    let dia = `${cubrimiento.getDate() + 1 }`.padStart(2,'0');
    let mes = `${cubrimiento.getMonth() + 1 }`.padStart(2,'0');
    let annio = cubrimiento.getFullYear();

    fecha_desde.innerHTML = dateCubierta;
    fecha_haste.innerHTML = `${annio}-${mes}-${dia}`;

}