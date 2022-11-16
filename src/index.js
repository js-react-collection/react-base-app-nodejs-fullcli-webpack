
//:
//: Main of react app project
//:

// get react
import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/style.css'
import Test from './components/test.js'

//make app root
const root = ReactDOM.createRoot(document.getElementsByTagName('div')[0])

//render app
root.render(
	<div>
		<h1>HELLO FROM REACT...</h1>
		<Test />
	</div>
)
