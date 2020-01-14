import socketioext from 'vue-socket.io-extended'
import socketclient from 'socket.io-client'

class AmScoket {
	constructor() {
		this.ext = socketioext
		this.skt = null
		this._evts = {}
		this.message = 'onmessage'
	}

	link(url) {
		this.skt = socketclient(url)
		this.skt.on('connect', this._connect.bind(this))
		this.skt.on('disconnect', this._disconnect.bind(this))
		this.skt.on('reconnect', this._reconnect.bind(this))
	}

	on(evt, handler) {
		this._evts[evt] = handler
	}

	send(v) {
		this.log('waiting send ...')
		if(this.skt) {
			this.log('send data to server', v)
			this.skt.emit(this.message, v)
		}
	}

	_connect() {
		this.log('link success BBB')
		this.send('hei, Server.')
		this._emit('connect', this.skt)
		this.skt.on(this.message, this._onmessage.bind(this))
	}

	_disconnect(v) {
		this._emit('disconnect', v)
	}

	_reconnect(v) {
		this._emit('reconnect', v)
	}

	_onmessage(v) {
		this._emit(this.message, v)
	}

	_emit(evt, v) {
		let h = this._evts[evt]
		this.log(this._evts)
		if(h) {
			h(v)
		}
	}

}

export default new AmScoket()