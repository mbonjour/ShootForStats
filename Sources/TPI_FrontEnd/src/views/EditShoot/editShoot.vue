<template>
  <div class="editShoot">
    <div>
      <button @click="finishShoot()"
              v-if="giveButtonVisible"
              class="finishButton">Give UP !</button>
    </div>
    <points-table v-if="tableIsVisible" :arrows="arrows" :shoot="this.$store.getters.currentEditingShoot"></points-table>
    <div v-else style="padding: 10px;">
      <h3>Begin to shoot !</h3>
      <p>Select your points with the selection box and add them !</p>
    </div>
    <the-selector v-if="!this.$store.getters.currentEditingShoot.finished" v-model="currentArrow"></the-selector>
    <div>
      <button v-if="!arrowComplete && !this.$store.getters.currentEditingShoot.finished"
              :disabled="disable"
              class="validateButton"
              @click="addArrow()"><strong>Add Arrow</strong></button>
      <button v-if="arrowComplete && !this.$store.getters.currentEditingShoot.finished"
              :disabled="disable"
              class="validateButton"
              @click="validateSend()">Add End</button>
      <button v-if="this.$store.getters.currentEditingShoot.finished"
              class="redirectButton"
              @click="redirect()">Go to Dashboard (Shoot Finished)</button>
    </div>
  </div>
</template>

<script>
import pointsTable from '../SharedComponents/tablePoints'
import theSelector from '../SharedComponents/theSelector'

export default {
  name: 'editShoot',
  components: { pointsTable, theSelector },
  data () {
    return {
      shoot: null,
      arrows: [],
      currentArrow: ''
    }
  },
  methods: {
    validateSend () {
      this.addArrow()
      this.$store.dispatch('addEnd', {
        id_shoot: this.$store.getters.currentEditingShoot.id,
        arrows: this.arrows
      })
      this.arrows = []
    },
    addArrow () {
      this.arrows.push({ point: parseInt(this.currentArrow) })
      this.arrows = this.arrows.sort((a, b) => {
        return b.point - a.point
      })
    },
    redirect () {
      this.$router.push({ path: '/dashboard' })
    },
    finishShoot () {
      // fenêtre modale pour demander confirmation à faire
      this.$store.dispatch('finishCurrentEditingShoot')
      this.$router.push({ path: '/dashboard' })
    }
  },
  created () {
    if (this.$route.params.shootId) {
      this.$store.dispatch('setEditingShoot', this.$route.params.shootId)
    }
  },
  computed: {
    disable () {
      if (this.currentArrow === '') {
        return true
      } else {
        return false
      }
    },
    styleEndsIndication () {
      return 'width: ' + (this.$store.getters.currentEditingShoot.nb_ends / this.$store.getters.currentEditingShoot.nb_total_ends) * 100 + '%'
    },
    tableIsVisible () {
      return this.$store.getters.currentEditingShoot.ends.length !== 0 || this.arrows.length !== 0
    },
    giveButtonVisible () {
      return !this.$store.getters.currentEditingShoot.finished && this.$store.getters.currentEditingShoot.nb_ends > 0
    },
    arrowComplete () {
      return this.arrows.length >= this.$store.getters.currentEditingShoot.nb_arrows_by_end - 1
    }
  }
}
</script>

<style scoped>
.editShoot {
  padding-bottom: 160px;
}
.pointsTable {
  width: 100%;
}

.redirectButton {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  color: #35495E;
  background-color: #41B883;
  border: none;
  cursor: pointer;
}

.finishButton {
  width: 100%;
  height: 50px;
  font-weight: bold;
  color: #ef5350;
  background-color: #fafafa;
  border: none;
  border-bottom: 2px solid #ef5350;
  top: 0px;
  position: relative;
  cursor: pointer;
}
</style>
