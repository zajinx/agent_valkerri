<template>
  <v-container>
    <v-row >
      <v-col>
        <v-list
              two-line
              subheader
            >
            <v-list-item>
                <v-list-item-content class="text-center">
                  <v-list-item-title>QR code </v-list-item-title>
                  <v-list-item-subtitle>
                    <img src="data:image/png;base64,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" alt="hardware-495">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
        </v-list>
        
      </v-col>
      <v-col>
           <v-list
              two-line
              subheader
            >
              <v-subheader>details</v-subheader>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>name</v-list-item-title>
                  <v-list-item-subtitle>PC01-WOW</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>cpu</v-list-item-title>
                  <v-list-item-subtitle>AMD Ryzen 5 PRO 4650U with Radeon Graphics</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ram</v-list-item-title>
                  <v-list-item-subtitle>15.3 GB</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>gpu</v-list-item-title>
                  <v-list-item-subtitle>AMD Radeon(TM) Graphics</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>mb</v-list-item-title>
                  <v-list-item-subtitle>HP 8760 KBC Version 07.27.00</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>hdd</v-list-item-title>
                  <v-list-item-subtitle>WDC PC SN520 SDAPNUW-512G-1006 512.1 GB</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>sn</v-list-item-title>
                  <v-list-item-subtitle>5CG0386JZZ</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>user</v-list-item-title>
                  <v-list-item-subtitle>Marcus.Obrien</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>type</v-list-item-title>
                  <v-list-item-subtitle>laptop</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>model</v-list-item-title>
                  <v-list-item-subtitle>HP HP EliteBook 845 G7 Notebook PC</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>antivirus</v-list-item-title>
                  <v-list-item-subtitle>Bitdefender Endpoint Security Tools Antimalware</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>os</v-list-item-title>
                  <v-list-item-subtitle>Windows 10 Pro x64, version 2009</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>expires_at</v-list-item-title>
                  <v-list-item-subtitle>2020-11-12 00:00:00</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>installed_at</v-list-item-title>
                  <v-list-item-subtitle>2020-11-12 00:00:00</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>acquired_at</v-list-item-title>
                  <v-list-item-subtitle>2020-11-12 00:00:00</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>


            </v-list>

      </v-col>
   
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: 'computer',

  }
</script>
