import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useRef } from "react";
//import LogoutButton from "../components/LogoutButton";
import "./profile.scss";
//import { useNavigate } from "react-router-dom";
import FileUploader from "../../components/FileUploader/FileUploader";
import { Buffer } from 'buffer';
//import UserContext from "../components/UserContext";
import { toast } from 'react-toastify';



export const Profile = () => {

  const { user } = useAuth0();
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [authID, setAuthID] = useState();

  const [userDBdetails, setUserDBdetails] = useState();
  const [avatarFile, setAvatarFile] = useState();

  const convertBufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString('base64');
    return base64String;
  }


  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((idTokenClaims) => {
        const authUserID = idTokenClaims.sub

        setAuthID(authUserID)

        async function fetchUserByAuthID() {
          const res = await fetch(`http://localhost:9000/users/auth/${authUserID}`);
          const data = await res.json();

          if (!data.error) {
            setUserDBdetails(data);
            const profilePicBase64 = convertBufferToBase64(data.avatar.img.data);
            setAvatarFile(`data:${data.avatar.img.contentType};base64,${profilePicBase64}`);
          } else {
            console.log(data.error);
            console.log("User not found, hence new user");
          }
        }

        fetchUserByAuthID();

      })
    }
    setEmailValue(user.email);
  }, [isAuthenticated, getIdTokenClaims, user.email]);


  const [selectedFile, setSelectedFile] = useState(null);
  const [emailValue, setEmailValue] = useState("");

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  function handleChange() {
    // defining here to do nothing
    //to prevent error
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("authID", authID);

    formData.append("name", inputName.current.value);
    formData.append("username", inputUsername.current.value);
    formData.append("email", user.email);
    formData.append("role", inputRole.current.value);
    formData.append("school", inputSchool.current.value);
    formData.append("program", inputProgram.current.value);
    formData.append("avatar", selectedFile);

    try {
      const res = await fetch("http://localhost:9000/users", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      toast("Yay, profile created!")
      setUserDBdetails(data);
      window.location.reload();
    } catch (err) {
      toast(err);
    }
  };

  const defaultProfile = require("../../assets/images/defaultProfile.png");

  const divStyle = {
    backgroundImage: selectedFile
      ? `url(${URL.createObjectURL(selectedFile)})`
      : `url(${defaultProfile})`
  };

  const userDivStyle = {
    backgroundImage: selectedFile ? `url(${URL.createObjectURL(selectedFile)})` : (userDBdetails && !userDBdetails.avatar ? `url(${defaultProfile})` : `url(${avatarFile})`)
  };



  const inputName = useRef("");
  const inputUsername = useRef("");
  // const inputEmail = useRef("");
  const inputRole = useRef("");
  const inputSchool = useRef("");
  const inputProgram = useRef("");
  const input2Name = useRef("");
  const input2Username = useRef("");
  // const input2Email = useRef("");
  const input2Role = useRef("");
  const input2School = useRef("");
  const input2Program = useRef("");

  const [editable, setEditable] = useState(false);

  const handleToggleEditable = () => {
    setEditable(!editable);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const currentUserData = await fetch(`http://localhost:9000/users/?authID=${authID}`).then((res) => res.json());

    if (input2Name.current.value !== currentUserData.name) {
      formData.append("name", input2Name.current.value);
    }
    if (input2Username.current.value !== currentUserData.username) {
      formData.append("username", input2Username.current.value);
    }
    if (input2Role.current.value !== currentUserData.role) {
      formData.append("role", input2Role.current.value);
    }
    if (input2School.current.value !== currentUserData.school) {
      formData.append("school", input2School.current.value);
    }
    if (input2Program.current.value !== currentUserData.program) {
      formData.append("program", input2Program.current.value);
    }
    // console.log(selectedFile);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const res = await fetch(`http://localhost:9000/users/${userDBdetails._id}`, {
        method: "PATCH",
        body: formData
      });
      const data = await res.json();
      toast("Successfully updated!")
      setEditable(!editable);
      window.location.reload();
    } catch (err) {
      toast(err);
    }
  };
  // const navigate = useNavigate();
  // const goToHome = (userDBdetails)=> {
  //   navigate("/home", { state: { userDBdetails } });
  // }

  return (


    // <UserContext.Provider value={userDBdetails}>
    <div className="body">
      {/* <LogoutButton /> */}
      {/* -----------------------------------new user--------------------------- */}
      {!userDBdetails &&
        <div className="profile">
          <div className="first">
            <div className="first-inner">
              <div className="profilePic" style={divStyle}>

              </div>
              <FileUploader className='fileUploader' onFileSelected={handleFileSelected} isVisible={!editable} />
            </div>
          </div>
          <div className="profileForm">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <div className="inputBox">
                  <label htmlFor="fullname">Full Name:</label>
                  <input type="text" id="fullname" name="name" ref={inputName} onChange={handleChange} required />
                </div>

                <div className="inputBox">
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" name="email" defaultValue={user.email} disabled={true} onChange={handleChange} />
                </div>
                <div className="inputBox">
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" ref={inputUsername} onChange={handleChange} />
                </div>

                <div className="inputBox">
                  <label htmlFor="userrole">What type of user are you?</label>
                  <select id="userrole" name="role" ref={inputRole} onChange={handleChange}>
                    <option value="studied">Completed study</option>
                    <option value="studying">Currently studying</option>
                    <option value="guest">Wish to study</option>
                  </select>
                </div>
                <div className="inputBox">
                  <label htmlFor="uni">University:</label>
                  <input type="text" id="uni" name="school" ref={inputSchool} onChange={handleChange} />
                </div>
                <div className="inputBox">
                  <label htmlFor="program">Program of study:</label>
                  <input type="text" id="program" name="program" ref={inputProgram} onChange={handleChange} />
                </div>
                <div className="formBtn">
                  <input type="submit" value="Sign me up" />

                </div>

              </div>
            </form>

          </div>
        </div>
      }

      {/* ---------------------user--------------------------------- */}
      {userDBdetails &&
        <div className="profile">
          <div className="first">
            <div className="first-inner">
              <div className="profilePic" style={userDivStyle}>

              </div>
              <h3 style={{ display: !editable ? "block" : "none" }}>{userDBdetails.username}</h3>
              <FileUploader className='fileUploader' onFileSelected={handleFileSelected} isVisible={editable} />
            </div>
          </div>

          <div className="profileForm">
            <form onSubmit={updateUser}>
              <div className="user-details">
                <div className="inputBox">
                  <label htmlFor="fullname">Full Name:</label>
                  <input type="text" id="fullname" name="name" ref={input2Name} defaultValue={userDBdetails.name} onChange={handleChange} disabled={!editable} />
                </div>

                <div className="inputBox">
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" name="email" defaultValue={userDBdetails.email} onChange={handleChange} disabled={true} />
                </div>
                <div className="inputBox">
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" ref={input2Username} defaultValue={userDBdetails.username} onChange={handleChange} disabled={!editable} />
                </div>

                <div className="inputBox">
                  <label htmlFor="userrole">What type of user are you?</label>
                  <select id="userrole" name="role" ref={input2Role} defaultValue={userDBdetails.role} onChange={handleChange} disabled={!editable}>
                    <option value="studied">Completed study</option>
                    <option value="studying">Currently studying</option>
                    <option value="guest">Wish to study</option>
                  </select>
                </div>


                <div className="inputBox">
                  <label htmlFor="uni">University:</label>
                  <input type="text" id="uni" name="school" ref={input2School} defaultValue={userDBdetails.school} onChange={handleChange} disabled={!editable} />
                </div>

                <div className="inputBox">
                  <label htmlFor="program">Program of study:</label>
                  <input type="text" id="program" name="program" ref={input2Program} defaultValue={userDBdetails.program} onChange={handleChange} disabled={!editable} />
                </div>
                <div className="editSaveBtnBox">
                  <input type="button" value={editable ? "Discard" : "Edit Profile"} onClick={handleToggleEditable} className="editBtn" />
                  <input type="submit" value="Save Changes" className="saveChangesBtn" style={{ display: editable ? "block" : "none" }} />
                </div>
              </div>


            </form>

          </div>

        </div>
      }
    </div>
    // </UserContext.Provider>
  );
};
