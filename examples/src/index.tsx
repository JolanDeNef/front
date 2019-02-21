import './index.less'

import testImage from 'assets/test.jpg'
import svgImage from 'assets/test.svg'
import {Children} from 'mithril'
import {
    classes, Component, createContext, DOMAttrs, HistoryRouter, Image, ImageResizer, Link, m, Modal,
    ModalOverlay, ModalStore, parseRoute, Portal, Redirect, Route, Slider, SliderStore,
    StatelessView, style, styled, Switch, View
} from '../../dist'

const Theme = createContext('green')

const Button = () => 
	m(Theme.Consumer, color => m('button', color))

class SliderExample extends View {
	slider = new SliderStore()
	view() {
		return m('div', [
			m('h1', '@codeurs/front'),
			m('.examples-slider', 
				m(Slider, this.slider, 
					[1, 2, 3, 4, 5, 6, 7].map(slide => 
						m('.examples-slider-slide', slide)
					)
				)
			),
			m(Button),
			m(Theme.Provider, {value: 'red'}, [
				m(Button),
				m(Button),
				m(Theme.Provider, {value: 'blue'}, 
					m(Button)
				),
				m(Button)
			])
		])
	}
}

const hashMatcher = (location, route) =>
	parseRoute(location.hash.substr(1), route)

const hashFormatter = path => path && `/#${path}`

const HashRouter = ({children}) =>
	m(HistoryRouter, {matcher: hashMatcher, formatPath: hashFormatter}, children)

const LanguageLink = ({lang, children}) =>
	m(Link, {to: `/${lang}`}, ({active, anchorAttrs}) =>
		m('a', {...classes({is: {active}}), ...anchorAttrs}, children)
	)

const LanguagesNav = () => 
	m(HashRouter, [
		m(LanguageLink, {lang: 'nl'}, 'Nederlands'),
		m(LanguageLink, {lang: 'en'}, 'English'),
		m(LanguageLink, {lang: 'fr'}, 'Français'),
	])
	
class ModalExample extends View {
	modal = new ModalStore()
	view() {
		return [
			m('button', {onclick: this.modal.open}, 'Open modal'),
			m(Portal, [
				m(Modal, this.modal, [
					m(ModalOverlay),
					m('.modalexample', [
						'Popup content',
						m('button', {onclick: () => this.modal.close()}, 'Close popup')
					])
				])
			])
		]
	}
}

const Images = ({children}) => 
	m('.images', 
		m('h3', 'Server resize'),
		m('.images-landscape', {style: {width: '400px', height: 'auto'}}, 
			m(ImageResizer, {
				resize: (attrs, container) => {
					console.log(attrs, container)
					return {...attrs}
				}
			}, 
				m(Image, svgImage)
			)
		),
		m('h3', 'No crop'),
		m('.images-landscape', {style: {width: '400px', height: 'auto'}}, 
			m(Image, svgImage)
		),
		m('.images-portrait',
			m(Image, testImage)
		), 
		m('h3', 'Cover'),
		m('.images-landscape',
			m(Image, {
				alt: 'ok',
				fit: 'cover',
				src: 'https://picsum.photos/600/200'
			})
		),
		m('.images-portrait', 
			m(Image, {
				fit: 'cover',
				width: 200,
				height: 100,
				src: 'https://picsum.photos/200/100'
			})
		), 
		m('.images-portrait', 
			m(Image, {
				fit: 'cover',
				position: {x: .8, y: .8},
				src: 'https://picsum.photos/800/400'
			})
		), 
		m('h3', 'Contain'),
		m('.images-landscape',
			m(Image, {
				fit: 'contain',
				src: 'https://picsum.photos/600/200'
			})
		),
		m('.images-portrait', 
			m(Image, {
				fit: 'contain',
				src: 'https://picsum.photos/600/200'
			})
		),
		m('h3', 'Fixed height'),
		m('.images-fixedheight', [
			m(Image, {
				fit: 'portrait',
				src: 'https://picsum.photos/600/200'
			}),
			m(Image, {
				fit: 'portrait',
				src: 'https://picsum.photos/300/300'
			}),
			m(Image, {
				fit: 'portrait',
				src: 'https://picsum.photos/100/200'
			})
		])
	)

const Nav = styled('nav')`
	background: red; 
`

const Nav2 = styled(Nav)`
	color: white;
`

const Nav3 = styled(Nav2)`
	color: blue;
`

const A = styled(Link)`
	color: inherit;
	${attrs => attrs.to === '/' && `
		color: gold;
	`}
	&:hover {
		color: yellow;
	}
`

class Examples extends View {
	view() {
		return m(HashRouter, 
			m(Switch, [
				m(Route, {
					path: '/:language',
				}, ({match}) => {
					const {params: {language}} = match
					return m('', [
						m(HistoryRouter, {
							matcher: (location, route) =>
							hashMatcher(location, {
								...route,
								path: route.path && `/${language}${route.path}`
							}),
							formatPath: path => hashFormatter(`/${language}${path}`)
						}, [
							m('', m(LanguagesNav)),
							`Language: ${language}`,
							m(Nav3, {as: 'div'}, [
								m(A, {to: '/'}, 'Home'),
								m(A, {to: '/slider'}, 'Slider'),
								m(A, {to: '/other'}, 'Other'),
								m(A, {to: '/modal'}, 'Modal'),
								m(A, {to: '/images'}, 'Images'),
								m(A, {to: '/back'}, 'Back home')
							]),
							m(Switch, [
								m(Route, {path: '/slider'}, SliderExample),
								m(Route, {path: '/other'}, () => m('', 'Other')),
								m(Route, {path: '/images'}, Images),
								m(Route, {path: '/back'},
									() => m('', [
										'Back home',
										m(Redirect, {to: '/'})
									])
								),
								m(Route, {path: '/modal'}, ModalExample),
								m(Route, () => m('', 'Match all'))
							])
						])
					])
				}
				),
				m(Route, () => m('', 
					'Choose a language:',
					m(LanguagesNav)
				))
			])
		)
	}
}

m.mount(document.getElementById('root'), Examples)
