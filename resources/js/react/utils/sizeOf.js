// Source: http://code.iamkate.com/javascript/finding-the-memory-usage-of-objects/

function sizeOf(object) {
    var objects = [object];
    var size = 0;

    for (var index = 0; index < objects.length; index++) {
        switch (typeof objects[index]) {

            case 'boolean': size += 4; break;

            case 'number': size += 8; break;

            case 'string': size += 2 * objects[index].length; break;

            case 'object':

                if (Object.prototype.toString.call(objects[index]) != '[object Array]') {
                    for (var key in objects[index]) size += 2 * key.length;
                }
                
                for (var key in objects[index]) {
                    var processed = false;
                    for (var search = 0; search < objects.length; search++) {
                        if (objects[search] === objects[index][key]) {
                            processed = true;
                            break;
                        }
                    }
                    if (!processed) objects.push(objects[index][key]);
                }

        }
    }
    return size;
}

export default sizeOf