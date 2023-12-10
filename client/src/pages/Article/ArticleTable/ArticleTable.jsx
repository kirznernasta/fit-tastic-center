import React, {Component} from 'react'
import api from '../../../api'
import "./ArticleTable.css";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

class ArticlesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
        }
        this.onDeleteTap = this.onDeleteTap.bind(this);
    }

    componentDidMount = async () => {

        await api.getAllArticles().then(articles => {
            console.log(articles.data.data);
            this.setState({
                articles: articles.data.data,
            });
        });
    }

    onDeleteTap(id) {
        Swal.fire({
            title: "Do you really want to delete this article?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.deleteArticleById(id);
                window.location.reload();
            }
        });
    }

    render() {
        const {articles} = this.state

        return (
            <div className="articles-wrap">
                <button className="button-table aquamarine"><Link className='link'
                                                                  to={"/articles/manage/creating"}>Create</Link>
                </button>
                <br/>
                <table className="article-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>First sentence</th>
                        <th>FullText</th>
                        <th>Created at</th>
                        <th>Last edited at</th>
                        <th>Image</th>
                        <th>Manage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map((article) => <tr key={article._id}>
                        <td>
                            <div className="full-text">{article.title}</div>
                        </td>
                        <td>
                            <div className="full-text">{article.firstSentence}</div>
                        </td>
                        <td>
                            <div className="full-text">{article.fullText}</div>
                        </td>
                        <td><p>UTC: {new Date(article.createdAt).toISOString()}</p>
                            <p>Local: {new Date(article.createdAt).toLocaleString()}</p></td>
                        <td><p>UTC: {new Date(article.updatedAt).toISOString()}</p>
                            <p>Local: {new Date(article.updatedAt).toLocaleString()}</p></td>
                        <td><img className="article-table-image" src={`http://localhost:3000/${article.image}`}
                                 alt="Article image"/></td>
                        <td>
                            <div>
                                <button className="button-table blue"><Link className='link'
                                                                            to={`/articles/manage/${article._id}`}>Edit</Link>
                                </button>
                                <br/>
                                <button className="button-table red"
                                        onClick={() => this.onDeleteTap(article._id)}>Delete
                                </button>
                            </div>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ArticlesTable