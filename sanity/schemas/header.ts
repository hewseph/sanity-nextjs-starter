const header = {
    name: "header",
    title: "Header",
    type: "document",
    fields: [
        { name: "title", title: "Title", type: "string" },
        {
            name: "links",
            type: "array",
            title: "Links",
            of: [
                {
                    type: "headerLink",
                    title: "Header Link",
                },
            ],
        },
    ],
};

export default header;
