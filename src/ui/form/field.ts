import './field.less'

import m from 'mithril'
import classnames from 'classnames'
import {Component} from '../component'
import {getErrorMessage} from '../../util/formutils'

export class Field extends Component<{
	unstyled?: boolean
	errors?: undefined | string | Array<string>
	label?: string
	id?: string
	required?: boolean
	width?: number
}> {
	className = this.attrs.unstyled ? 'field' : 'field-front'

	view() {
		const {errors, id, required, width = 1.0} = this.attrs

		const style = {width: `${width * 100}%`}
		const hasErrors = errors !== undefined
		const classes = [hasErrors && 'has-error', required && 'is-required']

		return m(`div.${this.className}`, {class: classnames(classes), style, id}, [
			this.viewLabel(),
			this.children,
			this.viewErrors()
		])
	}

	viewLabel() {
		const {label} = this.attrs
		if (!label) return

		return m(`div.${this.className}-label`, label)
	}

	viewErrors() {
		const {errors} = this.attrs
		const hasErrors = errors !== undefined

		if (!hasErrors) return

		return m(`div.${this.className}-errormsg`, getErrorMessage(errors))
	}
}
