const { response, request } = require("express");
const User = require("../../models/user");
const cloudinary = require('../../config/cloudinary');

const addUserImage = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    // Validate if the client exists
    const user = await User.findByPk(id);

    // Clean previous image
    if (user.image_url) {
      const nameImageArray = user.image_url.split("/");
      const nameImage = nameImageArray[nameImageArray.length - 1];
      const [public_image_id] = nameImage.split(".");

      cloudinary.uploader.destroy(`twp/users/${public_image_id}`);
    }

    // Extract temporal image
    const { tempFilePath } = req.files.archive;

    // Check file size
    const fileSizeInBytes = req.files.archive.size;
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (fileSizeInBytes > maxSizeInBytes) {
      return res.status(400).json({
        success: false,
        message: "El tamaño del archivo excede los 5 MB",
        error: true,
      });
    }

    // Check file format
    const allowedFormats = ["png", "jpg", "jpeg"];
    const fileFormat = req.files.archive.name.split(".").pop().toLowerCase();
    if (!allowedFormats.includes(fileFormat)) {
      return res.status(400).json({
        success: false,
        message:
          "Tipo de archivo no permitido. Porfavor sube una imagen PNG, JPEG, JPG",
        error: true,
      });
    }

    // Upload to cloudinary
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: `twd/users`,
    });

    // Update image to user
    user.image_url = secure_url;
    await user.save();

    return res.status(201).json({
      success: true,
      data: user.image_url,
      message: "Imagen subida con éxito",
    });
  } catch (error) {
    console.error("Error en addUserImage:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

module.exports = {
  addUserImage,
};