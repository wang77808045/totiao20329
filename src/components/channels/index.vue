<template>
  <div class="channel-select">
    <el-select placeholder="请选频道" @input="$emit('input', $event)" :value="value">
      <el-option v-if="includeAll" :value="null" label="全部频道"></el-option>
      <el-option
        v-for="channel in channels"
        :label="channel.name"
        :value="channel.id"
        :key="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      channels: []
      //   value:this.channels.
    }
  },
  props: {
    value: {
      type: [String, Number],
      require: true
    },
    includeAll: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(res => {
          console.log(res)
          this.channels = res.data.data.channels
        })
        .catch(err => {
          console.log(err, '数据获取失败')
        })
    }
  }
}
</script>

<style>
</style>
