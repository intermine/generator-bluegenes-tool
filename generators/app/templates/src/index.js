// add any imports if needed, or write your script directly in this file.
// const SomePackage = require('PackageName');

// make sure to export main, with the signature
function main(el, service, imEntity, state, config, navigate) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}
	// Tips to ensure your tool works correctly in BlueGenes:
	// - The `el` element is all yours, but please do not manipulate the DOM above this
	// - Avoid ambiguous query selectors that may end up returning an element not belonging to this tool
	// - Avoid relying on element IDs, as multiple instances of this tool may be present on one page

	/* Example - you can delete this and replace with your own code *******

		// Sample code here to convert the provided InterMine object ID into the data the tool needs.
		var entity = imEntity.Gene;
		var mine = new imjs.Service(service);
		mine.findById(entity.class, entity.value).then(function(obj) {
			console.log(obj.name + ' is a ' + obj.class + ' you can find in ' + obj.organism.name);
		});
	*/

	el.innerHTML = `
		<div class="rootContainer">
			<h1>Your Data Viz Here</h1>
		</div>
	`;
}

module.exports = { main };
