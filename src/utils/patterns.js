/* eslint-disable */
export default {
    email: /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/,
    numeric: /^[0-9]*\.?[0-9]+$/,
    all_numeric: /^[\-+]?[0-9]*\.?[0-9]+$/,
    integer: /^[0-9]+$/,
    alpha: /^[A-Z]+$/i,
    alpha_spaces: /^[A-Z-&' ]+$/i,
    alpha_numeric: /^[A-Z0-9]+$/i,
    alpha_numeric_spaces: /^[A-Z0-9 ]+$/i,
    alpha_numeric_spaces_no_white: /^[A-Z0-9]+( [A-Z0-9]+)*$/i,
    alpha_spaces_no_white: /^[A-Z]+( [A-Z]+)*$/i,
    landline: /^[0-9]{8,16}$/,
    mobile: /^[789]\d{9,20}$/,
    single_address_line: /^[A-Za-z0-9\/,. ]+(?:[\/,.:;-][A-Za-z0-9\/,. ]+)*$/,
    url: /(http|https|ftp|ftps):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g,
    panNumber: /[a-z]{4,5}\d{4,5}[a-z]/i,
    password: /^\S/,
    strong_password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+`~]).{12,}$/,
    strong_password_no_special: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    number_with_decimal: /^[0-9]+(\.[0-9]{1,2})?$/,
    special_char: /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    image_types: ["image/png", "image/jpg", "image/jpeg", "image/jp2", "image/jpx", "image/jpm", "image/tiff"],
    file_type: ["application/vnd.ms-excel"],
    doc_type: ["application/pdf"],
    device_id: /^(SG-)([a-zA-Z0-9-]{6,19})([a-zA-Z0-9]{1})$/,
    username: /^([0-9a-zA-Z]([-_@.]*[0-9a-zA-Z]+)*)$/i,
    length: /^ [\p{ Z }\s] * (?: [^\p{ Z }\s][\p{ Z } \s]*) { 10, 100 } $/,
}

export const formatPhoneNumber = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue;
        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 7)
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
        // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
            3,
            6,
        )}-${currentValue.slice(6, 10)}`;
    }
};