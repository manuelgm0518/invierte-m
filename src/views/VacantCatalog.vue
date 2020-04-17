<template>
<b-container fluid class="my-3 my-md-5">
		<b-row class="px-2 px-md-5">
			<b-col cols="12" md="3">
				<b-card class="border-0 shadow text-center my-2">
					<span class="h3 font-weight-bold text-golden">Catálogo de Vacantes</span>
					<div class="my-3 text-left">
						Ordenar por
						<b-form-select
							v-model="order"
							:options="sorting"
							@change="getPages"
							size="sm"
							class="border-0 bg-silver"
						/>
					</div>

					<div class="my-3 text-left">
						Vacantes por página
						<b-form-spinbutton
							v-model="show"
							min="10"
							max="100"
							step="10"
							@change="getPages"
							size="sm"
							class="border-0 bg-silver"
						></b-form-spinbutton>
					</div>

					<div class="text-left">
						Página
						<b-pagination
							@input="changePage"
							v-model="actual"
							:total-rows="count"
							:per-page="show"
							size="sm"
							align="fill"
						></b-pagination>
					</div>
				</b-card>
			</b-col>

			<b-col>
				<b-row>
					<b-col
						cols="12"
						md="4"
						class="py-2"
						v-for="(vacant, i) in vacancies"
						v-bind:key="i"
						v-on:click="sendVacant(vacant._id)"
					>
						<b-card class="border-0 shadow item-card h-100">
							<span class="h4 font-weight-bold">{{vacant.name}}</span>
							<div class="text-muted">
								Negocio: {{ vacant.business.name }}
							</div>
							<div class="text-golden h5">
								${{vacant.monthlyPayment}} mensuales
							</div>
							
						</b-card>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</b-container>

</template>

<script>
import axios from 'axios';

export default {
	name: "VacantCatalog",
	data(){
		return {
				sorting: [
				{
					value: ["name", 1],
					text: "Nombre A - Z"
				},
				{
					value: ["name", -1],
					text: "Nombre Z - A"
				}
			],
			vacancies:[],
			count: 0,
			show: 10,
			actual: 1,
			pages:[],
			numPages:0,
			order:['name', 1]
		}
	},
	created(){
		axios.get('http://189.168.127.125/api/vacant/count')
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
			axios.post('http://189.168.127.125/api/vacant/interval', interval)
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
.item-card {
	transition: transform 0.2s;
}
.item-card:hover {
	transform: translateY(-0.5rem);
	cursor: pointer;
}



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