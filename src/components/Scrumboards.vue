<template>
  <div>
    <b-container>
      <h1 class="display-1 font-weight-bold">Scrumboards</h1>
      <p class="lead">Retrouvez ici la liste de vos scrumboards.</p>
      <b-button id="show-btn" @click="showModal" variant="dark" class="dark mb-3  border rounded-0 outline-dark" >Ajouter</b-button>

        <b-modal ref="my-modal" hide-footer title="Ajouter un scrumboard">
          <div class="d-block">
            <b-form @submit="add">
               <b-form-group
               label="Nom :">
              <b-form-input
                v-model="form.scrumTitle"
                required
                placeholder="Nom du scrumboard"
              ></b-form-input>
               </b-form-group>
               <b-form-group
               label="Type :">
              <b-form-select 
              v-model="form.scrumType" 
              :options="options">
              </b-form-select>
               </b-form-group>
               <b-form-group
               label="Description :">
               <b-form-textarea
                id="textarea-no-resize"
                v-model="form.scrumDesc"
                placeholder="Description du scrumboard"
                rows="3"
                no-resize
              ></b-form-textarea>
               </b-form-group>
               <b-form-group
               label="Clé :">
              <b-form-input
                v-model="form.scrumKey"
                required
                placeholder="Définissez une clé (ex: SCB)"
              ></b-form-input>
               </b-form-group>
              <b-button type="submit" variant="primary" class="ml-3">Ajouter</b-button>
            </b-form>
            </div>
          </b-modal>
      <b-table striped hover :items="scrumAPI" :fields="scrumFields">
        <template #cell(_id)="data">
            <b-button variant="primary" :to="'/scrumboard/'+data.value"><b-icon-search></b-icon-search></b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import ScrumboardDataService from '../services/ScrumboardDataService';
import Vue from 'vue';

export default {
  name: "Scrumboards",
  currentUser: "",
  data() {
    return {
    title: '',
    options: [
      { value: null, text:'Type de projet', disabled: true},
      { value: 'TP', text: 'TP'},
      { value: 'Projet personnel', text: 'Projet personnel'}
    ],
    form: {
      scrumTitle: "",
      scrumKey: "",
      scrumType: "",
      scrumDesc: "",
    },
    scrumAPI:[],
    scrumFields: [
        {
          key: "name",
          label: "Nom",
          sortable: true,
        },
        {
          key: "key",
          label: "Clé",
          sortable: false,
        },
        {
          key: "type",
          label: "Type",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: false,
        },
        {
          key: "_id",
          label: "Actions",
          sortable: false,
        }
      ],
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    }, 
    add: function () {
      const data = {
        name: this.form.scrumTitle,
        key: this.form.scrumKey,
        type: this.form.scrumType,
        description: this.form.scrumDesc,
        creatorId: this.currentUser._id
      };
      console.log("task data:" + data);
      ScrumboardDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.scrumAPI.push(response.data);
        })
        .catch((e) => {
          console.log(e);
          this.errMessage = "Erreur";
        });
    },
  },
  created() {
    this.currentUser = Vue.getCurrentUser();
  },
  mounted() {
    ScrumboardDataService.getAll()
      .then((response) => {
        this.scrumAPI = response.data;
        console.log("all scrums:" + JSON.stringify(response.data));
      }).catch(e => console.log(e));
  }
};
</script>

<style >
</style>