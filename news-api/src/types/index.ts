export type Options = {
    sources: string;
    status?: string;
};

export interface UrlResp {
    endpoint: string;
    options?: {
        sources: string;
    };
}

export type Callback = (() => void) | ((data: Readonly<Options>) => void);

export type getCallback<T> = (data: T) => void;

export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticle {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: {
        id: string;
        name: string;
    };

    [key: string]: string | object;
}

export interface Articles {
    status: 'string',
    totalResults: 'string',
    articles: IArticle[];
}

export interface DSources {
    status: 'string';
    sources: ISources[];
}