import {useDispatch, useSelector} from 'react-redux';
import {END} from 'redux-saga';
import wrapper from '../components/redux/storeSetup';
import { FETCH_BLOG_LIST } from '../components/redux/actions/actionTypes';

import cookie from 'cookie';

export default function BlogsList({blogs}){
    //const blogs = useSelector(state => state.blogReducer.blogReducer.blog);  // works on the client side

    return(
        <div className="mainCon">
            <ul>
                {blogs.map((item) => (
                    <li key={item.author}>
                        <span>{item.author}</span><br/>
                        <span>{item.title}</span>
                        <h4>{item.body_delta}</h4>
                        <p>{item.body_html}</p>
                        <p>{item.created_on}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export const getServerSideProps = wrapper.getServerSideProps( async ({store, req}) =>{
    //const cookie = req.headers.cookie;
    //console.log("SERVER_COOKIE:==: ",  cookie.access);

    const cookies = cookie.parse(req.headers.cookie || '');
    const access_token = cookies.access;
    //console.log("MY ACCESS COOKIES:: ", access_token);

    store.dispatch({type: FETCH_BLOG_LIST, access_token});
    store.dispatch(END);
    await store.sagaTask.toPromise();

    const blog = store.getState();
    console.log("BLOG: ", blog);
    const blogs = blog.blogReducer.blog;
    //console.log('BLOGGG: ', blogs);
    //useSelector(state => state.blogReducer.blogReducer.blog);
  
    return { props: {blogs}, };
});

/*
export async function getServerSideProps(context) {
    const resp = await axios.get('http://127.0.0.1:8000/api/blogs');
    const blogs = await resp.data;

    return{
        props: {blogs},
    }
}
*/
