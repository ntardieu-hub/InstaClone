import React from "react";
import fire from '../../fire.js';
import {Box, Button, Text, TextInput} from "grommet";
import {Refresh} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import { useSelector, useDispatch } from 'react-redux';
import { update, selectPosts } from './postsSlice';
import {addPost, getPosts} from "../../services/postsServices";
import Like from "./Like.js";


const Posts = () => {

    const user = fire.auth().currentUser;
    const userEmail = user.email;

    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();
    const [content, setcontent] = React.useState();
    const [refresh, setrefresh] = React.useState(true);

   

    const publish = (e) => {
        e.preventDefault();
        
        if (content){
            addPost(content, userEmail).then(() => setrefresh(true));
        }
    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            //setposts(fetchData); plus utile..
            dispatch(update(fetchData));
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh])


    return(
        <Box align="center">
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e)=> setcontent(e.target.value)} />
                <Button label="publier" onClick={(e)=> publish(e)}/>
            </Box>
            <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
            <Card 
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="medium"
            width="medium"
            height="medium">
                {posts ? 
                posts.map(post => (
                    <CardConcave align="center"
                    justify="center"
                    round="small"
                    padding="medium"
                    margin="medium"
                    width="medium">
                        <Text>{post.content} </Text> 
                        <p>Publier par : {post.user}</p>
                        <Like dataPost={{post, user}}/>
                    </CardConcave>
                ))
                 : 
                <Text>Ceci sont les posts</Text>
                }
            </Card>
        </Box>
    )
}

export default Posts;