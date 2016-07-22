function buildBarcode(input) {

    const inputs = checkLegal(input);

    if (inputs) {
        return buildZipCode(inputs);
    }
}

function checkLegal(input) {
    const inputs = input.split('');
    const length = input.length;

    let tags = getNumber(inputs);

    if (length === 5 || length === 9 || length === 10) {
        tags.filter(tag => tag >= 0 && tag <= 9)
        return tags;
    }
}

function getNumber(inputs) {
    let tag = inputs.findIndex(input => input === '-');

    if (tag != -1) {
        inputs.splice(tag, 1);
        return inputs;
    }

    return inputs;
}

function buildZipCode(inputs) {
    const barcodes = loadAllBarcodes();

    const checkDigital = buildCheckDigital(inputs);
    inputs.push(checkDigital.toString());

    const zipCodes = inputs.map(input => barcodes[input]).join('');

    return `|${zipCodes}|`;
}

function buildCheckDigital(inputs) {
    let checkDigital = 0;

    checkDigital = inputs.map(input =>parseInt(input))
        .reduce((a, b) => a + b);

    /*if (checkDigital % 10 != 0) {
     checkDigital = 10 - checkDigital % 10;
     }

     return checkDigital;*/

    return (10 - checkDigital % 10) % 10;
}


// 条码转为编码
function buildZipCode2(input) {
    const zipcode = checkZipLegal(input);

    if (zipcode) {
        const weight = getWeight(zipcode);
        return getZipCode(weight);
    } else {
        return
    }
}

function checkZipLegal(input) {
    const length = input.length;
    const zipcode = []

    if (length === 32 || length === 52) {
        const inputs = input.split('');
        if (inputs[0] === '|' && inputs[length - 1] === '|') {
            getZipBarcode(inputs, zipcode);
            return zipcode;
        }
    }
}

function getZipBarcode(inputs, zipcode) {
    inputs.splice(0, 1);
    inputs.splice(length - 1, 1);

  //  inputs.slice(1,-1);

    let count = 0;
    let str = ''

    inputs.forEach(input => {
        count++;
        str += input;
        if (count % 5 === 0) {
            zipcode.push(str);
            str = '';
        }
    })
}

function getWeight(zipcodes) {
    const allBarcodes = loadAllBarcodes();
    const weight = [];
    let index = 0;

    let zipcode = zipcodes.map(zipcode => {
        index = findIndexs(zipcode, allBarcodes);
        weight.push(index.toString());
    });

    return weight;
}

function findIndexs(zipcode, allBarcodes) {
    return allBarcodes.findIndex(allBarcode => zipcode === allBarcode);
}

function getZipCode(weight) {
    let str = '';
    const digital = checkZipDigital(weight);
    weight.splice(weight.length - 1, 1);

    addLine(weight);

    if (digital) {
        str = weight.reduce((a, b) => a + b);
        return str;
    }
    return digital
}

function checkZipDigital(weight) {
    const num = weight.reduce((a, b) => (parseInt(a) + parseInt(b)));

    return num % 10 === 0 ? num : undefined;
}

function addLine(weight) {
    if (weight.length === 9) {
        weight.splice(5, 0, '-');
        return weight;
    }
    return weight;
}