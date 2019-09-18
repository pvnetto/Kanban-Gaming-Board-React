const createWorkspaceLink = (btnTitle, btnIcon, link, url) => {
    return { btnTitle, btnIcon, link, url };
};

const createWorkspaceBtn = (btnTitle, btnIcon) => {
    return { btnTitle, btnIcon };
};

export { createWorkspaceBtn, createWorkspaceLink };