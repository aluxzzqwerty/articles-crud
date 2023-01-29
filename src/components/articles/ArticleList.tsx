import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Article, fetchArticles } from "../../feautures/articles-api-slice";

const ArticleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, error } = useAppSelector((state) => state.articlesApi);
  const currentUserId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const renderAdmin = (article: Article) => {
    if (article.userId === currentUserId) {
      return (
        <div className="sidebar-posts-list__item__btns">
          <Link to={`/articles/edit/${article.id}`} className="button edit-btn">
            EDIT
          </Link>
          <Link
            to={`/articles/delete/${article.id}`}
            className="button delete-btn"
          >
            DELETE
          </Link>
        </div>
      );
    }
  };

  const renderSideBarList = () => {
    return list.map((article) => {
      return (
        <div className="sidebar-posts-list__item" key={article.id}>
          <div className="sidebar-posts-list__item__container">
            <i className="sidebar-posts-list__item__icon fa-solid fa-user"></i>
            <div className="sidebar-posts-list__item__content">
              <Link
                to={`/articles/${article.id}`}
                className="sidebar-posts-list__item__content--header"
              >
                {article.title}
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderList = () => {
    return list.map((article) => {
      return (
        <div className="article-list-center-item" key={article.id}>
          <div className="article-list-center-item__container">
            <div className="article-list-center-item__content">
              <Link
                to={`/articles/${article.id}`}
                className="article-list-center-item__content--header"
              >
                {article.title}
              </Link>
              <div className="article-list-center-item__content--description">
                {article.description}
              </div>
            </div>
          </div>
          {renderAdmin(article)}
        </div>
      );
    });
  };

  return (
    <div className="main-content">
      <div id="article-container" className="article-container">
        <h2 className="article-container__big-title">Articles</h2>
        {error && <h3>An error occured: {error}</h3>}
        <div className="article-list-center">{renderList()}</div>
      </div>
      <div className="sidebar-container">
        <div className="sidebar-top-part">
          <div className="sidebar-top-part__feautured-titles">
            Feautured Titles
          </div>
        </div>
        <div className="sidebar-posts-list">{renderSideBarList()}</div>
      </div>
    </div>
  );
};

export default ArticleList;
