<template>
  <div class="app">
    <label>輸入eBird Apikey </label>
    <input type="text" v-model="ebirdKey" />
    <button @click="saveKey">Save</button>
    <button @click="download('45197')">Click</button>
  </div>
</template>

<script>
import { AppName, AppVersion } from './config'
import { sp_info } from './data/sp_info'
import { breeding_code } from './data/breeding_code'

export default {
  name: 'app',
  data() {
    return {
      AppName,
      AppVersion,
      sp_info,
      breeding_code,
      ebirdKey: '',
    }
  },
  mounted() {
    console.log(breeding_code)
    this.ebirdKey = localStorage.getItem('ebirdKey') || ''
  },
  created() {
    try {
      const lis = document
        .getElementById('my-reports-items')
        .getElementsByTagName('li')
      for (const element of lis) {
        const id = element.getElementsByClassName('Heading Heading--h4')[0].id
        const button = document.createElement('button')
        button.textContent = id
        button.addEventListener('click', e => this.download(id))
        element.append(button)
      }
    } catch (e) {
      //console.log(e)
    }
  },
  methods: {
    saveKey() {
      localStorage.setItem('ebirdKey', this.ebirdKey)
    },
    async download(id) {
      const rep = await this.$http.get(
        `https://ebird.org/tripreport-internal/v1/checklists/${id}`
      )
      const clicklist = rep.data
      for (const c of clicklist) {
        console.log(c['subId'])
        const rep = await this.$http.get(
          `https://api.ebird.org/v2/product/checklist/view/${c['subId']}`,
          {
            headers: {
              'X-eBirdApiToken': this.ebirdKey,
            },
          }
        )
        console.log(rep.data)
      }
    },
  },
}
</script>
