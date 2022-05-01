type numStr = number | string;

function adde(n1: numStr, n2: numStr) {
    if (typeof n1 === 'number') {
        if (typeof n2 === 'number') {
            return n1 + n2;
        } else {
            return n2 + n1;
        }
    } else {
        return n2 + n1;
    }
}

const result = adde(1, 2);

const result2 = adde('max', 'mx');
