const categories = {
    PROGRAMMING: "Programming",
    ART: "Art",
    DESIGN: "Design",
    WRITING: "Writing",
    MARKETING: "Marketing",
    SOUND: "Sound",
    BUGS: "Bugs"
};

Object.freeze(categories);

let allCategories = {};
allCategories = Object.assign(allCategories, categories);
allCategories.ALL = "All Items";

export { categories, allCategories };