// Import option monad
import { chain, fold, none, Option, some,fromNullable, option } from 'fp-ts/lib/Option'
import {pipe} from 'fp-ts/lib/pipeable';
import {flow} from 'fp-ts/lib/function';

import { IO, io } from 'fp-ts/lib/IO'
import {safeGetDOMElement, safeAddEventListener, safeAddElement} from './dom-utils'
import {bindControlButton} from './bindings'
import {rectFactory} from './geometries-factory'

const insertIO = bindControlButton('insertBtn', () => {
	const handlerIO = pipe(
		io.chain(rectFactory(), (svg) => {
			return io.chain(safeGetDOMElement('shapes-continer'), (elemOpt) => {
				return pipe(
					elemOpt,
					fold(
							() => () => console.log("No element found!"),
							(elem) => safeAddElement(svg, elem))
					)
			})
		})
	)
	handlerIO()
})

insertIO()


const prog :IO<void> = pipe(
	io.chain(safeGetDOMElement("canvas"), (opt) => 
			pipe(
					opt,
					fold(
							() => () => console.log("No element found!"),
							(elem) => safeAddEventListener(elem, 'click', () => console.log("You have clicked the canvas"))
					)
			)
	)
    
)

prog()