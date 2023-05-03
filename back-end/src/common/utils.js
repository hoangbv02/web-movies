const { initializeApp } = require("firebase/app");
const {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} = require("firebase/storage");
const path = require("path");
const config = require("./config");
const isNullOrWhiteSpace = (input) => {
    if (!input) {
        return true;
    }
    const temp = input.trim();
    if (!temp) {
        return true;
    }
    return false;
};
const isNullOrEmptyArray = (arrayInput) => {
    if (!arrayInput) {
        return true;
    }
    if (arrayInput.length == 0) {
        return true;
    }
    return false;
};
const isOverMaxLength = (input, length) => {
    const temp = input.trim();
    if (temp.length > length) {
        return true;
    }
    return false;
};
function getDateStringFormatByDate() {
    var date = new Date();

    var result =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2) +
        ("0" + date.getMilliseconds()).slice(-2);
    return result;
}
const getExtensionFromFileName = (fileNameInput) => {
    var fileNameTemp = path.parse(fileNameInput).name;
    var extension = path.parse(fileNameInput).ext;
    return fileNameTemp.concat("_", getDateStringFormatByDate(), extension);
};
const customDateTime = () => {
    var date = new Date();
    var result = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return result;
};
const uploadFileToFirebase = async (fileInput) => {
    const appFireBase = initializeApp(config.firebaseConfig);
    const storage = getStorage();

    const mountainsRef = ref(
        storage,
        "uploads/" + getExtensionFromFileName(fileInput.name)
    );
    const metadata = {
        contentType: fileInput.mimetype,
    };
    const snapshot = await uploadBytesResumable(
        mountainsRef,
        fileInput.data,
        metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};
module.exports = {
    isNullOrWhiteSpace,
    isNullOrEmptyArray,
    isOverMaxLength,
    uploadFileToFirebase,
    getExtensionFromFileName,
    customDateTime,
};
