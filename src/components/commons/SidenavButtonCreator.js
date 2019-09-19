const createWorkspaceLink = (btnTitle, btnIcon, link, url) => {
    return { btnTitle, btnIcon, link, url };
};

const createWorkspaceBtn = (btnTitle, btnIcon, onClick) => {
    return { btnTitle, btnIcon, onClick };
};

export { createWorkspaceBtn, createWorkspaceLink };