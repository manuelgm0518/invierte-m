<template>
  <div  class="container card p-3 mt-5">
    <div class="mt-3">
      <center>
        <h1 id="frase">¿Deseas iniciar un Proyecto que reditue ingresos? </h1>
      </center>
      <center>
      <h2 id="contorno">Aquí te damos unos consejos que te ayudarán</h2>
      </center>
    </div>
    <div>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab :title="item.titulo" v-for="item in sections" :key="item">
            <b-card-text>
              <ul>
                <li v-for="tip in item.tips" :key="tip">{{ tip }} </li>
              </ul>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="mt-3">
      <center>
        <h2 style="background: #fbcd18; border-radius:10px;   box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);">¿Qué avala los préstamos e inversiones?</h2>
      </center>
      <h4 class="ml-4">-Préstamos:</h4>
      <h4 class="ml-5">*Ley de operaciones y títulos de crédito</h4>
      <h4 class="ml-4">-Inversiones:</h4>
      <h4 class="ml-5">*Ley general de sociedades mercantiles</h4>
    </div>
  </div>
</template>

<script>
export default {
  name:'StartBusiness',
  data(){
    return{
      sections :[
        {
          titulo : '¿Cómo empezar?',
          tips: ['Desarrolla una idea', 'Prueba tu credibilidad', ' Escribe un plan de negocios', ' Determina la estructura legal',  'Seleciona el nombre de tu empresa']
        },
        {
          titulo:'¿Qué hacer?',
          tips: ['Identifica tu mercado', 'Determina los costos', 'Establece un presupuesto', 'Elige la locación adecuada', 'Da un servicio impecable al cliente']
        },
        {
          titulo:'Los inversionistas y tú',
          tips: ['Encuentra a los inversionistas adecuados', 'Escucha a los inversionistas', 'Sé flexible ante la probabilidad de cambio de tu idea', 'Evita las peleas con socios e inversionistas', 'No te preocupes por perder un porcentaje de la compañía']
        },
        {
          titulo:'¿Cómo seguir desarrollando mi proyecto?',
          tips: ['Arregla los libros de contabilidad', 'Ofrece nuevos productos o servicios', 'No te preocupes en exceso por tu economía', 'Encuentra a los empleados adecuados', 'Asigna resposabilidades']
        },
        {
          titulo:'Tomar en cuenta',
          tips: ['La patente puede esperar', 'Ignora a los negativos', 'Sé paciente', 'Ofrece una experiencia al cliente', 'No esperes el éxito de inmediato']
        }
      ]
    }
  }
}
</script>

<style scoped>
.nav-pills .nav-link.active,
.show>.nav-pills .nav-link{
    background: green !important
}
#frase{
  background: #fbcd18;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  width: 1050px;
  margin-bottom: 15px;
}
#contorno{
  margin-top: 0;
  padding: 7px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

</style>