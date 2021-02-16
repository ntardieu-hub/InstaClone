import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/posts'

const createToken = async () => {

    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addPost = async (content) => {
    const header = await createToken();
    console.log(content)
    const payload ={
        content
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
}
export const updateLike = async (post, user, state) => {
    const userId = user?.uid;
    const header = await createToken();
    // console.log(post, user, state);
    const payload = {
        post, userId, state
    }
    try {
        // const res = await axios.post(url + "/like", payload, header);
        // return res.data;
         console.log("UpdateLike_ :", url + "/like", payload, header);
    }catch (e) {
        console.error(e);
    }   
}

export const getLikes = async (content) => {
    const header = await createToken();
    console.log(content)
    const payload ={
        content
    }
    try {
        // const res = await axios.post(url + "/like", payload, header);
        // return res.data;
         console.log("GetLike_ :", url + "/like", payload, header)
    }catch (e) {
        console.error(e);
    }   
}

export const getPosts = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}