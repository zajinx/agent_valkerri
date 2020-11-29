<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
            <v-data-table
            :headers="headers"
            :items="tickets"
            :options.sync="options"
            :server-items-length="totalTickets"
            :loading="loading"
            :item-class="itemRowBackground"
            class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>My Tickets</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="green"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        New Item
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.subject"
                                label="Subject"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.type"
                                label="Type"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.way"
                                label="Way"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.priority"
                                label="Priority"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.status"
                                label="Status"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>

              </template>

            </v-data-table>
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name:'tickets',
      data: () => ({        
        totalTickets: 0,
        tickets: [],
        loading: true,
        options: {},
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Id',value: 'id'},
      { text: 'Subject',value: 'subject'},
      { text: 'Type', value: 'type' },
      { text: 'Way', value: 'way' },
      { text: 'Priority', value: 'priority' },
      { text: 'Status', value: 'status' },
      { text: 'Created_at',value: 'created_at'},
      { text: 'Updated_at',value: 'updated_at'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
      subject: '',
      type: "incident",
      way: "remote",
      priority: "low",
      status: "new",
    },
    defaultItem: {
      subject: '',
      type: "incident",
      way: "remote",
      priority: "low",
      status: "new",
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
  },



  methods: {
    getDataFromApi () {
      console.log("getDataFromApi")
        this.loading = true
        window.ipcRenderer.invoke('get-tickets', this.options).then((result) => {
          console.log("getDataFromApi result:",result.data)
          this.tickets = result.data
          this.totalTickets = result.recordsTotal
          this.loading = false
        })
      },
    itemRowBackground: function (item) {
      if(item.status == "New" )          
        return 'red black--text';
      if(item.status == "InProgress" )          
        return 'orange black--text';
      if(item.status == "Resolved" )          
        return 'green black--text';
    },
    editItem (item) {
      this.editedIndex = this.tickets.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },


    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },



    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tickets[this.editedIndex], this.editedItem)
      } else {
        this.tickets.push(this.editedItem)
      }
      this.close()
    },
  },
  created() {
    console.log("created ")
    window.ipcRenderer.invoke('getStoreValue', 'tickets').then((result) => {
        console.log("created getStoreValue result:",result.data)
        this.tickets = result.data
      }); 
        
  }

  }
</script>
