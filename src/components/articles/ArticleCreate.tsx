import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createArticle } from "../../feautures/articles-api-slice";
import ArticleForm, { FormValuesType } from "./ArticleForm";

const ArticleCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector(state => state.articlesApi);

  const onSubmit = (formValues: FormValuesType) => {
    dispatch(createArticle(formValues));
    navigate('/');
  };

  return (
    <div className="modify-section">
      <h3 className="modify-section__header">Create Stream</h3>
      <ArticleForm onSubmit={onSubmit} />
      {error && <h3>An error occured: {error}</h3>}
    </div>
  );
};

export default ArticleCreate;
