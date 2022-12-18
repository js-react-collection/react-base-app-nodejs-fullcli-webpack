
//:
//: Main of react app project
//:

// get react
import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/style.css'

//make app root
const root0 = ReactDOM.createRoot(document.getElementsByTagName('div')[0])

const HeaderContent = React.lazy(() => import('./components/HeaderContent.js'))
// const ComponentTest01 = React.lazy(() => import('./pages/test01.js'))
// const ComponentTest02 = React.lazy(() => import('./pages/test02.js'))

//render app
root0.render(
	<div>

		<HeaderContent />

		<p>
			sub page test:
			<a href='/pages/test01.html'>[page 01]</a>
			<a href='/pages/test02.html'>[page 02]</a><br/>
			<i>PROBLEM: all sub app have all scripts!</i>
		</p>

		<ul style={{
			background:'golden',
			color:'black'
		}}>
			<li><b>webpack:</b> include all script in all pages, it do not respect page and root dependencies!</li>
			<li><b>file-loader:</b> generare a js with position of file... we need to intercept it and put into a specific folder (or removing)</li>
		</ul>

		{/* <ComponentTest01 /> */}
		{/* <ComponentTest02 /> */}

	</div>
)
