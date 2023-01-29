import GoogleAuth from "./GoogleAuth";
import { Route, Routes } from "react-router-dom";
import ArticleList from "./articles/ArticleList";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import ArticleCreate from "./articles/ArticleCreate";
import ArticleShow from "./articles/ArticleShow";
import ArticleEdit from "./articles/ArticleEdit";
import ArticleDelete from "./articles/ArticleDelete";

const App: React.FC = () => {
  return (
    <div className="ui_container">
      <BrowserRouter>
        <Menu />
        <GoogleAuth />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/new" element={<ArticleCreate />} />
          <Route path="/articles">
            <Route index element={<ArticleShow />} />
            <Route path=":id" element={<ArticleShow />} />
          </Route>
          <Route path="/articles/edit">
            <Route index element={<ArticleEdit />} />
            <Route path=":id" element={<ArticleEdit />} />
          </Route>
          <Route path="/articles/delete">
            <Route index element={<ArticleDelete />} />
            <Route path=":id" element={<ArticleDelete />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
