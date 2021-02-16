import React from "react";
import {Favorite} from "grommet-icons";
import { getLikes, updateLike } from "../../services/postsServices";
import { useDispatch, useSelector } from "react-redux";
import { selectLike, update } from "./likeSlice";
import { Button } from "grommet";

const Like = (props) => {

  const userProps = props.dataPost?.user ;
  const postProps = props.dataPost?.post ;

  const [state, setState] = React.useState({ liked: false });

  const [refresh, setrefresh] = React.useState(true);
  const [nbLike, setNbLike] = React.useState();

  const publish = (e) => {
    e.preventDefault();
    setrefresh(true);
  }

  // const likes = useSelector(selectLike);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    const fecthLikes = async () => {
        const fetchData = await getLikes();
        const isLiked = fetchData.some(ele => ele.user === userProps.uid && ele.like === postProps.id);
        if(isLiked){
          setState({ liked: true })
        } 
        likeCount(fetchData);
        //dispatch(update(fetchData));
    }
    if(refresh) {
      fecthLikes();
      setrefresh(false);
    }
  })

  const likeCount = async (data) => {
    const countLike = data.filter(ele => ele.like === postProps.id).length
    setNbLike(countLike);
  }

  const like = async () => {
    const user = userProps;
    const postId = postProps?.id;
    setState({ liked: true });
    updateLike( postId, user, state);
  }

  const unlike = async () => {
    const user = userProps;
    const postId = postProps?.id;
    setState({ liked: false })
    updateLike(postId, user, state);
  }

  return(
    <div className="p_Like_wra">
      {state.liked ? (
        <span
          className="p_like p_unlike_icon"
          data-tip="Unlike"
          onClick={(e) => {
            // publish(e)
            unlike()
          }}
        >
        <Button icon={<Favorite color='brand' />} /> {nbLike}
          </span>
      ) : (
        <span
          className="p_like p_like_icon"
          data-tip="Like"
          onClick={(e)=> {
              // publish(e)
            like()
          }}
        >
          <Button icon={<Favorite/>}/> {nbLike}
          </span>
      )}
      </div>
    )
}

export default Like;