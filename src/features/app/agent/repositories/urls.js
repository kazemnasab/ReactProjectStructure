export const Urls = {
    Factor: "Factor",
    Sheet: "Sheet",
    Product: "Product",
    User: "User",
}

const PostParams = ({ url, isFormData, body = {} }) => {
    return {
        url: url,
        method: "POST",
        isFormData: isFormData,
        body: body
    }
}

const GetParams = ({ url }) => {
    return {
        url: url,
        method: "GET",
    }
}

const Actions = {
    Common:{
        Save: ({ url, body = {} }) => {
            return PostParams({
                url: url,
                isFormData: true,
                body: body
            });
        },
        GetById: (url, id) => {
            return GetParams({ url: `${url}/${id}` });
        },
    },
    Factor: {
        Save: ({ body = {} }) => {
            return PostParams({
                url: Urls.Factor,
                isFormData: true,
                body: body
            });
        },
        GetById: (id) => {
            return GetParams({ url: `${Urls.Factor}/${id}` });
        },
    },
    Sheet: {
        Save: ({ body = {} }) => {
            return PostParams({
                url: Urls.Sheet,
                isFormData: true,
                body: body
            });
        },
        GetById: (id) => {
            return GetParams({ url: `${Urls.Sheet}/${id}` });
        },
        Search: ({ state = null, typeId = null, target = null }) => {
            var url = `${Urls.Sheet}?d=2`;
            url += state ?? `$state=${state}`;
            url += typeId ?? `$typeId=${typeId}`;
            url += target ?? `$state=${target}`;
            return GetParams({ url: url });
        }
    },
    
}