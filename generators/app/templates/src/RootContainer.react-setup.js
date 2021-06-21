import React from 'react';<% if (reactReq == "vega") { %>
import { VegaLite } from 'react-vega';

const spec = {
	$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
	width: 400,
	height: 200,
	mark: 'bar',
	encoding: {
		x: { field: 'a', type: 'ordinal' },
		y: { field: 'b', type: 'quantitative' }
	},
	data: { name: 'values' }
};

// This will likely be the result of a query with imjs.
const exampleData = [
	{ a: 'A', b: 28 },
	{ a: 'B', b: 55 },
	{ a: 'C', b: 43 },
	{ a: 'D', b: 91 },
	{ a: 'E', b: 81 },
	{ a: 'F', b: 53 },
	{ a: 'G', b: 19 },
	{ a: 'H', b: 87 },
	{ a: 'I', b: 52 }
];
<% } %>
class RootContainer extends React.Component {
	render() {
		return (
			<div className="rootContainer">
				<h1>Your Data Viz Here</h1><% if (reactReq == "vega") { %>
				<VegaLite spec={spec} data={{ values: exampleData }} /><% } %>
			</div>
		);
	}
}

export default RootContainer;
