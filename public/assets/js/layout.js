$(document).ready(function(){

    $(".eliminar").on("click",function(){

        event.preventDefault();
        const nombre = $(this).data("nombre")
        const confirmar =confirm(`Seguro que deseas eliminar a ${nombre}`)
        
        if(confirmar){
        
            $(`button[data-nombre="${nombre}"]`).parents().submit()
           
        }
    })








})