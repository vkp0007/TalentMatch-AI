from sklearn.feature_extraction.text import HashingVectorizer


_model = None


def get_embedding_model():

    global _model

    if _model is None:

        _model = HashingVectorizer(
            n_features=384,
            stop_words="english",
            alternate_sign=False,
            norm="l2"
        )

    return _model