import m from 'mithril'
import {Component} from './component'

import './image.less'
export class Image extends Component {
	view() {
		return m('img.image', this.attrs)
	}
}
