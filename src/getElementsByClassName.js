/** Function that replicates document.getElementsByClassName(className).
 *  @author E. D. Paepke
 */

var getElementsByClassName = function(className) {
  /** Stores nodes of class "className". */
  var elements = [];

  /** Adds the input node to elements if it is of type "className".
   *  Then recursively calls function on the children nodes. */
  function addClassNode(node) {
  	if (node.classList !== undefined) {
	  	if (node.classList.contains(className)) {
	  		elements.push(node);
	  	}
	}
  	for (var i = 0; i < node.childNodes.length; i++) {
  		addClassNode(node.childNodes[i]);
  	}
  }

  addClassNode(document.body);
  return elements;
};
