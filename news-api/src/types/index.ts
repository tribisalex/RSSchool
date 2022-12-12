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
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface DSources {
    status: string;
    sources: ISources[];
}

export type Property = {
    status?: string;
    sources: string;
};

export interface Url {
    endpoint: string;
    options?: {
        sources: string;
    };
}

export type getCall<D> = (data: D) => void;