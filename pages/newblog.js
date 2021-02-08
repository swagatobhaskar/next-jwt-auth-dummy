import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import Head from 'next/head'
import 'react-quill/dist/quill.snow.css'    // why is it placed in the _app.js file?
import {useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})

const modules = {
    toolbar: [
        [{header: '1'}, {header: '2'}, {font: []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            {list: 'ordered'},
            {list: 'bullet'},
            {indent: '-1'},
            {indent: '+1'},
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
*/

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

export default function articles() {
    const [delta, setDelta] = useState('');
    const [dirtyInnerHtml, setDirtyInnerHtml] = useState('');

    function handleTextChange(content, delta, source, editor) {
        //let str = JSON.stringify(editor.getContents()); // converting from object to string.
        //let parsed = JSON.parse(str)  // converting from string to object
        setDelta(editor.getContents());
        setDirtyInnerHtml(editor.getHTML());
        //console.log(editor.getContents());
        //console.log(typeof str);
        //console.log("innerhtml: "+ editor.getHTML());
        //console.log("JSON Stringify: " + str);
        //const cleanedHtml = DOMPurify.sanitize(editor.getHTML());
       // console.log('Cleaned Html: ', cleaned);
        // console.log("JSON Parsed: " + parsed);  // don't concatenate
        //console.log("getContents(): " + actual);   //  don't concatenate instead do: console.log(actual);
        // it was returning [object object] because, it was returning the type of those two concatenated objects as only object and object.
    };

    function handleSubmit() {
        const strOfDelta = JSON.stringify(delta);
        const cleanedInnerHtml = DOMPurify.sanitize(dirtyInnerHtml)
        const accessToken = Cookies.get('access');
        const data = {
            title: 'sample rubbish',
            body_delta: strOfDelta,
            body_html: cleanedInnerHtml,
        };
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`
          };
          /*
        axios.post('http://127.0.0.1:8000/api/blogs', data:data, headers=headers)
        .then(resp => {console.log(resp.data);
        })
        .catch(error =>{
            console.log(error);
        });
        */
        return axios({
            method:"POST",
            url: 'http://127.0.0.1:8000/api/blogs/',
            data: data,
            headers: headers
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (error) {
            //handle error
            console.log(error);
        });
    }

    return(
        <div className="background">
            <Head>
                    <title>New Epic</title>
            </Head>
            <div className="main_container">
                <div className="intro">
                    <h3 className="heading">Write your article content here and get published.</h3>
                    <p className="para">After a long time i'm getting back into React.js and Next.js.<br />
                        All these time I have been busy with Python and web scrapping and JSONs and CSVs. <br />
                        <br />
                        Primarily for the purpose of making a complete backend.
                    </p>
                </div>   

                <div className="quill_container">
                    <div id="editor" className="editor">
                        <QuillNoSSRWrapper
                            id="quilleditor"
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            onChange={handleTextChange}
                            readOnly={false}
                        />
                    </div>
                    <div className="submit_btn">
                        <button onClick={handleSubmit}>Submit This Epic</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
