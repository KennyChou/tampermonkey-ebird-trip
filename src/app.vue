<template>
  <div class="Page-section-inner Page-section-inner--md">
    <div v-if="ebirdKey == ''">
      <label>
        <span>輸入eBird Apikey</span>
        <input type="text" v-model="inputkey" />
      </label>
      <button @click="saveKey" class="Button Button--highlight">儲存</button>
    </div>
    <div v-if="Object.keys(sp_info).length == 0">
      <label>
        <span>鳥名顯示方式</span>
        <select v-model="lang">
          <option value="zh_TW">中文俗名</option>
          <option value="en">英文俗名</option>
        </select>
        <button @click="loadSp" class="Button Button--highlight">
          下載鳥名錄
        </button>
      </label>
    </div>
    <div v-if="info">
      <p v-html="message"></p>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { AppName, AppVersion } from './config'
import { breeding_code } from './data/breeding_code'

export default {
  name: 'app',
  data() {
    return {
      AppName,
      AppVersion,
      sp_info: {},
      breeding_code,
      inputkey: '',
      ebirdKey: '',
      lang: 'zh_TW',
      pro_code: {
        P20: 'eBird - Casual Observation',
        P21: 'eBird - Stationary Count',
        P22: 'eBird - Traveling Count',
        P23: 'eBird - Exhaustive Area Count',
      },
      info: false,
      message: '',
    }
  },
  mounted() {
    this.genDownloadButton()
  },
  created() {
    this.ebirdKey = localStorage.getItem('ebirdKey') || ''
    this.sp_info = JSON.parse(localStorage.getItem('sp_info') || '{}')
  },
  methods: {
    genDownloadButton() {
      if (Object.keys(this.sp_info).length == 0 || this.ebirdKey == '') {
        return
      }
      try {
        const lis = document
          .getElementById('my-reports-items')
          .getElementsByTagName('li')
        for (const element of lis) {
          const id = element.getElementsByClassName('Heading Heading--h4')[0].id
          const button = document.createElement('button')
          button.textContent = '下載'
          button.className = 'Button Button--highlight'
          button.addEventListener('click', e => this.download(id))
          element.append(button)
        }
      } catch (e) {
        this.info = true
        this.message = e
      }
      this.info = false
    },
    array2object(items) {
      const ret = items.reduce((result, item) => {
        const key = Object.keys(item)[0]
        result[key] = item[key]
        return result
      })
      return ret
    },
    async loadSp() {
      this.info = true
      this.message = '正在下載鳥名錄中...'
      const reps = await this.$http.get(
        `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale=${this.lang}`
      )
      this.sp_info = this.array2object(
        reps.data.map(item => {
          var sp = {}
          sp[item['speciesCode']] = {
            c: item['comName'],
            s: item['sciName'],
            o: item['taxonOrder'],
          }
          return sp
        })
      )
      localStorage.setItem('sp_info', JSON.stringify(this.sp_info))
      this.message = '儲存成功'
      this.genDownloadButton()
    },
    saveKey() {
      localStorage.setItem('ebirdKey', this.inputkey)
      this.ebirdKey = this.inputkey
      this.genDownloadButton()
      this.info = false
    },
    async download(id) {
      this.info = true
      this.message = `開啟下載Trip id=${id}<br />`
      const rep = await this.$http.get(
        `https://ebird.org/tripreport-internal/v1/checklists/${id}`
      )
      const clicklist = rep.data
      var data = []
      for (const c of clicklist) {
        try {
          this.message = this.message + `下載Checklist [${c['subId']}]...<br />`
          const resp = await this.$http.get(
            `https://api.ebird.org/v2/product/checklist/view/${c['subId']}`,
            {
              headers: {
                'X-eBirdApiToken': this.ebirdKey,
              },
            }
          )
          const ret = resp.data
          for (const obs of ret['obs']) {
            const sp = this.sp_info[obs['speciesCode']]
            data.push({
              'Submission ID': ret['subId'],
              'Common Name': sp['c'],
              'Scientific Name': sp['s'],
              'Taxonomic Order': sp['t'],
              Count: obs['howManyAtmost'],
              'State/Province': ret['subnational1Code'],
              County: '',
              'Location ID': ret['locId'],
              Location: c['loc']['locName'],
              Latitude: c['loc']['lat'],
              Longitude: c['loc']['lng'],
              Date: ret['obsDt'].split(' ')[0],
              Time: ret['obsDt'].split(' ')[1],
              Protocol: this.pro_code[ret['protocolId']],
              'Duration (Min)': ret['durationHrs']
                ? parseInt(parseFloat(ret['durationHrs']) * 60)
                : '',
              'All Obs Reported': ret['allObsReported'] ? 1 : 0,
              'Distance Traveled (km)': ret['effortDistanceKm']
                ? ret['effortDistanceKm']
                : '',
              'Area Covered (ha)': ret['effortAreaHa']
                ? ret['effortAreaHa']
                : '',
              'Number of Observers': ret['numObservers'],
              'Breeding Code': obs['obsAus']
                ? this.breeding_codes[obs['obsAux'][0]['auxCode']]
                : '',
              'Observation Details': obs['comments'] ? obs['comments'] : '',
              'Checklist Comments': ret['comments'] ? ret['comments'] : '',
            })
          }
        } catch (error) {
          this.message = `ebirdKey 有問題 [${error}]<br />`
          this.ebirdKey = ''
          localStorage.removeItem('ebirdKey')
          this.genDownloadButton()
          return
        }
      }
      this.message = this.message + `產生Excel...<br/>`
      const checklistsheet = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, checklistsheet, 'sheet1')
      const filename = `trip_${id}.xlsx`
      this.message = this.message + `開始下載<br/>`
      XLSX.writeFile(wb, filename)

      this.info = false
    },
  },
}
</script>
