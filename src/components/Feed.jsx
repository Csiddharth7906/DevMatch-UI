import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const getFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //TODO: handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  
  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 px-4 sm:mr-8 mx-auto">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  
  if (!feed || feed.length <= 0) {
    return (
      <div className="flex justify-center mt-20 px-4 sm:ml-10 md:ml-0 sm:mr-8 mx-auto">
        <div className="max-w-4xl w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden p-12">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-gray-500/30 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">No User Data</h2>
            <p className="text-gray-400">User information is not available</p>
            <button className="bg-red-500 p-2 mt-2 font-black rounded-2xl" onClick={()=>window.location.reload()}>Click to load more</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-20 px-4 sm:mr-8 mx-auto min-h-screen">
      <UserCard user={feed[0]} showButtons={true} />
    </div>
  );
};

export default Feed;