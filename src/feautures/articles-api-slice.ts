import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import article from "../api/article";
import { RootState } from "../app/store";
import { FormValuesType } from "../components/articles/ArticleForm";

export type Article = {
  title: string;
  description: string;
  userId: string | undefined;
  username: string;
  id: string | null;
};

type ArticlesState = {
  list: Article[]
  article: Article
  error: string | null
};

const initialState: ArticlesState = {
  list: [],
  article: {
    title: '',
    description: '',
    userId: undefined,
    username: '',
    id: null
  },
  error: null
};

export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>("articles/fetch", async (_, { rejectWithValue }) => {
  try {
    const { data } = await article.get("/articles");

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchArticle = createAsyncThunk<Article,string | undefined,{ rejectValue: string }>
  ("article/fetch", async (id, { rejectWithValue }) => {
  try {
    const { data } = await article.get(`/articles/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createArticle = createAsyncThunk<Article, FormValuesType, {state: RootState }>
  ("articles/create", async (formValues, { getState, rejectWithValue }) => {
    
  try {
    const { userId, username } = getState().auth;
    const { data } = await article.post('/articles', {...formValues, userId, username});

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editArticle = createAsyncThunk<Article, any, {state: RootState }>
  ("articles/edit", async (valuesForEditAction, { getState, rejectWithValue }) => {
  try {
    const { id, formValues} = valuesForEditAction;
    const { data } = await article.patch(`/articles/${id}`, formValues);


    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
  
});

export const deleteArticle = createAsyncThunk<string | undefined,string | undefined,{ rejectValue: string }>
  ("articles/delete", async (id, { rejectWithValue }) => {
  try {
    await article.delete(`/articles/${id}`);

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const articlesApiSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    })
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.list.push(action.payload);
    })
    builder.addCase(editArticle.fulfilled, (state, action) => {
      const articleIndex = state.list.findIndex(article => article.id === action.payload.id);
      state.list[articleIndex] = action.payload;
    })
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.list = state.list.filter(article => article.id !== action.payload);
    })
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    })
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
}

export default articlesApiSlice.reducer;
