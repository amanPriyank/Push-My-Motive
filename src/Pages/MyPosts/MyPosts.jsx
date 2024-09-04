import React, { useEffect, useState } from "react";
import "./MyPosts.css";
import { useSiso } from "../../Context/siso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHouse,
  faCloud,
  faMagnifyingGlass,
  faEnvelope,
  faUser,
  faArrowRightFromBracket,
  faPencil,
  faCalendarDays,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Share from "../../Utils/Share/Share";
import Deadline from "../../Utils/Deadline/Deadline";
import DeletePost from "../../Utils/DeletePost/DeletePost";
import EditPost from "../../Utils/EditPost/EditPost";
import PostCards from "../../Utils/PostCards/PostCards";
import Navbar from "../../Components/Navbar/Navbar";
import Congrats from "../../Utils/Congrats/Congrats";




const MyPosts = () => {
  const siso = useSiso();
  const [isHome, setHome] = useState(true);
  const [isPost, setPost] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isDeleting , setDeleting] = useState(false);
  const [isDeadline , setDeadline] = useState(false);
  const [isShare , setShare] = useState(false);
  const [showHeading , setShowHeading] = useState(true);
  const [isCongrats, setIsCongrats] = useState(false);
  const [postId , setPostId] = useState();
  const [currentpost , setCurrentPost] = useState();

  const setIconFalse = () => {
    setHome(false);
    setPost(false);
    setSearch(false);
    setNotification(false);
    setProfile(false);
  };
  const navigate = useNavigate();
  const handleSignOut = () => {
    siso.sign_out();
    navigate("/");
  };
  const bgcs = [
    "linear-gradient(135deg, #F8B500, #FFFFFF)",
    "linear-gradient(135deg, #2193b0, #6dd5ed)",
    "linear-gradient(135deg, #A8E063, #56AB2F)",
  ];
  const bgheader = ["#F8B500", "#2193b0", "#56AB2F"];
  const handlePage = () => {
    setShowHeading(true);
    setDeactivated(false);
    setEditing(false);
    setDeleting(false);
    setDeadline(false);
    setShare(false);
    setIsCongrats(false);
  };
  const handleCongrats = async() => {
    if(!currentpost.accomplished)await siso.accomplished(currentpost.postId);
    setIsCongrats(true);
  }
  return (
    <>
      <div className="pmpmainContainer">
        <div className="phnv">
          <div
            className={`${isHome ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setHome(true);
            }}
          >
            <FontAwesomeIcon icon={faHome} />
          </div>
          <div
            className={`${isPost ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setPost(true);
            }}
          >
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div
            className={`${isSearch ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setSearch(true);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div
            className={`${isNotification ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setNotification(true);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div
            className={`${isProfile ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setProfile(true);
            }}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div
            className="phnvicon"
            onClick={() => {
              handleSignOut();
            }}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        </div>
        <div className="pmpheading">
          <div className="pmpnav">
            <Navbar />
          </div>
          <div className="pmplogo">
            <img src="/whiteLogo.png" alt="" srcSet="" className="phimg" />
          </div>
          <div className="pmpheadingnameandtitle">
            {siso.userInfo && (
              <div className="pmpheadingname">
                Hello, {siso.userInfo.first_name}
              </div>
            )}

            {showHeading && (
              <div className="pmpheadingtitle"> YOUR MOTIVES</div>
            )}
          </div>
        </div>
        {isShare && (
          <Share handlePage={handlePage} handleCongrats={handleCongrats} />
        )}
        {isDeadline && (
          <Deadline handlePage={handlePage} currentPost={currentpost} />
        )}
        {isDeleting && <DeletePost handlePage={handlePage} postId={postId} />}
        {isEditing && (
          <EditPost handlePage={handlePage} currentPost={currentpost} />
        )}
        {isCongrats && <Congrats handlePage={handlePage} />}
        {[...siso.allPosts].map((post, index) => (
          <div
            className={`pmpallposts ${
              deactivated ? "pmpallposts disable1" : ""
            }`}
          >
            <div className="pmpsinglepost">
              <div className="pmpsinglepostcard">
                <PostCards
                  key={index}
                  bgcs={bgcs[index % bgcs.length]}
                  bgheader={bgheader[index % bgheader.length]}
                  post={post}
                />
              </div>
              <div className="pmpbtns">
                <div className="pmpbtns1">
                  <div className="pmpeditbtn">
                    <button
                      className="pmpeditbtn"
                      onClick={() => {
                        setCurrentPost(post);
                        setDeactivated(true);
                        setShowHeading(false);
                        setEditing(true);
                      }}
                    >
                      Edit motive
                    </button>
                  </div>
                  <div className="pmpdeletebtn">
                    <button
                      className="pmpdeletebtn"
                      onClick={() => {
                        setPostId(post.postId);
                        setDeactivated(true);
                        setDeleting(true);
                        setShowHeading(false);
                      }}
                    >
                      Delete motive
                    </button>
                  </div>
                </div>
                <div className="pmpbtns2">
                  <div className="pmpdeadlinebtn">
                    <button
                      className="pmpdeadlinebtn"
                      onClick={() => {
                        setCurrentPost(post);
                        setDeactivated(true);
                        setDeadline(true);
                        setShowHeading(false);
                      }}
                    >
                      Add or extend deadline
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </button>
                  </div>
                  <div
                    className="pmpsharebtn"
                    onClick={() => {
                      setCurrentPost(post);
                      setDeactivated(true);
                      setShare(true);
                      setShowHeading(false);
                    }}
                  >
                    <button className="pmpsharebtn">
                      Accomplished and share
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyPosts;
