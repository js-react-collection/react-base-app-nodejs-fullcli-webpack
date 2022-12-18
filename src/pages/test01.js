
// //:
// //: page of project
// //:

// // const Test01Contents = React.lazy(() => import('../components/test01Contents.js'))

// //...
// export default function Test01 () {

// 	return (
// 		<div>
// 			<h1>HELLO FROM REACT 2...</h1>
// 			{/* <Test01Contents /> */}
// 		</div>
// 	)

// }



// get react
import React from 'react'
import ReactDOM from 'react-dom/client'

//make app root
const root01 = ReactDOM.createRoot(document.getElementsByTagName('div')[1])
// const Test01Contents = React.lazy(() => import('../components/test01Contents.js'))

//render app
root01.render(
	<div>

		<h2>REACT APP 01: <b>PAGE ONE</b></h2>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		{/* <Test01Contents /> */}

	</div>
)