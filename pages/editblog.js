import { useSelector } from 'react-redux';
import blogReducer from '../components/redux/reducers/blogReducer';
import wrapper from '../components/redux/storeSetup';

export default function editBlog(){
    const myBlog = useSelector(state => state);
    console.log(myBlog);
    //const body_delta = myBlog[1].body_delta;
    //console.log(body_delta);    // Throws TypeError: Cannot read property 'body_delta' of undefined
                                // Since the store is empty here

    return (
        <div>Hi</div>
    );
}

// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//     const blog = store.getState(blogReducer);
//     console.log(blog);
// });
