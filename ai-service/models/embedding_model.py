from sklearn.feature_extraction.text import HashingVectorizer


_vectorizer = None


def get_embedding_model():

    global _vectorizer

    if _vectorizer is None:

        _vectorizer = HashingVectorizer(
            n_features=384,
            stop_words="english",
            alternate_sign=False,
            norm="l2"
        )

    return _vectorizer