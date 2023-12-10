import React, {useState, useEffect} from 'react';
import api from '../../../api';
import './ArticleDetail.css';
import {useParams} from 'react-router-dom';

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchArticleById = async () => {
            try {
                const response = await api.getArticleById(id);
                setArticle(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticleById();
    }, [id]);

    return (
        <React.Fragment>
            <div className="article-wrap">
                <h3 className="article-title">{article?.title}</h3>
                <div className="article-content">
                    <span><img src={`http://localhost:3000/${article?.image}`} alt="Article"/>{article?.fullText}</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ArticleDetail;
