import Vue from 'vue'
import moment from 'moment'
import numeral from 'numeral'
import 'numeral/locales/fr-ca'

Vue.filter('formatDate', function (value, defaultValue) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  } else {
    return defaultValue
  }
})

Vue.filter('formatHour', function (value) {
  if (value) {
    return moment(String(value)).format('HH:mm')
  }
})

Vue.filter('formatDateISO', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

Vue.filter('formatBeforeFinish', function (value) {
  moment.locale('fr')
  return moment(value).fromNow()
})

Vue.filter('formatDateAndHours', function (selectedDate, selectedTime) {
  return moment(selectedDate + ' ' + selectedTime).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('formatDateEtHeure', function (value) {
  return moment(value).format('DD/MM/YYYY') + ' à ' + moment(value).format('HH:mm:ss')
})

Vue.filter('formatDateAtHour', function (value) {
  return moment(value).format('DD/MM/YYYY') + ' à ' + moment(value).format('HH') + 'h' + moment(value).format('mm')
})

Vue.filter('formatIsBefore', function (value) {
  if (value) {
    return moment(String(value)).isBefore()
  }
})

Vue.filter('formatIsAfter', function (value) {
  if (value) {
    return moment(String(value)).isAfter()
  }
})

Vue.filter('formatJourMois', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM')
  }
})

Vue.filter('formatLeJourMois', function (value) {
  if (value) {
    moment.locale('fr')
    return 'Le' + moment(String(value)).format(' ' + 'dddd' + ' ' + 'Do/MM' + ' ' + ' ' + 'à' + ' ' + 'HH:mm')
  }
})

Vue.filter('formatFullDayMonthTime', function (value) {
  if (value) {
    moment.locale('fr')
    return moment(String(value)).format(' ' + 'dddd' + ' ' + 'Do/MM' + ' ' + ' ' + 'à' + ' ' + 'HH:mm')
  }
})

Vue.filter('formatHeure', function (value) {
  if (value) {
    return moment(String(value)).format('HH:mm')
  }
})

Vue.filter('count', function (value) {
  if (value) {
    return value.length
  }
})

Vue.filter('formatNumber', function (value) {
  numeral.locale('fr-ca')
  return numeral(value).format('0,0.00')
})

Vue.filter('formatAccount', function (value) {
  numeral.locale('fr-ca')
  return numeral(value).format('0,0')
})

Vue.filter('formatPrice', function (value, decimals = 2) {
  return ((+value).toFixed(decimals) + ' €').replace('.', ',')
})
