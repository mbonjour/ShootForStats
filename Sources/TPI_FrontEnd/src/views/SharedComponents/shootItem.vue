<template>
  <div class="card" :class="borderColor">
    <div class="title">
      <span @click.prevent="showDetailsOrEdit()">{{ shoot.title }}</span>
      <span @click.prevent="showDetailsOrEdit()" class="pushRight">
        <i v-if="!showDetails" class="material-icons">{{ state }}</i>
        <i v-else class="material-icons" style="color: #cacaca;">close</i>
      </span>
    </div>
    <div class="desc" @click.prevent="showDetailsOrEdit()">{{ shoot.description }}</div>
    <transition name="slide-fade" mode="out-in">
      <shootSummary v-if="!showDetails" :shoot="shoot"></shootSummary>
      <shootDetails v-else :shoot="shoot"></shootDetails>
    </transition>
  </div>
</template>

<script>
import shootSummary from './shootSummary'
import shootDetails from './shootDetails'

export default {
  components: {shootSummary, shootDetails},
  props: ['shoot'],
  data () {
    return {
      showDetails: false
    }
  },
  methods: {
    showDetailsOrEdit () {
      if (this.shoot.finished) {
        if (!this.showDetails) {
          this.$store.dispatch('setDetailsShoot', this.shoot.id)
          this.$events.$emit('anotherDetails', this.shoot.id)
          this.showDetails = !this.showDetails
        } else {
          this.showDetails = !this.showDetails
        }
      } else {
        this.$router.push({ path: '/editShoot/' + this.shoot.id })
      }
    }
  },
  mounted () {
    this.$events.$on('anotherDetails', (shootId) => {
      if (shootId !== this.shoot.id) {
        this.showDetails = false
      }
    })
  },
  computed: {
    borderColor () {
      let result = ''
      if (this.shoot.finished) {
        if (this.shoot.nb_ends < this.shoot.nb_total_ends) {
          result = 'notReallyFinished'
        } else {
          result = 'finished'
        }
      } else {
        result = 'notFinished'
      }
      return result + ' col s12 m3'
    },
    state () {
      return this.shoot.finished ? 'info' : 'edit'
    }
  }
}
</script>

<style>
.row {
  padding: 5px;
}
.card {
  padding: 5px;
  margin: 5px;
  margin-top: 15px;
  cursor: pointer;
}
.title {
  border-bottom: 1px solid #fafafa;
  font-weight: bold;
  margin: 2px;
  padding: 5px;
  padding-bottom: 10px;
}
.finished {
  border: 1px solid #41b883;
  border-left: 5px solid #41b883;
}
.notReallyFinished {
  border: 1px solid #fff176;
  border-left: 5px solid #fff176;
}
.notFinished {
  border: 1px solid #ef5350;
  border-left: 5px solid #ef5350;
}
.pushRight {
  float: right;
}
.desc {
  border-bottom: 1px solid #fafafa;
  margin: 2px;
  padding-left: 5px;
  padding-right: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: justify;
}
.shootSummary {
  padding: 5px;
  padding-top: 10px;
}
.shootDetails {
  padding: 5px;
  padding-top: 10px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
