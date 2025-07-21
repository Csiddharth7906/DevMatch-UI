import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0){
     return (
      <div className="flex justify-center mt-20 mr-8 scale-100 mx-auto ">

      <div className="max-w-4xl w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden p-12">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-gray-500/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No User Data</h2>
          <p className="text-gray-400">User information is not available</p>
        </div>
      </div>
      </div>
    );
  }
    

  return (
    feed && (
      <div className="flex justify-center mt-20 mr-8 scale-100 mx-auto min-h-screen">
        <UserCard user={feed[0]} showButtons={true} />
      </div>
    )
  );
};
export default Feed;