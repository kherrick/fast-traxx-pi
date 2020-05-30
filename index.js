const rpio = require('rpio')
const keyupdown = require('keyupdown')

keyupdown(process.stdin)

const CONTROLLER_BOTTOM_LEFT = 15
const CONTROLLER_BOTTOM_RIGHT = 16
const CONTROLLER_TOP_LEFT = 11
const CONTROLLER_TOP_RIGHT = 13

let keyId = ''

const shouldExit = key => {
  if (key && key.name === 'c' && key.ctrl) {
    console.log('exit')
    process.exit()
  }
}

const pinDriver = (pin, output) => {
  if (output === 'high') {
    rpio.open(pin, rpio.OUTPUT, rpio.LOW)
    rpio.write(pin, rpio.HIGH)

    return
  }

  rpio.write(pin, rpio.LOW)
}

const move = (direction, key) => {
  if (direction === 'down' || direction === 's') {
    pinDriver(CONTROLLER_BOTTOM_RIGHT, 'high')
    pinDriver(CONTROLLER_BOTTOM_LEFT, 'high')
  }

  if (direction === 'up' || direction === 'w') {
    pinDriver(CONTROLLER_TOP_RIGHT, 'high')
    pinDriver(CONTROLLER_TOP_LEFT, 'high')
  }

  if (direction === 'left' || direction === 'a') {
    pinDriver(CONTROLLER_BOTTOM_LEFT, 'high')
    pinDriver(CONTROLLER_TOP_RIGHT, 'high')
  }

  if (direction === 'right' || direction === 'd') {
    pinDriver(CONTROLLER_BOTTOM_RIGHT, 'high')
    pinDriver(CONTROLLER_TOP_LEFT, 'high')
  }

  if (direction === 'c') {
    shouldExit(key)
    pinDriver(CONTROLLER_BOTTOM_LEFT, 'high')
  }

  if (direction === 'z') {
    pinDriver(CONTROLLER_BOTTOM_RIGHT, 'high')
  }

  if (direction === 'e') {
    pinDriver(CONTROLLER_TOP_LEFT, 'high')
  }

  if (direction === 'q') {
    pinDriver(CONTROLLER_TOP_RIGHT, 'high')
  }
}

const stop = direction => {
  if (direction === 'down' || direction === 's') {
    pinDriver(CONTROLLER_BOTTOM_RIGHT, 'low')
    pinDriver(CONTROLLER_BOTTOM_LEFT, 'low')
  }

  if (direction === 'up' || direction === 'w') {
    pinDriver(CONTROLLER_TOP_RIGHT, 'low')
    pinDriver(CONTROLLER_TOP_LEFT, 'low')
  }

  if (direction === 'left' || direction === 'a') {
    pinDriver(CONTROLLER_BOTTOM_LEFT, 'low')
    pinDriver(CONTROLLER_TOP_RIGHT, 'low')
  }

  if (direction === 'right' || direction === 'd') {
    pinDriver(CONTROLLER_BOTTOM_RIGHT, 'low')
    pinDriver(CONTROLLER_TOP_LEFT, 'low')
  }

  if (direction === 'c') {
    pinDriver(CONTROLLER_BOTTOM_LEFT, 'low')
  }

  if (direction === 'z') {
    pinDriver(CONTROLLER_BOTTOM_RIGHT, 'low')
  }

  if (direction === 'e') {
    pinDriver(CONTROLLER_TOP_LEFT, 'low')
  }

  if (direction === 'q') {
    pinDriver(CONTROLLER_TOP_RIGHT, 'low')
  }
}

process.stdin.on('keydown', (ch, key) => {
  keyId = key ? key.name : ch

  move(keyId, key)
  console.log('keydown', keyId)
})

process.stdin.on('keyup', () => {
  console.log('keyup', keyId)

  stop(keyId)
  keyId = ''
})

process.stdin.on('keypress', (ch, key) => {
  shouldExit(key)
})

process.stdin.setRawMode(true)
process.stdin.resume()
