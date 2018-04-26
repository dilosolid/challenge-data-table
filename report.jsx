var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json');

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

var reduce = function(row, memo) {  
  if(row.type === 'impression')
    memo.impressionTotal = (memo.impressionTotal || 0) + 1;

  if(row.type === 'load')
    memo.loadTotal = (memo.loadTotal || 0) + 1;

  if(row.type === 'display')
    memo.displayTotal = (memo.displayTotal || 0) + 1;
  
  return memo
}

var calculations = [
  { title: 'Impressions', value: 'impressionTotal' },
  { title: 'Loads',       value: 'loadTotal' },
  { title: 'Displays',    value: 'displayTotal' },
  {
    title: 'Load Rate', value: 'loadRate',
    template: function(val, row) {       
      var result = (row.loadTotal / row.impressionTotal) * 100;
      return result.toFixed(1) + '%'; 
    }
  },
  {
    title: 'Display Rate', value: 'displayRate',
    template: function(val, row) {       
      var result = (row.displayTotal / row.impressionTotal) * 100;
      return result.toFixed(1) + '%'; 
    }
  }
]

module.exports = createReactClass({
  render () {
    return <div>
      <ReactPivot rows={rows} 
                  dimensions={dimensions} 
                  reduce={reduce} 
                  calculations={calculations} 
                  activeDimensions={['Date','Host']}  />
    </div>
  }
})
