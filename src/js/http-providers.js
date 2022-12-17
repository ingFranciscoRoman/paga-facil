const app = 'http://localhost:9000';

const consultarContratante = async ( cedula, date ) =>{

    try {   

        const resp = await fetch( `${app}/ConsultaPoliza?cedula=${cedula}&fechaNaci=${date}` , {
            method: 'GET'
        });

        if (resp.ok) {
            return await resp.json();       
        }else{
            throw await resp.json();
        }
        
    } catch (error) {
        throw error;
    }

}

const cargarContratanteConId = async ( id ) =>{

    try {
        
        const resp = await fetch(`${app}/ConsultaContratantePoliza?id_contratante=${id}`);
        if (resp.ok) {
            return await resp.json();
        }else{
            throw await resp.json();
        }

    } catch (error) {
        throw error;    
    }

}  


export{
    consultarContratante,
    cargarContratanteConId
}

