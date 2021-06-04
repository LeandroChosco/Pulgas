const Publication = require("../models/publication");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");

async function publish(file, ctx) {
  const { id } = ctx;
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const fileName = `publication/${uuidv4()}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, fileName);
    console.log(result);
  } catch (error) {
    return {
      status: null,
      urlFile: "",
    };
  }
}

module.exports = {
  publish,
};
