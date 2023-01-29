import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticle } from "../../feautures/articles-api-slice";

const ArticleShow: React.FC = () => {
  const dispatch = useAppDispatch();
  const { article, error } = useAppSelector((state) => state.articlesApi);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, []);

  const { title, description, username } = article;
  return (
    <div className="show-article">
      <h1 className="show-article__header">{title}</h1>
      {error && <h3>An error occured: {error}</h3>}
      <h5 className="show-article__author">{`By ${username}`}</h5>
      <h4 className="show-article__description">{description}</h4>
    </div>
  );
};

export default ArticleShow;
