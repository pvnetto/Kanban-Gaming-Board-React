const categories = {
    PROGRAMMING: "Programming",
    ART: "Art",
    DESIGN: "Design",
    WRITING: "Writing",
    MARKETING: "Marketing",
    SOUND: "Sound",
    BUGS: "Bugs"
};

const allCategory = {
    ALL: "All Items"
}

Object.freeze(categories);

let allCategories = Object.assign({}, allCategory, categories);

export { categories, allCategories };