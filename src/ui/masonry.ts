import m from 'mithril'
import {Component} from './component'

import './masonry.less'
export default class Masonry extends Component {
	divide(items, colsCount) {
		const cols = Array(colsCount)
			.fill(null)
			.map(_ => [])
		items.forEach((item, i) => {
			const col = i % colsCount
			cols[col].push(item)
		})
		return cols
	}

	view() {
		const {cols: colsCount, addClass} = this.attrs
		const items = this.children
		if (!(items instanceof Array)) throw 'Array expected'
		const cols = this.divide(items, colsCount)
		return m('.masonry',
			cols.map((children, i) =>
				m('.masonry-col',
					{
						style: {
							'flex-basis': 100 / cols.length + '%'
						}
					},
					children.map((item, j) =>
						m('.masonry-item',
							{
								class: addClass ? addClass(i, j) : ''
							},
							item
						)
					)
				)
			)
		)
	}
}
