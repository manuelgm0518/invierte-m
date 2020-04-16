<template>
<div>
    <div>
        <div>
            <div id="separacion">
                <div class="caja">
                    <div class="borde">
                        <p class="titulo">¿Qué es InvierteM?</p> 
                        <p class="cuadro">Es una plataforma digital que tiene como principal objetivo impulsar el crecimiento y desarrollo de pequeñas y medianas empresas en México a través de préstamos o inversiones recibidas, las cuales serán aportadas por los capitalistas interesados que tendrán beneficios económicos a través de dividendos o rendimientos.</p> 
                    </div>
                    <div class="borde">
                        <p class="titulo">¿Por qué nosotros?</p>
                        <p class="cuadro">Tenemos la convicción de que ayudando a las empresas a crecer a través de nuestra plataforma ya sea mediante recursos y/o activos ofrecidos por los usuarios, un área de solicitudes de trabajadores, difusión y sección de ventas de sus productos, etc. Las empresas llegarán a tener un nivel más competitivo y así reducirán su vulnerabilidad contra la competencia.</p>
                    </div>
                </div>       
                <div class="caja">
                    <div class="borde">
                        <p class="titulo">MISION</p>
                        <p id="mision">PROPORCIONAR LAS HERRAMIENTAS E INFORMACIÓN ADECUADA  A FIN DE FACILITAR A LOS CAPITALISTAS LA ELECCIÓN DE INVERTIR,  IMPULSANDO EL CRECIMIENTO FINANCIERO DE LAS EMPRESAS.</p>
                    </div>
                    <div class="borde">
                        <p class="titulo">VISION</p>
                        <p id="vision">SER LA PLATAFORMA WEB DE BANGUARDIA MAS UTILIZADA POR LOS INVERSIONISTAS Y LAS EMPRESAS COMO PRIMERA OPCIÓN PARA GENERAR RECURSOS Y REACTIVAR SU ECONOMÍA.</p>
                    </div>
                    <div class="borde">
                        <p class="titulo">VALORES</p>
                        <p id="valores">HONESTIDAD, SERVICIO, RESPONSABILIDAD, LEALTAD, RESPETO, CREATIVIDAD</p>
                    </div>
                </div >

                <div class="caja todo">
                    <img class="imag" src="../assets/leon.jpeg" alt="">
                    <img class="imag" src="../assets/leon.jpeg" alt="">
                    <img class="imag" src="../assets/leon.jpeg" alt="">
                    <img class="imag" src="../assets/jc.jpeg" alt="">
                </div>
                
            </div>
        </div>
    </div>
</div>
    

</template>

<script>
export default {
    
}
</script>

<style scoped>
.todo{
    background: #fbcd18;
    border: 4px solid black;
    border-radius: 10px;
    width: 160px;
    margin-top: 25px;
    box-shadow: 16px 15px 13px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 16px 15px 13px 0px rgba(0,0,0,0.75);
    box-shadow: 16px 15px 13px 0px rgba(0,0,0,0.75);
}

.imag{
    width: 120px;
    height: 120px;
    border-radius: 80px;
    border:4px solid #000;
    /* margin: 5px 30px; */
    margin: 0% 10%;
}
#valores{
    text-align: center;
    width: 450px;
    height: 90px;
    border: gray;
    background: #fbcd18;
    font-size: 17px;
    margin: 0;
}
#vision{
    text-align: center;
    width: 450px;
    height: 135px;
    border: gray;
    background: #fbcd18;
    font-size: 17px;
    margin: 0;
}
#mision{
    text-align: center;
    width: 450px;
    height: 118px;
    border: gray;
    background: #fbcd18;
    font-size: 17px;
    margin: 0;
}
#separacion{
    display: flex;
    justify-content: space-between;
    /* display: inline-block; 
    margin: 0% 15%; */
    
}
.caja{
    margin-left: 25px;
    display: flex;
    display: inline-block;
}
.cuadro{
    text-align: center;
    width: 450px;
    height: 200px;
    border: gray;
    background: #fbcd18;
    font-size: 17px;
    margin: 0;
}
.borde{
    margin-top: 25px;
    border: 4px solid black;
    border-radius: 10px;
    box-shadow: 16px 15px 13px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 16px 15px 13px 0px rgba(0,0,0,0.75);
    box-shadow: 16px 15px 13px 0px rgba(0,0,0,0.75);
    

}
.titulo{
    font-weight: bold;
    text-align: center;
    width: 450px;
    background: rgb(163, 159, 159);
    margin: 0;
}
</style>