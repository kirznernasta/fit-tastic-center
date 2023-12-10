import React, {Component} from 'react'
import api from '../../../api'
import "./ArticlesList.css";
import {getTokenFromCookie} from "../../../cookies/cookies";

class ArticlesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            nameFilter: "",
            titleAsc: true,
            isLogin: false,
        }
        this.onFilterChanged = this.onFilterChanged.bind(this);
        this.onTitleSortingMethodChanged = this.onTitleSortingMethodChanged.bind(this);
    }

    componentDidMount = async () => {

        await api.getAllArticles().then(articles => {
            console.log(articles.data.data);
            this.setState({
                articles: articles.data.data,
            });
        });
        const token = getTokenFromCookie("TOKEN");
        this.setState({isLogin: !!token});
    }

    onFilterChanged(e) {
        let value = e.target.value;
        this.setState({nameFilter: value});
    }

    onTitleSortingMethodChanged() {
        this.setState({titleAsc: !this.state.titleAsc});
    }

    render() {
        const {articles, nameFilter} = this.state

        let sortedArticles = articles.sort((a, b) => this.state.titleAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

        return (
            <div className="articles-wrap">
                <h1>Articles</h1>
                <label className="label">Search by title:<br/>
                    <input className="input" type="text" value={nameFilter} onChange={this.onFilterChanged}/></label>
                <p className="label">Title: <button className="title-button" onClick={this.onTitleSortingMethodChanged}>
                    <i
                        className={this.state.titleAsc ? "arrow up" : "arrow down"}></i></button></p>
                {this.state.isLogin ? <a className="manage-link" href="/articles/manage"><h3>Manage articles</h3></a> :
                    <div></div>}
                {sortedArticles.filter((article) => article.title.includes(nameFilter)).map((article) => (
                    <article className="article" key={article.id}>
                        <img className="article-image" src={`http://localhost:3000/${article.image}`}
                             alt="Article image"/>
                        <div>
                            <h3>{article.title}</h3>
                            <p className="article-first-sentence">{article.firstSentence}</p>
                            <a className="aquamarine button" href={`http://localhost:8000/articles/${article._id}`}
                               target="_blank">continue reading</a>
                        </div>
                    </article>
                ))}
            </div>
        )
    }
}

export default ArticlesList