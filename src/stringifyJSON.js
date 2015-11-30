/** Function that replicates JSON.stringify().
 *  @author E. D. Paepke
 */
 
var stringifyJSON = function(obj) {
	/** Establish array to store stringify entries. */
    var content = [];

    /** Executes stringify for primary value entries. */
    if (typeof obj === 'number' || typeof obj === 'boolean') {
        return obj.toString();
    } else if (obj === null) {
    	return 'null';
    } else if (typeof obj === 'string') {
    	return '"' + obj + '"';
    }

    objStringify(obj);

    /** Runs through each key in object and determines how to stringify
    /*  each entry. */
    function objStringify(objArg) {
    	var keys = [];
    	if (objArg !== null && objArg !== undefined) {
        	keys = Object.keys(objArg);
        }
        for (var i = 0; i < keys.length; i++) {
           	if (objArg[keys[i]] === null) {
           		content.push('"' + keys[i] + '":null')
            } else if (Array.isArray(objArg[keys[i]])) {
            	nestedObj(objArg, keys, i, ['[', ']']);
            } else if (typeof objArg[keys[i]] === 'object') {
            	nestedObj(objArg, keys, i, ['{','}'])
            } else {
            	addContent(objArg, keys, i);
            }
        }
    }

    /** Runs through each key in object and determines how to stringify
    /*  each entry depending on type. */
	function addContent(ob, keys, i) {
		if (typeof ob[keys[i]] === 'string') {
	        if (Array.isArray(ob)) {
	    		content.push('"' + ob[keys[i]]+ '"');
	    	} else {
	    		content.push('"' + keys[i] + '":"' + ob[keys[i]]+ '"');
	    	}
	    }
	    if (typeof ob[keys[i]] === 'number') {
        	if (Array.isArray(ob)) {
            	content.push(ob[keys[i]]);
            } else {
            	content.push('"' + keys[i] + '":' + ob[keys[i]]);
            }
        } 
        if (typeof ob[keys[i]] === 'boolean') {
	        if (Array.isArray(ob)) {
	        	content.push(ob[keys[i]].toString());
	        } else {
	        	content.push('"' + keys[i] + '":' + ob[keys[i]].toString());
	        }
	    }
	}

    /** Runs through each key in the object and determines how to stringify
    /*  each entry. */
	function nestedObj(ob, keys, i, p) {
    	if (Array.isArray(ob)) {
            content.push(p[0] + '-join')
            objStringify(ob[i]);
            content.push('-join' + p[1]);
        } else {
            content.push('"' + keys[i] + '":' + p[0] + '-join');
            objStringify(ob[keys[i]]);
            content.push('-join' + p[1]);
        }
	}

	/** Joins content in accordance with JSON format. */
    content = content.join(',');
    content = content.replace(/,-join/g,'');
    content = content.replace(/-join,/g,'');
    content = content.replace(/-join/g,'');

    /** Adds outside container punctuation. */
    if (Array.isArray(obj)) {
    	return '[' + content + ']';
    } else {
    	return '{' + content + '}';
    }
};
