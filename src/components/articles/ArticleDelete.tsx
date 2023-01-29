import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteArticle,
  fetchArticle,
} from "../../feautures/articles-api-slice";
import Modal from "../Modal";

const ArticleDelete: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { article, error } = useAppSelector((state) => state.articlesApi);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, []);

  const onDeleteClick = () => {
    dispatch(deleteArticle(id));
    navigate("/");
  };

  const renderActions = () => {
    return (
      <div className="delete__modal--actions--btns">
        <button onClick={onDeleteClick} className="button delete-btn">
          Delete
        </button>
        <Link to={"/"} className="button">
          Cancel
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    if (error) {
        return `An error occured: ${error}`;
    }
    if (!article) {
      return "Are you sure you want to delete this stream?";
    } else {
      return `Are you sure you want to delete this stream with title: ${article.title}?`;
    }
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => navigate("/")}
    />
  );
};

export default ArticleDelete;
