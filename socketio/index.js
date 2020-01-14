import vue from 'vue'
import ams from './lib/amsocket.js'
import agr from './agees.js'

agr.get('socketconnect')
ams.link('http://localhost:3000')

ams.on('connect', function(){
	agr.get('socketconnect').bind(ams)()
})
ams.on('disconnect', function(){
	agr.get('socketdisconnect').bind(ams)()
})
ams.on('onmessage', function(v) {
	agr.get(v.pid).bind(ams)()
})

vue.use(ams.ext, ams.skt)

export default ams