<template>
  <v-container>
    <v-row >
      <v-col cols="12">
        <v-card
    class="mx-auto"
    max-width="434"
    tile
  >
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar v-if="user"
            class="profile"
            color="grey"
            size=164
            tile
          >
            <avatar :rounded="false" :username="user.name" :size=164 ></avatar>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content v-if="user">
              <v-list-item-title class="title">
                {{user.name}}
              </v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
import Avatar from 'vue-avatar'
  export default {
    name: 'profile',
    components: {
      Avatar
    },
    data: () => ({
      user: null,
      }),
    created() { 
              window.ipcRenderer.invoke('getStoreValue', 'token.user').then((result) => {
                console.log(result)
                this.user = result
            });  
        }
  }
</script>
