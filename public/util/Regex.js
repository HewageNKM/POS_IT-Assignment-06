let patterns = {
    CID: /^[Cc][0-9]{4,10}$/,
    IID: /^[Tt][0-9]{4,10}$/,
    name: /^(?! )[A-Za-z][A-Za-z\s]{3,98}[A-Za-z](?<! )$/,
    ADDRESS: /^(?! )[A-Za-z0-9\s.,-]{5,100}(?<! )$/,
    SALARY: /^(?!0\d*)\d{1,11}$/,
    QTY: /^\d{1,11}$/
};

function text(name) {
    return patterns.name.test(name);
}

function address(address) {
    return patterns.ADDRESS.test(address);
}

function value(salary) {
    return patterns.SALARY.test(salary);
}

function cid(cid) {
    return patterns.CID.test(cid);
}

function iid(iid) {
    return patterns.IID.test(iid);
}

function qty(qty) {
    return patterns.QTY.test(qty);
}