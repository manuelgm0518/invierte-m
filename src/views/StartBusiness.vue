<template>
  <div>

      <b-form-group id="input-group-2" label="Nombre Comercial:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
        ></b-form-input>
      </b-form-group>

 <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

         <b-form-group id="input-group-2" label="Confirma tu contraseña:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.passwordconf"
          type="password"
          required
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" @click="samePass" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name:'StartBusiness',
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: '',
          passwordconf: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
       
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
       samePass(){
        var n = this.password.localeCompare(this.passwordconf);
        if(n != 0)
           alert("Las contraseñas ingresadas son diferentes");
       }
    }
  }
</script>