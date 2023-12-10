import React, {useState, useEffect} from 'react';
import api from '../../../api';
import {useNavigate, useParams} from 'react-router-dom';

const ArticleEditing = () => {
    const [title, setTitle] = useState("");
    const [firstSentence, setFirstSentence] = useState("");
    const [fullText, setFullText] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isImageFromServer, setIsImageFromServer] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticleById = async () => {
            try {
                const response = await api.getArticleById(id);

                console.log(response);
                setTitle(response.data.title);
                setFirstSentence(response.data.firstSentence);
                setFullText(response.data.fullText);
                setImageUrl(`http://localhost:3000/${response.data.image}`);
                setImage(`http://localhost:3000/${response.data.image}`);
                setIsImageFromServer(true);
                console.log(response);
                console.log(image);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticleById();
    }, [id]);

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
        await api.updateArticleById(id, {title, firstSentence, fullText}, image);
        navigate("/articles/manage");
    }

    return (
        <React.Fragment>
            <div className="article-wrap">
                <form className={"form"} encType={"multipart/form-data"} id="editing-article-form"
                      onSubmit={handleSubmit}>
                    <h3>Editing article</h3>
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
                        <input className="" name="image-input" type="file" accept={"image/png"}
                               onChange={onImageChanged}/>
                    </label><br/>

                    {imageUrl && <img className="article-table-image" src={imageUrl} alt="Article image"/>}

                    <input
                        className={"input"} type="submit" value="Edit"/>
                </form>
            </div>
        </React.Fragment>
    );
};

export default ArticleEditing;
