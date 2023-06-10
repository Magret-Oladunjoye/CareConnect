import React, { useState } from "react";
import avatar from "../images/avatar.png";

const Avatar = ({ isDoctor, isLoggedIn, isEditProfile }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    // cannot upload if not logged in as a doctor user and not on the edit profile page
    if (!isLoggedIn && !isDoctor && !isEditProfile) {
      return;
    }

    // Handle image upload logic
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="w-80 h-80 justify-center">
      <img src={image ? URL.createObjectURL(image) : avatar} alt="avatar" />
      {isEditProfile && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={!isLoggedIn}
        />
      )}
    </div>
  );
};

export default Avatar;
