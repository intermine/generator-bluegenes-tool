import React from 'react';
import ReactDOM from 'react-dom';
import RootContainer from './RootContainer';

// make sure to export main, with the signature
function main(el, service, imEntity, state, config, navigate) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}
	// Tips to ensure your tool works correctly in BlueGenes:
	// - Do not use element IDs or query selectors; use React's createRef/useRef instead

	ReactDOM.render(
		<RootContainer
			serviceUrl={service.root}
			entity={imEntity}
			config={config}
		/>,
		el
	);
}

export { main };
