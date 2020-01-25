function compareSingle(destination, origin) {
  var strippedDestination = destination.replace(/[^\d.-]/g,'')
  var strippedOrigin = origin.replace(/[^\d.-]/g,'')

  if (Number(strippedDestination) > Number(strippedOrigin)) {
    var increase = strippedDestination - strippedOrigin
    return '(+' + (increase / strippedOrigin * 100).toFixed(2) + '%)'
  } else if (Number(strippedDestination) < Number(strippedOrigin)) {
    var decrease = strippedOrigin - strippedDestination
    return '(-' + (decrease / strippedOrigin * 100).toFixed(2) + '%)'
  } else if (Number(strippedDestination) === Number(strippedOrigin)) {
    return '(0%)'
  } else {
    return '(0%)'
  }
}

function compareDouble(destinationPair, originPair) {
  var splitArrayDst = String(destinationPair).split('/')
  var firstSetDst = splitArrayDst[0]
  var secondSetDst = splitArrayDst[1]

  var splitArrayOrg = String(originPair).split('/')
  var firstSetOrg = splitArrayOrg[0]
  var secondSetOrg = splitArrayOrg[1]

  var firstSolution = compareSingle(String(firstSetDst), String(firstSetOrg))
  var secondSolution = compareSingle(String(secondSetDst), String(secondSetOrg))

  return firstSolution.slice(0, -1) + ' / ' + secondSolution.slice(1)
}

function percentDiffColor(destination, origin) {
  var strippedDestination = destination.replace(/[^\d.-]/g,'')
  var strippedOrigin = origin.replace(/[^\d.-]/g,'')

  if (Number(strippedDestination) > Number(strippedOrigin)) {
    return 'green'
  } else if (Number(strippedDestination) < Number(strippedOrigin)) {
    return 'red'
  } else if (Number(strippedDestination) === Number(strippedOrigin)) {
    return 'white'
  } else {
    return 'white'
  }
}

export { compareSingle, compareDouble, percentDiffColor };