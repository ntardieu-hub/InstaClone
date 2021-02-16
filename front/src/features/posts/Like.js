import React from "react";
import {Favorite} from "grommet-icons";
import { getLikes, updateLike } from "../../services/postsServices";
import { useDispatch } from "react-redux";
import { update } from "./likeSlice";
import { Button } from "grommet";

const Like = (props) => {

  const userProps = props.dataPost?.user ;
  const postProps = props.dataPost?.post ;

  const [state, setState] = React.useState({ liked: false });

  // const dispatch = useDispatch();
  // const [content, setcontent] = React.useState();
  // const [refresh, setrefresh] = React.useState(true);


  React.useEffect(() => {
    // const fecthLikes = async () => {
    //     const fetchData = await getLikes();
    //     dispatch(update(fetchData));
    // }
  })

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
          onClick={(e)=> {
           
            unlike()
          }}
        >
        <Button icon={<Favorite color='brand' />}/>
          </span>
      ) : (
        <span
          className="p_like p_like_icon"
          data-tip="Like"
          onClick={(e)=> {
          
            like()
          }}
        >
          <Button icon={<Favorite/>}/>
          </span>
      )}
      </div>
    )
}

export default Like;