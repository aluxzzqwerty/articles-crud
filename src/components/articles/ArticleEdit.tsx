import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editArticle, fetchArticle } from "../../feautures/articles-api-slice";
import ArticleForm, { FormValuesType } from "./ArticleForm";

const ArticleEdit: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { article, error } = useAppSelector((state) => state.articlesApi);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, []);

  const onSubmit = (formValues: FormValuesType) => {
    dispatch(editArticle({ id, formValues }));
    navigate("/");
  };

  return (
    <div className="modify-section">
      <h3 className="modify-section__header">Edit Stream</h3>
      {error && <h3>An error occured: {error}</h3>}
      <ArticleForm
        values={{ title: article.title, description: article.description }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ArticleEdit;
