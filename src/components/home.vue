<template>
  <v-container>
    <v-row v-if="user">
      <v-col>
        <v-card width="400">

        <v-app-bar
            flat
           
          >
            <v-toolbar-title class="title">
              Latest
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item link to="/tickets">
                  <v-list-item-title>Details</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/tickets">
                  <v-list-item-title>Go to tickets</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>

          <v-card-title >
            <v-icon>mdi-ticket-confirmation</v-icon>            
           
              Instalare office
            
          </v-card-title>
        

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Log
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
      </v-col>
      <v-col>
        Notification
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'home',
data: () => ({
      user: null,
      messages: [
        {
          from: 'You',
          message: `Am nevoie de office 2019`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Office instalat',
          time: '10:37am',
          color: 'green',
        },

      ],
    }),
  }
</script>
