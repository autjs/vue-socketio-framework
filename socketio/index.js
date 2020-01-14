import vue from 'vue'
import ams from './lib/amsocket.js'
import agr from './agreements.js'

agr.get('socketconnect')
ams.link('http://192.168.0.102:3000')

ams.on('connect', function(){
	agr.get('socketconnect').bind(ams)()
})
ams.on('disconnect', function(){
	agr.get('socketdisconnect').bind(ams)()
})
ams.on('onmessage', function(v) {
	ams.log('receive: ', v)
	agr.get(v.pid).bind(ams)(v)
})

vue.use(ams.ext, ams.skt)

export default ams