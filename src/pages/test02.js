
// //:
// //: page of project
// //:

// // const Test02Contents = React.lazy(() => import('../components/test02Contents.js'))

// //...
// export default function Test02 () {

// 	return (
// 		<div>
// 			<h1>HELLO FROM REACT 2...</h1>
// 			{/* <Test02Contents /> */}
// 		</div>
// 	)

// }


// get react
import React from 'react'
import ReactDOM from 'react-dom/client'

//make app root
const root02 = ReactDOM.createRoot(document.getElementsByTagName('div')[2])
// const Test02Contents = React.lazy(() => import('../components/test02.js'))

//render app
root02.render(
	<div>
		<h1>REACT APP 01: <b>PAGE TWO</b></h1>
		<p>
			Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
		</p>
		{/* <Test02Contents /> */}
	</div>
)