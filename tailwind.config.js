module.exports = {
    content: [
        "./index.html",
        "./src/page/**/*.{vue,html,js}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {}
    },
    plugins: [
        require("flowbite/plugin")
    ]
}
