<template>
	<div>
		<h1 style="padding-left: 10px;">Catálogo de Vacantes</h1>

		<p id="ordenarpor">Ordenar por <select v-model="order" v-on:change="getPages">
			<option v-bind:value="['name', 1]">Nombre A - Z</option>
			<option v-bind:value="['name', -1]">Nombre Z - A</option>
		</select></p>

		<p id="cantpagina">Vacantes por página <select v-model="show" v-on:change="getPages">
				<option value="30" selected>30</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select></p>

		<div class="vacanciesContainer">
			<div class="vacancies" v-for="(vacant, i) in vacancies" v-bind:key="i" v-on:click="sendVacant(vacant._id)">
				<div class="vacanciesName">
					{{ vacant.name }}
				</div>
				<div class="vacationMonthlyPayment">
					$ {{ vacant.monthlyPayment }} mensuales.
				</div>
				<div class="vacanciesBusiness">
					Negocio: {{ vacant.business.name }}
				</div>
			</div>
		</div>

		<ul class="pagination">
			<li><div class="paginationPage" v-on:click="changePage(actual - 1)">Anterior</div></li>
			<li v-for="(page, i) in pages" v-bind:key="i">
				<div class="paginationPage" v-if="page != actual" v-on:click="changePage(page)">{{page}}</div>
				<div class="paginationActual" v-if="page == actual">{{page}}</div>
			</li>
			<li><div class="paginationPage" v-on:click="changePage(actual + 1)">Siguiente</div></li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "VacantCatalog",
	data(){
		return {
			vacancies:[],
			count: 0,
			show: 30,
			actual: 1,
			pages:[],
			numPages:0,
			order:['name', 1]
		}
	},
	created(){
		axios.get('http://localhost:3000/api/vacant/count')
		.then(res => {
			this.count = res.data.count;
			this.getPages();
		});
	},
	methods:{
		getVacancies(){
			let interval = {
				min: (this.actual - 1) * this.show,
                max: (this.actual) * this.show,
				order:this.order
			};
			axios.post('http://localhost:3000/api/vacant/interval', interval)
			.then(res => {
				this.vacancies = res.data;
			});
		},
		getPages(){
			this.numPages = parseInt((this.count - 1) / this.show) + 1;
			this.pages = [];
			for(var i = this.actual - 4 > 1?this.actual - 4:1; i <= (this.actual + 5 <= this.numPages?this.actual + 5:this.numPages); i++)
				this.pages.push(i);
			this.getVacancies();
		},
		changePage(page){
			if(page >= 1 && page <= this.numPages && page != this.page){
				this.actual = page;
				this.getPages();
			}
		},
		sendVacant(_id){
			this.$router.push('/vacant/' + _id);
		}
	}
};
</script>

<style scoped>
#ordenarpor{
	background: #fbcd18;
	width: 270px;
	border-bottom-right-radius: 20px;
}
.vacanciesContainer{
	padding: 10px;
}
.vacancies{
	/* box-sizing: border-box;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
	border-radius: 5px;
	float: left;
	width: 20%;
	cursor: pointer; */
	box-sizing: border-box;
    width: 20%;
    margin-right: 3%;
    float: left;
    background: #fbcd18;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    cursor: pointer;
	height: 150px;
}
.vacancies:hover{
    background-color: #ddb514;
    transform: scale(1.03);
}
.vacanciesName{
	padding: 5px;
	font-family: Georgia, 'Times New Roman', serif;
	font-weight: bold;
	text-align: center;
}
.vacanciesBusiness{
	padding: 5px;
	text-align: center;
}
.pagination{
	clear: both;
	padding: 10px;
}
.paginationPage, .paginationActual{
	margin-right: 10px;
}
.paginationPage{
	color: rgb(104, 104, 255);
	text-decoration: underline;
	cursor: pointer;
}
.paginationPage:hover{
	color: blue;
}
.vacationMonthlyPayment{
	color: rgb(251, 205, 24);
	text-align: center;
}
h1 {  
  text-align: center;
  font-size: 72px;  
  background: -webkit-linear-gradient(left top, #fb9918, yellow);
  background: linear-gradient(to bottom right, #fb9918, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
} 
#cantpagina{
    background: rgb(204, 200, 200);
    padding: 3px;
    width: 270px;
	border-bottom-right-radius: 20px;
}
</style>