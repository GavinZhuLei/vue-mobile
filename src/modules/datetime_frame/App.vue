<template>
  <vm-frame>
    <div style="padding:15px;">
      <x-button type="primary" plain @click.native="showPlugin">Used as a plugin</x-button>
    </div>

    <group :title="'Default format: YYYY-MM-DD'">
      <datetime
        v-model="value1"
        @on-change="change"
        :title="'Birthday'"
        @on-cancel="log('cancel')"
        @on-confirm="onConfirm"
        @on-hide="log('hide', $event)"></datetime>
    </group>

    <group :title="'Custom minute list: every 15 minutes'">
      <datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="'Birthday'"></datetime>
    </group>

    <group :title="'Custom hour list'">
      <datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm" :hour-list="['09', '10', '11', '12', '13', '14', '15', '16']" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="'Birthday'"></datetime>
    </group>

    <group title="Readonly">
      <datetime v-model="valueReadonly" :readonly="readonly" @on-change="change" :title="'Birthday'"></datetime>
    </group>
    <div style="padding:15px">
      <x-button type="primary" plain @click.native="readonly = !readonly"> Toggle readonly  </x-button>
    </div>

     <group :title="'Format display value'">
      <datetime v-model="formatValue" :display-format="formatValueFunction" @on-change="change" :title="'Birthday'"></datetime>
    </group>

    <div style="padding:15px;">
      <x-button type="primary" @click.native="formatValue = '2017-11-11'">Set value: 2017-11-11</x-button>
    </div>

    <group :title="'Define range of hours'">
      <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" :min-hour=9 :max-hour=18 @on-change="change" :title="'Define range of hours'" :inline-desc="'Working hours: 09-18'"></datetime>
    </group>

    <group :title="'Set start-date and end-date' + ' 2015-11-11 ~ 2017-10-11'">
      <datetime v-model="limitHourValue" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Start time'"></datetime>
    </group>

     <group :title="'Set end-date only' + ' 2017-10-11'">
      <datetime v-model="onlySetEndDateValue" :end-date="onlySetEndDate" format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Start time'"></datetime>
    </group>

    <group :title="'Format' + ': ' + format">
      <datetime v-model="value2" :format="format" @on-change="change" :title="'Start time'"></datetime>
    </group>

    <div style="padding:15px;">
      <x-button type="primary" @click.native="toggleFormat">Toggle format</x-button>
    </div>

    <group title="noon">
      <datetime title="noon" v-model="noonValue" format="YYYY-MM-DD A"></datetime>
    </group>

    <group :title="'Placeholder'">
      <datetime v-model="value3" default-selected-value="2017-06-18 13" format="YYYY-MM-DD HH" :placeholder="'Please select'" @on-change="change" :title="'Start time'"></datetime>
    </group>

    <group :title="'Set default-selected-value to 2017-11-11'">
      <datetime v-model="value3_1" default-selected-value="2017-11-11" format="YYYY-MM-DD" :placeholder="'Please select'" @on-change="change" :title="'Start time'" :inline-desc=" 'Current value' + `: ${value3_1}`"></datetime>
    </group>

    <group :title="'Set min-year and max-year'">
      <datetime v-model="value4" :placeholder="'Please select'" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Years after 2000'"></datetime>
    </group>

    <group :title="'Prop: compute-hours-function'">
      <datetime format="YYYY-MM-DD HH" v-model="computeHoursValue" :compute-hours-function="computeHoursFunction" :title="'Birthday'" @on-change="change"></datetime>
    </group>

    <group :title="'Prop: compute-days-function'">
      <datetime format="YYYY-MM-DD HH" v-model="computeDaysValue" :compute-days-function="computeDaysFunction" :title="'Birthday'" @on-change="change"></datetime>
    </group>

    <group :title="'Specified template text in Chinese'">
      <datetime v-model="value5" :placeholder="'Please select'" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Chinese'" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
    </group>

    <group :title="'Show center button and clear the value'">
      <datetime v-model="value6" @on-change="change" :title="'Birthday'" clear-text="clear" @on-clear="clearValue"></datetime>
    </group>

    <group :title="'Show center button to set date to today'">
      <datetime v-model="value7" @on-change="change" :title="'Birthday'" clear-text="today" @on-clear="setToday"></datetime>
    </group>

     <group :title="'Custom trigger slot'">
      <datetime v-model="value7" @on-change="change" :title="'Birthday'" clear-text="today" @on-clear="setToday">
        <x-button>Click me</x-button>
      </datetime>
    </group>

    <group :title="'Required'">
      <datetime v-model="value8" :title="'Required'" clear-text="clear" @on-clear="clearValue8" :required="true"></datetime>
    </group>

    <group :title="'Use prop: show.sync (vue^2.3) to control visibility'">
      <datetime v-model="value9" @on-change="change" :title="'Birthday'" :show.sync="visibility"></datetime>
    </group>

    <div style="padding:15px;">
      <x-button type="primary" plain @click.native="visibility = true">显示</x-button>
    </div>

    <group :title="'Default format: YYYY-MM-DD'">
      <datetime
        :order-map="{
          year: 3,
          month: 2,
          day: 1
        }"
        v-model="value1"
        @on-change="change"
        title="customize column order"
        @on-cancel="log('cancel')"
        @on-confirm="onConfirm"
        @on-hide="log('hide', $event)"></datetime>
    </group>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import { Datetime, Group, XButton } from 'vux'

export default {
  components: {
    VmFrame,
    Datetime,
    Group,
    XButton
  },
  data () {
    return {
      noonValue: '2018-04-13 PM',
      readonly: true,
      minuteListValue: '2017-06-12 09:00',
      hourListValue: '2017-06-12 09:00',
      format: 'YYYY-MM-DD HH:mm',
      value1: '2015-11-12',
      valueReadonly: '2015-11-12',
      value2: '',
      value3: '',
      value3_1: '',
      value4: '',
      value5: '',
      value6: '2016-08-18',
      value7: '',
      value8: '',
      limitHourValue: '',
      startDate: '2015-11-11',
      endDate: '2017-10-11',
      formatValue: '2017-10-11',
      formatValueFunction (val) {
        return val.replace(/-/g, '$')
      },
      value9: '',
      visibility: false,
      computeHoursValue: '',
      computeDaysValue: '',
      computeHoursFunction (date, isToday, generateRange) {
        if (isToday) {
          return generateRange(new Date().getHours(), 23)
        } else {
          return generateRange(0, 23)
        }
      },
      computeDaysFunction (options, generateRange) {
        return [options.month] // if current month is n, days are [n]
      },
      onlySetEndDate: '2017-10-11',
      onlySetEndDateValue: ''
    }
  },
  methods: {
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    },
    showPlugin () {
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH',
        value: '2017-05-20 18',
        onConfirm (val) {
          console.log('plugin confirm', val)
        },
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        }
      })
    },
    toggleFormat () {
      if (this.format === 'YYYY-MM-DD') {
        this.format = 'YYYY-MM-DD HH:mm'
      } else if (this.format === 'YYYY-MM-DD HH:mm') {
        this.format = 'YYYY-MM-DD'
      }
    },
    change (value) {
      console.log('change', value)
    },
    clearValue (value) {
      this.value6 = ''
    },
    clearValue8 (value) {
      this.value8 = ''
    },
    setToday (value) {
      let now = new Date()
      let cmonth = now.getMonth() + 1
      let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      if (day < 10) day = '0' + day
      this.value7 = now.getFullYear() + '-' + cmonth + '-' + day
      console.log('set today ok')
    }
  }
}
</script>

<style lang="scss">
</style>
