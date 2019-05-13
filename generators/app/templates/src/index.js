// add any imports if needed, or write your script directly in this file.
// import SomePackage from "PackageName";

// make sure to export main, with the signature
export function main(/*el, service, imEntity, state, config*/) {
	// sample code here to convert the provided intermine object (e.g. perhaps
	// an id) into an identifier the tool expects. e.g.:
	// of course if your tool was built for intermine it might understand
	// intermine ids already, but many others tools expect a gene symbol or
	// protein accession, etc...
	/**
   * Example - you can delete this and replace with your own code *******

    // protVista expects an accession, so convert intermine id to accession

    var columnToConvert = config.columnMapping[imEntity.class][imEntity.format];
    var accession = new imjs.Service(service)
        .findById(imEntity.class, imEntity.value)
        .then(function(response) {
        //put some code here to initialise your tool.
    });

  */
}
