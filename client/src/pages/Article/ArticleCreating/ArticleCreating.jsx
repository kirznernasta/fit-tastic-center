import React, {useState} from 'react';
import api from '../../../api';
import {Navigate, useNavigate} from "react-router-dom";

const ArticleCreating = () => {
    const [title, setTitle] = useState("");
    const [firstSentence, setFirstSentence] = useState("");
    const [fullText, setFullText] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const navigate = useNavigate();
    const onTitleChanged = (e) => {
        let value = e.target.value;
        setTitle(value);
    }

    const onFirstSentenceChanged = (e) => {
        let value = e.target.value;
        setFirstSentence(value);
    }

    const onFullTextChanged = (e) => {
        let value = e.target.value;
        setFullText(value);
    }

    const onImageChanged = (e) => {
        let value = e.target.files[0];
        if (value) {
            setImage(value);
            setImageUrl(URL.createObjectURL(value));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.insertArticle({title, firstSentence, fullText}, image);
        navigate("/articles/manage");
    }

    return (

        <React.Fragment>
            <div className="article-wrap">
                <form className={"form"} encType={"multipart/form-data"} id="creaing-article-form"
                      onSubmit={handleSubmit}>
                    <h3>Creating article</h3>

                    <label className="label"> Title:<br/>
                        <input className="input" name="title-input" required={true} type="text" value={title}
                               onChange={onTitleChanged}/>
                    </label><br/>

                    <label className="label"> First sentence:<br/>
                        <input className="input" name="first-sentence-input" required={true} type="text"
                               value={firstSentence}
                               onChange={onFirstSentenceChanged}/>
                    </label><br/>

                    <label className="label"> Full text:<br/>
                        <input className="input" name="full-text-input" required={true} type="text" value={fullText}
                               onChange={onFullTextChanged}/>
                    </label><br/>

                    <label className="label"> Image:<br/>
                        <input className="" name="image-input" required={true} type="file" accept={"image/png"}
                               onChange={onImageChanged}/>
                    </label><br/>

                    {imageUrl && <img className="article-table-image" src={imageUrl} alt="Article image"/>}

                    <input
                        className={"input"} type="submit" value="Create"/>
                </form>
            </div>
        </React.Fragment>
    );
};

export default ArticleCreating;
